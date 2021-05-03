#include "WebSocketClient.h"

WebSocketClient::WebSocketClient(String p, String h, String n, String a) {
  client = new WiFiClient;
  WiFi.mode(WIFI_STA);

  Serial.println(p);
  Serial.println(h);

  path = p;
  host = h;
  name = n;
  addr = a;
}

void WebSocketClient::scan() {
  int aps = WiFi.scanNetworks();

  for (int i = 0; i < aps; i++) {
    Serial.print("[*] ");
    Serial.println(WiFi.SSID(i));
  }
}

void WebSocketClient::connectToWifi() {
  WiFi.begin("2.4GHz Nucleon", "VHgp!!07MHgp@)05");
  
  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
  }
}

void WebSocketClient::connectToWs() {
  upgrading = true;

  Serial.println("Sending Handshake to WS Server");

  Serial.println(path);
  Serial.println(host);
  
  String handshake = "GET " + path + " HTTP/1.1\r\n"
      "Host: " + host + "\r\n"
      "Connection: Upgrade\r\n"
      "Upgrade: websocket\r\n"
      "Sec-WebSocket-Version: 13\r\n"
      "Sec-WebSocket-Protocol: PHDevice\r\n"
      "Sec-WebSocket-Key: by41aF0xV1EmVm9fTVI3YA==\r\n"
      "Cookie: dvc_name=" + name + ";dvc_addr=" + addr + "\r\n"
      "\r\n";

  Serial.println(handshake);

  client->println(handshake.c_str());
  awaitTime = millis();
}

void WebSocketClient::sendBuff(byte buf[], int len) {
  client->write(buf, len);
}

void WebSocketClient::readWs() {
  byte i = 0;

  if (awaitingUpgrade) {
    char tmpData[128];
    
    while(client->available() > 0) {
      char c = client->read();
      
      if (c == ' ' or c == '\0') {
        tmpData[i] = '\0';
        
        if (!strcmp(tmpData, "101")) {
          clearBuffer();
          awaitingUpgrade = false;
          upgrading = false;
          lastAction = millis();

          Serial.println("Connected to WS Server");
        }
        
        memset(tmpData, 0, sizeof(tmpData));
        i = 0;
        return;
      }

      if (i == 128) {
        Serial.println(tmpData);
        memset(tmpData, 0, sizeof(tmpData));
        return;
      }
      
      tmpData[i++] = c;
    }
  } else {
    decodeData();
  }
}

void WebSocketClient::decodeData() {
  int TYPE = client->read();
  Serial.print("TYPE: ");
  Serial.println(TYPE);

  if (TYPE == 0x0) {
    lastAction = millis();
    byte buf[1] = {0x0};
    sendBuff(buf, 1);
    clearBuffer();
  } else if (TYPE == 0x1) {
    int LEN = client->read();
    Serial.println(LEN);
    int data[LEN];

    for (byte i = 0; i < LEN; i++) data[i] = client->read();

    onData(data, LEN);
  }
}

void  WebSocketClient::registerEvent(String type, void (*event)(int*, int)) {
  if (type == "data") {
    onData = *event;
  }
}

void WebSocketClient::clearBuffer() {
  while (client->available() > 0) {
    client->read();
  }
}

void WebSocketClient::update() {
  if (WiFi.status() != WL_CONNECTED) connectToWifi();
  
  if (!client->connected()) {
     client->connect(host.c_str(), 1108);
     awaitingUpgrade = true;
  }
  
  if (awaitingUpgrade and !upgrading) {
    Serial.println("[*] Attempting connection with WebServer");
    Serial.println(client->connected());
    connectToWs();
  }

  if (!awaitingUpgrade) {
    if (millis() - lastAction > 12000) {
      client->stop();
      awaitingUpgrade = true;
      lastAction = 0;
      Serial.println("[!] Server is not sending ping packets");
      Serial.println("[!] Disconnected");
    }
  }
  
  if (client->available() > 0) readWs();
  
  if (upgrading and millis() - awaitTime >= awaitTimeout) {
    upgrading = false;
  }
}
