#ifndef FeedTimeManager_h
#define FeedTimeManager_h

#include "Arduino.h"

class FeedTimeManager {
  public:
    FeedTimeManager(int waterPin, int feederPin);

    void syncTime(int hour, int minute, int seconds);
    void getTime(int* arr);
    void addTime(int hour, int minute, int foodAmount, int waterFlowTime, bool state);
    void removeTime(int hour, int minute);
    void editTime(int oldH, int oldM, int newH, int newM, int FA, int WFT);
    void setTimeState(int hour, int minute, bool state);
    void setOption(String option, bool state);
    void enableFeed(int FA);
    void update();
    void reset();

    void registerSecChange(void (*event)(int));
    void registerMinChange(void (*event)(int));
    void registerHourChange(void (*event)(int));
  private:
    int waterPin;
    int feederPin;
    int waterSensor;
    
    int timesLen = 0;
    int activeTime = 0;

    int syncedHour = 0;
    int syncedMin = 0;
    int syncedSec = 0;
    
    long lastSync = 0;
    long feedingStartTime = 0;
    long feedingDuration = 0;
    long flowDelay = 0;

    long feedTimes[24][2];
    bool feedTimesState[24];
    int foodAmounts[24];
    int waterDuration[24];

    bool autoMode = false;
    bool synced = false;
    bool waterFlow = false;
    bool lockWaterFlow = false;
    bool feeding = false;
    bool flowDelayState = false;

    void (*onSecChange)(int);
    void (*onMinChange)(int);
    void (*onHourChange)(int);
};

#endif
