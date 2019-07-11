import { Component, OnInit } from '@angular/core';
import { WeatherService } from '../weather.service';
import * as Highcharts from 'highcharts';
import { Weather } from './weather.model';

const chartXAxisDateTimeFormat = '%e %b %H:%M';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.css']
})
export class WeatherComponent implements OnInit {
  weather: Weather;

  highcharts = Highcharts;
  chartOptions = {
     chart: {
        type: "spline"
     },
     title: {
        text: ``
     },
     subtitle: {
        text: "Source: Open Weather Map"
     },
     xAxis:{
      type: 'datetime',
      dateTimeLabelFormats : {
        second: chartXAxisDateTimeFormat,
        minute: chartXAxisDateTimeFormat,
        hour: chartXAxisDateTimeFormat,
        day: chartXAxisDateTimeFormat,
        week: chartXAxisDateTimeFormat,
        month: chartXAxisDateTimeFormat,
        year: chartXAxisDateTimeFormat
      },
      title: {
        text: 'Time'
      }
     },
     yAxis: {
        title:{
           text:"Value"
        }
     },
     tooltip: {
        valueSuffix:""
     },
     series: [
        {
          name: 'Average Temperature',
          data: []
        },

        {
          name: 'Average Humidity',
          data: []
        }
      ]
  };

  // 1,2,3,4,5,6,7,8,9,0
  // q,w,e,r,t,y,u,i,o,p

  // [1,q],[2,w]

  constructor(private weatherService: WeatherService) {}

  setCityName(cityName) {
    this.weatherService.getWeatherForCityName(cityName)
      .then((weather: Weather) => {
        const temperatures = weather.getTemperatureHourly();
        const humidity = weather.getHumidity();
        const seriesDataTemp = weather.getTimeHourly().map((time, index) => [time, temperatures[index]]);
        const seriesDataHumidity = weather.getTimeHourly().map((time, index) => [time, humidity[index]]);
        this.highcharts.charts[0].series[0].setData(seriesDataTemp);
        this.highcharts.charts[0].series[1].setData(seriesDataHumidity);
        this.highcharts.charts[0].setTitle({text: `Temperature in ${cityName}`});
      })
    ;
  }


  ngOnInit() {

  }

}
