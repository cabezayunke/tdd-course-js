export default class AlarmNotifierSpy {
    activatedCalls = 0;
    deactivatedCalls = 0;

    notifyAlarmActivated() {
        this.activatedCalls++;
    }

    notifyAlarmDeactivated() {
        this.deactivatedCalls++;
    }

    reset() {
        this.activatedCalls = 0;
        this.deactivatedCalls = 0;
    }
}