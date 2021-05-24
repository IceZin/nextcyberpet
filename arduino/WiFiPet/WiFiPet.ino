#include "WebSocketClient.h"
#include "FeedTimeManager.h"
#include "esp_camera.h"
#include <esp_system.h>
#include "LedControl.h"
#include <WiFiClientSecure.h>
#include <WiFiClient.h>

#define CAMERA_MODEL_AI_THINKER

WiFiClient client;
WebSocketClient webclient("/", "192.168.0.10", "ESP32", "esp32");
LedControl led_manager;
FeedTimeManager feedTimeManager(7, 8);

bool updateCameraImg = true;
long lastCameraPic = 0;
long bpsUpdate = 0;
long bytesSent = 0;

const double beta = 3600.0;
const double r0 = 10000.0;
const double t0 = 273.0 + 25.0;
const double rx = r0 * exp(-beta/t0);

const double vcc = 3.3;
const double R = 10000.0;

const int samples = 5;

/*static camera_config_t camera_config = {
    .pin_pwdn = -1,
    .pin_reset = -1,
    .pin_xclk = 22,
    .pin_sscb_sda = 18,
    .pin_sscb_scl = 5,

    .pin_d7 = 34,
    .pin_d6 = 35,
    .pin_d5 = 32,
    .pin_d4 = 33,
    .pin_d3 = 25,
    .pin_d2 = 26,
    .pin_d1 = 27,
    .pin_d0 = 14,
    .pin_vsync = 19,
    .pin_href = 21,
    .pin_pclk = 23,

    //XCLK 20MHz or 10MHz for OV2640 double FPS (Experimental)
    .xclk_freq_hz = 20000000,
    .ledc_timer = LEDC_TIMER_0,
    .ledc_channel = LEDC_CHANNEL_0,

    .pixel_format = PIXFORMAT_RGB565, //YUV422,GRAYSCALE,RGB565,JPEG
    .frame_size = FRAMESIZE_QQVGA,    //QQVGA-UXGA Do not use sizes above QVGA when not JPEG

    .jpeg_quality = 0, //0-63 lower number means higher quality
    .fb_count = 1       //if more than one, i2s runs in continuous mode. Use only with JPEG
};*/

/*static esp_err_t init_camera()
{
    //initialize the camera
    esp_err_t err = esp_camera_init(&camera_config);
    while (err != ESP_OK)
    {
        Serial.println("[!] Error during camera initialization");
        err = esp_camera_init(&camera_config);
        delay(1000);
    }

    return ESP_OK;
}*/

void setup() {
  analogReadResolution(10);
  pinMode(36, INPUT);
  
  Serial.begin(921600);

  led_manager.setupLeds();
  led_manager.mode = 0x00;
  led_manager.ws = &webclient;

  webclient.strip = &led_manager;
  webclient.connectToWifi();

  //webclient.registerEvent("data", onData);
  webclient.registerOnConnect("connect", wsOnConnect);

  Serial.println("[*] ESP32 STARTED");

  //init_camera();
}

void loop() {
  /*webclient.update();

  led_manager.update();
  feedTimeManager.update();

  if (updateCameraImg and millis() - lastCameraPic >= 1000 / 10) {
    camera_fb_t *pic = esp_camera_fb_get();

    Serial.println("[*] Sending pic");
    long uplStart = millis();
    
    webclient.writePic(pic->buf, pic->len);

    Serial.println("[*] Sent");
    Serial.print("[*] Upload took ");
    Serial.print(millis() - uplStart);
    Serial.println(" ms");

    lastCameraPic = millis();
  }*/

  int val = 0;
  for (int i = 0; i < samples; i++) {
    val += analogRead(36);
  }
 
  double v = (vcc*val)/(samples*1024.0);
  double rt = (vcc*R)/v - R;
 
  double t = beta / log(rt/rx);
  Serial.println (t-273.0);
  
  delay(100);
}

void wsOnConnect() {
  feedTimeManager.reset();
}

//Dados que vem do aplicativo

// [0] - Tipo de ação
// 0x0 - Requisições
// 0x1 - Gerenciador de Tempo
// 0x2 - Execução de ações

// [1] - Ação a ser executada
//  |_ [0] 0x0
//  |   |_ [1] 0x0 - Info de nivel de luz
//  |   |_ [1] 0x1 - Info de temperatura
//  |_ [0] 0x1
//  |   |_ [1] 0x0 - Adicionar um novo Tempo
//  |   |_ [1] 0x1 - Remover um tempo
//  |   |_ [1] 0x2 - Editar um tempo
//  |   |_ [1] 0x3 - Sincronizar timer
//  |   |_ [1] 0x4 - Toogle option
//  |_ [0] 0x2
//      |_ [1] 0x0 - Toggle Camera

// [2:x] - Parametros
void onData(int* data, int dataLen) {
  for (int i = 0; i < dataLen; i++) {
    Serial.print("Packet index ");
    Serial.print(i);
    Serial.print(" - ");
    Serial.println(data[i]);
  }

  if (data[0] == 0x1) {
    if (data[1] == 0x0) {
      int hour = data[2];
      int minutes = data[3];
      int stateHex = data[4];
      int waterFlowTime = data[5];
      int foodBuffLen = data[6];
      int foodAmount = 0;

      for (int i = 0; i < foodBuffLen; i++) {
        foodAmount += data[7 + i];
      }

      bool state = false;
      if (stateHex != 0) state = true;

      feedTimeManager.addTime(hour, minutes, foodAmount, waterFlowTime, state);

      Serial.println("[*] New time added");
      Serial.print(hour);
      Serial.print(':');
      Serial.println(minutes);
    } else if (data[1] == 0x1) {
      int hour = data[2];
      int minutes = data[3];

      feedTimeManager.removeTime(hour, minutes);

      Serial.println("[*] Time removed");
      Serial.print(hour);
      Serial.print(':');
      Serial.println(minutes);
    } else if (data[1] == 0x2) {
      int oldH = data[2];
      int oldM = data[3];
      int newH = data[4];
      int newM = data[5];
      int WFT = data[6];
      int foodBuffLen = data[7];
      int foodAmount = 0;

      for (int i = 0; i < foodBuffLen; i++) {
        foodAmount += data[8 + i];
      }
      
      feedTimeManager.editTime(oldH, oldM, newH, newM, foodAmount, WFT);
    } else if (data[1] == 0x3) {
      feedTimeManager.syncTime(data[2], data[3], data[4]);
    } else if (data[1] == 0x4) {
      if (data[2] == 0x0) {
        bool state = false;
        if (data[3] != 0) state = true;
        
        feedTimeManager.setOption("waterFlow", state); 
      } else if (data[2] == 0x1) {
        bool state = false;
        if (data[3] != 0) state = true;
        
        feedTimeManager.setOption("auto", state); 
      } else if (data[2] == 0x2) {
        bool state = false;
        if (data[5] != 0) state = true;
        
        feedTimeManager.setTimeState(data[3], data[4], state); 
      }
    }
  } else if (data[0] == 0x2) {
    if (data[1] == 0x0) {
      if (data[2] == 0x0) {
        updateCameraImg = false;
      } else {
        updateCameraImg = true;
      }
    }
  }
}
