export class Weather {
  private temperatureHourly: number[];
  private timeDate: number[];
  private humidity: number[];


  constructor(temperatureHourly: number[], timeDate: number[], humidity: number[]) {
    this.temperatureHourly = temperatureHourly;
    this.timeDate = timeDate.map(timestamp => timestamp * 1000);
    this.humidity = humidity;
  }

  getTemperatureHourly() {
    return this.temperatureHourly;
  }
  getTimeHourly() {
    return this.timeDate;
  }
  getHumidity() {
    return this.humidity;
  }
}

