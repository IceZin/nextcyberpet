#include "WebSocketClient.h"
#include "FeedTimeManager.h"
#include "esp_camera.h"
#include <esp_system.h>
#include "LedControl.h"
#include <WiFiClientSecure.h>
#include <WiFiClient.h>
#include "HX711.h"

HX711 weightSensor;

WiFiClient client;
WebSocketClient webclient("/", "192.168.0.10", "ESP32", "esp32");
LedControl led_manager;
FeedTimeManager timeManager(25, 4);

bool updateCameraImg = true;

long lastCameraPic = 0;
long lastTempRegister = 0;
long bpsUpdate = 0;
long bytesSent = 0;
int lastGeneralUpdate = 0;

const double beta = 3950.0;
const double r0 = 10000.0;
const double t0 = 273.0 + 25.0;
const double rx = r0 * exp(-beta/t0);

const double vcc = 3.3;
const double R = 10000.0;

const int samples = 5;

int red[3] = {255, 0, 0};
int green[3] = {0, 30, 0};
int blue[3] = {0, 0, 255};

void generalHandler(int*, int);
void feedingHandler(int*, int);

void (*handlers[])(int*, int) = {generalHandler, feedingHandler};

void setup() {
  analogReadResolution(10);
  pinMode(32, INPUT);
  pinMode(36, INPUT);
  pinMode(2, OUTPUT);
  
  Serial.begin(115200);

  led_manager.setupLeds();
  led_manager.mode = 0x01;
  led_manager.update_delay = 10;
  led_manager.ws = &webclient;

  webclient.strip = &led_manager;
  webclient.connectToWifi();

  webclient.registerEvent("data", onData);
  webclient.registerOnConnect(wsOnConnect);
  webclient.registerOnDisconnect(wsOnDisconnect);

  timeManager.registerSecChange(onSecUpdate);
  timeManager.registerMinChange(onMinUpdate);

  Serial.println("[*] ESP32 STARTED");

  led_manager.start();
  led_manager.setColor(red);

  weightSensor.begin(23, 22);
}
 
void loop() {
  webclient.update();

  led_manager.update();
  timeManager.update();
}

void sendTempData() {
  float average = 0;
  for (int i = 0; i < samples; i++) {
    average += analogRead(32);
  }

  average /= samples;
  average = 1023 / average - 1;
  average = 10000 / average;

  float temperature = (1.0 / (25 + 273.15)) + (1.0 / 3950.0) * log(average / 10000.0);
  temperature = 1.0 / temperature;
  temperature -= 273.15;
  
  int syncedTime[2];
  timeManager.getTime(syncedTime);

  byte buf[] = {0x1, 0x2, 0x0, syncedTime[0], syncedTime[1],
  floor(temperature), (int)((temperature - floor(temperature)) * 10L)};
  
  webclient.sendBuff(buf, sizeof(buf));
}

void sendLightData() {
  int average = 0;
  for (int i = 0; i < samples; i++) {
    average += analogRead(35);
  }
  average = round(average / samples);

  Serial.println("Light average");
  Serial.println(average);

  int samplesSize = ceil((float)average / 0xff);

  Serial.println("Light samples size");
  Serial.println(samplesSize);
  
  const int bufSize = samplesSize + 6;

  int syncedTime[2];
  timeManager.getTime(syncedTime);

  byte buf[bufSize] = {0x1, 0x1, 0x0, syncedTime[0], syncedTime[1], samplesSize};

  for (int i = 0; i < samplesSize; i++) {
    int val = 0xff;
    if (i == samplesSize - 1) val = average - ((bufSize - 1) * 0xff);
    
    buf[6 + i] = val;
  }

  webclient.sendBuff(buf, sizeof(buf));
}

void sendWeightData() {
  int average = 0;
  for (int i = 0; i < samples; i++) {
    average += analogRead(35);
  }
  average = round(average / samples);

  Serial.println("Light average");
  Serial.println(average);

  int samplesSize = ceil((float)average / 0xff);

  Serial.println("Light samples size");
  Serial.println(samplesSize);
  
  const int bufSize = samplesSize + 6;

  int syncedTime[2];
  timeManager.getTime(syncedTime);

  byte buf[bufSize] = {0x1, 0x1, 0x0, syncedTime[0], syncedTime[1], samplesSize};

  for (int i = 0; i < samplesSize; i++) {
    int val = 0xff;
    if (i == samplesSize - 1) val = average - ((bufSize - 1) * 0xff);
    
    buf[6 + i] = val;
  }

  webclient.sendBuff(buf, sizeof(buf));
}

void onSecUpdate(int min) {
  // lastGeneralUpdate += 1;

  // if (lastGeneralUpdate >= 10) {
  //   sendTempData();
  //   sendLightData();

  //   lastGeneralUpdate = 0;
  // }

  if (weightSensor.is_ready()) {
    long reading = weightSensor.read();
    Serial.print("HX711 reading: ");
    Serial.println(reading);
  }
}

void onMinUpdate(int min) {
  //Serial.println("Minute changed");
  sendTempData();
  sendLightData();
}

void wsOnConnect() {
  timeManager.reset();

  led_manager.blink(green, 2, 300, 100);

  digitalWrite(2, HIGH);
  
  led_manager.mode = 0x02;
  led_manager.setColor(green);
}

void wsOnDisconnect() {
  //led_manager.blink(red, 2, 300, 100);

  digitalWrite(2, LOW);
  
  led_manager.mode = 0x01;
  led_manager.setColor(red);
}

//Dados que vem do aplicativo

// [0] - Tipo de ação
// 0x0 - Requisições
// 0x1 - Gerenciador de Tempo
// 0x2 - Execução de ações

// [1] - Ação a ser executada
//  |_ [0] 0x0 - Light/Temp Handler
//  |   |_ [1] 0x0 - Info de nivel de luz
//  |   |_ [1] 0x1 - Info de temperatura
//  |   |_ [1] 0x2 - Setar cor
//  |   |_ [1] 0x3 - Ativar/Desativar iluminação
//  |_ [0] 0x1 - Feeding Handler
//  |   |_ [1] 0x0 - Adicionar um novo Tempo
//  |   |_ [1] 0x1 - Remover um tempo
//  |   |_ [1] 0x2 - Editar um tempo
//  |   |_ [1] 0x3 - Sincronizar timer
//  |   |_ [1] 0x4 - Toogle option
//  |   |_ [1] 0x5 - Acionar alimentação
//  |_ [0] 0x2 - Camera
//      |_ [1] 0x0 - Toggle Camera

// [2:x] - Parametros

void generalHandler(int* data, int dataLen) {
  Serial.println("Reached general handler");
  
  if (data[1] == 0x2) {
    int rgb[3] = {data[2], data[3], data[4]};

    led_manager.setColor(rgb);
  } else if (data[1] == 0x3) {
    int state = data[2];

    if (state) {
      led_manager.start();
    } else {
      led_manager.stop();
      led_manager.clear();
    }
  } else if (data[1] == 0x4) {
    if (data[2]) {
      led_manager.mode = 0x5;
    } else {
      led_manager.mode = 0x1;
      led_manager.showSolidColor();
    }
  } else if (data[1] == 0x5) {
    if (data[2]) {
      led_manager.setSpectrumInfo(1, 30, 10, 0, 0);
    } else {
      led_manager.setSpectrumInfo(1, 30, 150, 0, 0);
    }
  } else if (data[1] == 0x6) {
    Serial.println("Toggling light auto control");

    led_manager.setAutoIntensity(data[2]);
  }
}

void feedingHandler(int* data, int dataLen) {
  Serial.println("Reached feeding handler");
  
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

    timeManager.addTime(hour, minutes, foodAmount, waterFlowTime, state);
  } else if (data[1] == 0x1) {
    int hour = data[2];
    int minutes = data[3];

    timeManager.removeTime(hour, minutes);
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
    
    timeManager.editTime(oldH, oldM, newH, newM, foodAmount, WFT);
  } else if (data[1] == 0x3) {
    timeManager.syncTime(data[2], data[3], data[4]);
  } else if (data[1] == 0x4) {
    if (data[2] == 0x0) {
      bool state = false;
      if (data[3] != 0) state = true;
      
      timeManager.setOption("waterFlow", state); 
    } else if (data[2] == 0x1) {
      bool state = false;
      if (data[3] != 0) state = true;
      
      timeManager.setOption("auto", state); 
    } else if (data[2] == 0x2) {
      bool state = false;
      if (data[5] != 0) state = true;
      
      timeManager.setTimeState(data[3], data[4], state); 
    }
  } else if (data[1] == 0x5) {
    int foodBuffLen = data[2];
    int foodAmount = 0;

    for (int i = 0; i < foodBuffLen; i++) {
      foodAmount += data[3 + i];
    }
    
    timeManager.enableFeed(foodAmount);
  }
}

void onData(int* data, int dataLen) {
  /*for (int i = 0; i < dataLen; i++) {
    Serial.print("Packet index ");
    Serial.print(i);
    Serial.print(" - ");
    Serial.println(data[i]);
  }*/

  Serial.println((int)handlers[data[0]]);

  if ((int)handlers[data[0]] != 0) handlers[data[0]](data, dataLen);

  //handlers[data[0]](data, dataLen);
  
  if (data[0] == 0x2) {
    if (data[1] == 0x0) {
      if (data[2] == 0x0) {
        updateCameraImg = false;
      } else {
        updateCameraImg = true;
      }
    }
  }
}
