#ifndef WebSocketClient_h
#define WebSocketClient_h

#include "Arduino.h"
#include "LedControl.h"
#include <WiFiClientSecure.h>
#include <WiFiClient.h>
#include <map>

class WebSocketClient {
  public:
    WebSocketClient(String p, String h, String n, String a);
    
    void connectToWifi();
    void connect();
    void update();
    void scan();
    void sendBuff(byte buf[], int len);
    void registerEvent(String type, void (*event)(int*));

    class LedControl *strip;
  private:
    byte data[256];
    bool newData;
    
    long awaitTimeout = 5000;
    long awaitTime = 0;
    long lastAction = 0;
    
    bool awaitingUpgrade = true;
    bool upgrading = false;
    
    void connectToWs();
    void readWs();
    void clearBuffer();
    void decodeData();
    void sendPong();

    void (*onData)(int*);

    double **phases;
    int p_len = 0;
    
    WiFiClient *client;

    String path;
    String host;
    String name;
    String addr;
};

#endif
