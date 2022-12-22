import Sensor from './Sensor';

export default class SensorStub extends Sensor {
  constructor(returnValue) {
    super();
    this.returnValue = returnValue;
  }

  mockReturnValue(returnValue) {
    this.returnValue = returnValue;
  }

  getNextValue() {
    return this.returnValue;
  }
} 
