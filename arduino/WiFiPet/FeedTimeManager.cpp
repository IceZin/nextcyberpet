#include "FeedTimeManager.h"

FeedTimeManager::FeedTimeManager(int wPin, int fPin) {
  waterPin = wPin;
  feederPin = fPin;

  pinMode(waterPin, OUTPUT);
  pinMode(feederPin, OUTPUT);
}

void FeedTimeManager::registerSecChange(void (*event)(int)) {
  onSecChange = *event;
}
void FeedTimeManager::registerMinChange(void (*event)(int)) {
  onMinChange = *event;
}
void FeedTimeManager::registerHourChange(void (*event)(int)) {
  onHourChange = *event;
}

void FeedTimeManager::syncTime(int hour, int minute, int seconds) {
  syncedHour = hour;
  syncedMin = minute;
  syncedSec = seconds;
  lastSync = millis();

  synced = true;
}

void FeedTimeManager::getTime(int* arr) {
  arr[0] = syncedHour;
  arr[1] = syncedMin;
}

void FeedTimeManager::setOption(String option, bool state) {
  if (option == "waterFlow") {
    waterFlow = state;
    lockWaterFlow = state;

    if (state) digitalWrite(waterPin, HIGH);
    else digitalWrite(waterPin, LOW);
  } else if (option == "auto") {
    autoMode = state;
  }
}

void FeedTimeManager::setTimeState(int hour, int minute, bool state) {
  int i;
  for (i = 0; i < timesLen; i++)
    if (feedTimes[i][0] == hour and feedTimes[i][1] == minute)
      break;

  if (i < timesLen) {
    feedTimesState[i] = state;
  }
}

void FeedTimeManager::addTime(int hour, int minute, int foodAmount, int waterFlowTime, bool state) {
  feedTimes[timesLen][0] = hour;
  feedTimes[timesLen][1] = minute;

  foodAmounts[timesLen] = foodAmount;
  waterDuration[timesLen] = waterFlowTime * 60000;

  feedTimesState[timesLen] = state;

  timesLen++;
}

void FeedTimeManager::removeTime(int hour, int minute) {
  int i;
  for (i = 0; i < timesLen; i++)
    if (feedTimes[i][0] == hour and feedTimes[i][1] == minute)
      break;
   
  if (i < timesLen) {
    timesLen -= 1;
    for (int j = i; j < timesLen; j++) {
      feedTimes[j][0] = feedTimes[j+1][0];
      feedTimes[j][1] = feedTimes[j+1][1];

      feedTimesState[j] = feedTimesState[j + 1];
      waterDuration[j] = waterDuration[j + 1];
      foodAmounts[j] = foodAmounts[j + 1];
    }
  }
}

void FeedTimeManager::editTime(int oldH, int oldM, int newH, int newM, int FA, int WFT) {
  int i;
  for (i = 0; i < timesLen; i++)
    if (feedTimes[i][0] == oldH and feedTimes[i][1] == oldM)
      break;

  if (i < timesLen) {
    feedTimes[i][0] = newH;
    feedTimes[i][1] = newM;

    foodAmounts[i] = FA;
    waterDuration[i] = WFT * 60000;
  }
}

void FeedTimeManager::update() {
  if (!autoMode) return;
  
  if (millis() - lastSync >= 1000 and synced) {
    lastSync = millis();

    syncedSec++;

    if (syncedSec == 60) {
      syncedSec = 0;
      syncedMin++;

      if (syncedMin == 60) {
        syncedMin = 0;
        syncedHour++;
  
        if (syncedHour == 24) syncedHour = 0;

        //onHourChange(syncedHour);
      }

      onMinChange(syncedMin);

      for (int i = 0; i < timesLen; i++) {
        if (syncedHour == feedTimes[i][0] and syncedMin == feedTimes[i][1] and feedTimesState[i]) {
          if (!feeding) {
            feeding = true;
            feedingDuration = 30000;
          }

          if (!waterFlow and !lockWaterFlow) {
            waterFlow = true;
            digitalWrite(waterPin, HIGH);

            Serial.println("Water Flow Activated");
          }

          feedingStartTime = millis();
          
          activeTime = i;
  
          break;
        }
      }
    }

    //onSecChange(syncedSec);
  }

  if (waterFlow and !lockWaterFlow) {
    if (millis() - feedingStartTime >= waterDuration[activeTime]) {
      waterFlow = false;
      digitalWrite(waterPin, LOW);
    }
  }

  if (feeding) {
    if (millis() - feedingStartTime >= feedingDuration) {
      feeding = false;
      digitalWrite(feederPin, LOW);
    }
  }
}

void FeedTimeManager:enableFeed(int FA) {
  if (feeding) return;

  feedingDuration = FA * 10;
  feedingStartTime = millis();
  feeding = true;

  digitalWrite(feederPin, HIGH);
}

void FeedTimeManager::reset() {
  memset(feedTimes, 0, sizeof(feedTimes));
  memset(feedTimesState, 0, sizeof(feedTimesState));
  memset(foodAmounts, 0, sizeof(foodAmounts));
  memset(waterDuration, 0, sizeof(waterDuration));

  timesLen = 0;
  activeTime = 0;

  syncedHour = 0;
  syncedMin = 0;
  syncedSec = 0;
  
  lastSync = 0;
  feedingStartTime = 0;
  feedingDuration = 0;

  synced = false;
  waterFlow = false;
  lockWaterFlow = false;
  feeding = false;
  autoMode = false;
}
