import Alarm from "./Alarm";
import AlarmNotifierSpy from "./notifier/AlarmNotifierSpy";
import PressureSensorSafetyChecker from "./safetyChecks/PressureSensorSafetyChecker";
import SensorStub from "./SensorStub";

const LOW_PRESSURE_THRESHOLD = 17;
const HIGH_PRESSURE_THRESHOLD = 21;
const BELOW_LOW_PRESSURE_THRESHOLD = 16;
const ABOVE_HIGH_PRESSURE_THRESHOLD = 22;

describe('Alarm', () => {

  describe('Pressure sensor', () => {
    let notifierSpy;
    let sensorStub;
    let alarm;
    
    const activatePressureAlarm = () => {
      sensorStub.mockReturnValue(BELOW_LOW_PRESSURE_THRESHOLD);
      alarm.check();
    }
  
    const deactivatePressureAlarm = () => {
      sensorStub.mockReturnValue(LOW_PRESSURE_THRESHOLD);
      alarm.check();
    }

    beforeEach(() => {
      notifierSpy = new AlarmNotifierSpy();
      sensorStub = new SensorStub(BELOW_LOW_PRESSURE_THRESHOLD);
      alarm = new Alarm(
        sensorStub,
        notifierSpy,
        new PressureSensorSafetyChecker()
      );
    })
    describe('activates alarm', () => {

      test("should activate alarm when less than lower threshold", () => {
        // arrange
        sensorStub.mockReturnValue(BELOW_LOW_PRESSURE_THRESHOLD);
    
        // act
        alarm.check();
    
        // assert
        expect(notifierSpy.activatedCalls).toEqual(1);
      });
    
      test("should activate alarm when greater than upper threshold", () => {
        // arrange
        sensorStub.mockReturnValue(ABOVE_HIGH_PRESSURE_THRESHOLD);
    
        // act
        alarm.check();
    
        // assert
        expect(notifierSpy.activatedCalls).toEqual(1);
      });
    })

    describe('deactivates alarm', () => {

      test("should deactivate alarm for lower threshold limit", () => {
        // arrange
        activatePressureAlarm();
        sensorStub.mockReturnValue(LOW_PRESSURE_THRESHOLD)
    
        // act
        alarm.check();
    
        // assert
        expect(notifierSpy.deactivatedCalls).toEqual(1);
      });
    
      test("should deactivate alarm for upper threshold", () => {
        // arrange
        activatePressureAlarm();
        sensorStub.mockReturnValue(HIGH_PRESSURE_THRESHOLD);
    
        // act
        alarm.check();
    
        // assert
        expect(notifierSpy.deactivatedCalls).toEqual(1);
      });
    })


  
  
    test('should not activate alarm if already activated', () => {
      // arrange
      activatePressureAlarm();
      sensorStub.mockReturnValue(ABOVE_HIGH_PRESSURE_THRESHOLD);
      notifierSpy.reset();
  
      // act
      alarm.check();
  
      // assert
      expect(notifierSpy.activatedCalls).toEqual(0);
    })
  
    test('should not deactivate alarm if already deactivated', () => {
      // arrange
      deactivatePressureAlarm();
      sensorStub.mockReturnValue(LOW_PRESSURE_THRESHOLD);
      notifierSpy.reset();
  
      // act
      alarm.check();
  
      // assert
      expect(notifierSpy.deactivatedCalls).toEqual(0);
    })
  })
  
});