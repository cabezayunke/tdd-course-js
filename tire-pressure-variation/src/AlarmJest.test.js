import Alarm from "./Alarm";
import AlarmNotifierSpy from "./notifier/AlarmNotifierSpy";
import PressureSensorSafetyChecker from "./safetyChecks/PressureSensorSafetyChecker";
import SensorStub from "./SensorStub";

const LOW_PRESSURE_THRESHOLD = 17;
const HIGH_PRESSURE_THRESHOLD = 21;
const UNSAFE_LOW_PRESSURE_THRESHOLD = 16;
const UNSAFE_HIGH_PRESSURE_THRESHOLD = 22;

describe('Alarm', () => {

  describe('Pressure sensor', () => {
    let notifierSpy;
    let sensorStub;
    let alarm;
    let sensorSafetyCheckerStub;
    
    const activatePressureAlarm = () => {
      sensorStub.getNextValue.mockReturnValue(UNSAFE_LOW_PRESSURE_THRESHOLD);
      sensorSafetyCheckerStub.isValueSafe.mockReturnValue(false);
      alarm.check();
    }
  
    const deactivatePressureAlarm = () => {
      sensorStub.getNextValue.mockReturnValue(LOW_PRESSURE_THRESHOLD);
      sensorSafetyCheckerStub.isValueSafe.mockReturnValue(true);
      alarm.check();
    }

    beforeEach(() => {
      notifierSpy = new AlarmNotifierSpy();
      sensorStub = {getNextValue: jest.fn()}
      sensorSafetyCheckerStub = {isValueSafe: jest.fn()}
      alarm = new Alarm(
        sensorStub,
        notifierSpy,
        sensorSafetyCheckerStub
      );
    })
    describe('activates alarm', () => {
   
      test("should activate alarm when threshold is unsafe", () => {
        // arrange
        sensorStub.getNextValue.mockReturnValue(UNSAFE_HIGH_PRESSURE_THRESHOLD);
        sensorSafetyCheckerStub.isValueSafe.mockReturnValue(false);

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
        sensorStub.getNextValue.mockReturnValue(LOW_PRESSURE_THRESHOLD)
        sensorSafetyCheckerStub.isValueSafe.mockReturnValue(true);

        // act
        alarm.check();
    
        // assert
        expect(notifierSpy.deactivatedCalls).toEqual(1);
      });
    
      test("should deactivate alarm for upper threshold", () => {
        // arrange
        activatePressureAlarm();
        sensorStub.getNextValue.mockReturnValue(HIGH_PRESSURE_THRESHOLD);
        sensorSafetyCheckerStub.isValueSafe.mockReturnValue(true);

        // act
        alarm.check();
    
        // assert
        expect(notifierSpy.deactivatedCalls).toEqual(1);
      });

      test("should deactivate alarm for upper threshold", () => {
        // arrange
        activatePressureAlarm();
        expect(notifierSpy.activatedCalls).toEqual(1)
        sensorStub.getNextValue.mockReturnValue(HIGH_PRESSURE_THRESHOLD);
        sensorSafetyCheckerStub.isValueSafe.mockReturnValue(true);

        alarm.check();
        expect(notifierSpy.deactivatedCalls).toEqual(1);

        // act
        alarm.check();
    
        // assert
        expect(notifierSpy.deactivatedCalls).toEqual(1);
        expect(notifierSpy.activatedCalls).toEqual(1);
      });
    })


  
  
    test('should not activate alarm if already activated', () => {
      // arrange
      activatePressureAlarm();
      sensorStub.getNextValue.mockReturnValue(UNSAFE_HIGH_PRESSURE_THRESHOLD);
      sensorSafetyCheckerStub.isValueSafe.mockReturnValue(false);
      notifierSpy.reset();
  
      // act
      alarm.check();
  
      // assert
      expect(notifierSpy.activatedCalls).toEqual(0);
    })
  
    test('should not deactivate alarm if already deactivated', () => {
      // arrange
      deactivatePressureAlarm();
      sensorStub.getNextValue.mockReturnValue(LOW_PRESSURE_THRESHOLD);
      sensorSafetyCheckerStub.isValueSafe.mockReturnValue(true);

      notifierSpy.reset();
  
      // act
      alarm.check();
  
      // assert
      expect(notifierSpy.deactivatedCalls).toEqual(0);
    })
  })
  
});