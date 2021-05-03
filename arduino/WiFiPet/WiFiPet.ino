#include "WebSocketClient.h"
#include "LedControl.h"
#include <WiFiClientSecure.h>
#include <WiFiClient.h>

WiFiClient client;
WebSocketClient webclient("/", "192.168.0.10", "ESP32", "esp32");
LedControl led_manager;

void setup() {
  Serial.begin(115200);

  led_manager.setupLeds();
  led_manager.mode = 0x00;
  led_manager.ws = &webclient;

  webclient.strip = &led_manager;
  webclient.connectToWifi();

  webclient.registerEvent("data", onData);

  Serial.println("[*] ESP32 STARTED");
}

void loop() {
  webclient.update();
  led_manager.update();
}

//Dados que vem do aplicativo
void onData(int* data, int dataLen) {
  for (int i = 0; i < dataLen; i++) {
    Serial.print("Packet index ");
    Serial.print(i);
    Serial.print(" - ");
    Serial.println(data[i]);
  }

  if (data[0] == 0x1) {
    if (data[1]) {
      
    }
  }
}
