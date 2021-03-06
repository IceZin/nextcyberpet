#ifndef LedControl_h
#define LedControl_h

#include "Arduino.h"
#include "WebSocketClient.h"
#include <FastLED.h>

class LedControl {
  public:
    LedControl();
    void clear();
    void start();
    void stop();
    void update();
    void autoUpdate();
    void setupLeds();
    void showSolidColor();
    void setAutoIntensity(bool state);
    void setColor(int* rgb);
    void setColorType(int type);
    void setLen(int len);
    void setDelay(int ms);
    void clearTemp();
    void clearHeapMem();
    void blink(int* rgb, int am, int duration, int interval);

    void setSpectrumInfo(int intensity, int decay, int cutoff, int mxintensity, int animType);
    
    int8_t mode = 0x00;
    int8_t t = 3;
    int update_delay = 0;

    int p_sz = 0;
    double **p;

    class WebSocketClient *ws;
  private:
    void breath();
    void trail();
    //void fade();
    void spectrum();
    void animateSolid(float intensity);
    void animateLine(float intensity);
    void shiftToLeft();
    void shiftToRight();
    void setFade();
    void calcInfiniteFade(double intensity, int ls_size, double **phases, int* result);
    void calcLinearFade(double intensity, int ls_size, double **phases, int* result);

    int sample();
    
    bool state = false;
    bool autoMode = false;

    int leds = 50;
    int led = 0;
    int trail_len = 10;

    int maxVal = 0;
    int lval = 0;
    int spectrumCutoff = 100;
    int spectrumDecay = 10;
    int animation = 0;
    
    int asset = 0;
    int strip_color[3];
    int** fade_color;

    int clr_type = 0;
    int8_t SOLID = 0x1;
    int8_t BREATH = 0x2;
    int8_t SHIFT_LEFT = 0x3;
    int8_t SHIFT_RIGHT = 0x4;
    int8_t SPECTRUM = 0x5;
    
    long info_ms;
    long l_action = 0;
    long l_d = 0;
    long lastAutoUpdate = 0;
    long lastUpdate = 0;
    
    int breathIntensity = 0;
    bool breathDescend = false;

    bool autoIntensityCtrl = false;
    float lightIntensity = 1.0;
    long lastLightUpdate = 0;

    bool blinkLed = false;
    bool blinking = false;
    int blinkCount = 0;
    int blinkAmount = 2;
    int blinkDelay = 100;
    int blinkInterval = 300;
    int blinkColor[3] = {0, 100, 255};
    long blinkTime = 0;
    
    CRGB strip[50];
};

#endif
