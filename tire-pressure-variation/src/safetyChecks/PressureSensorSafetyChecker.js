const LOW_PRESSURE_THRESHOLD = 17;
const HIGH_PRESSURE_THRESHOLD = 21;

export default class PressureSensorSafetyChecker {
    isValueSafe(value) {
        return value >= LOW_PRESSURE_THRESHOLD && value <= HIGH_PRESSURE_THRESHOLD;
    }
}