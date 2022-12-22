import PressureSensorSafetyChecker from "./safetyChecks/PressureSensorSafetyChecker";

var alarmOn = Symbol();

export default class Alarm {
  constructor(sensor, alarmNotifier, safetyChecker) {
    this.sensor = sensor;
    this.alarmNotifier = alarmNotifier;
    this.safetyChecker = safetyChecker;
    this[alarmOn] = false;
  }

  check() {
    const sensorValue = this.sensor.getNextValue();

    if (!this.safetyChecker.isValueSafe(sensorValue)) {
      if(!this[alarmOn]) {
        this[alarmOn] = true;
        this.alarmNotifier.notifyAlarmActivated();
      }
    } else {
      if(this[alarmOn]) {
        this[alarmOn] = false;
        this.alarmNotifier.notifyAlarmDeactivated();
      }
    }
  }
};

