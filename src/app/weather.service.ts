
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { AngularFireDatabase } from 'angularfire2/database';

import { Weather } from './weather/weather.model';
// import 'rxjs/add/operator/map';
// import 'rxjs/add/operator/catch';
// import 'rxjs/add/operator/toPromise';

@Injectable({
  providedIn: 'root',
})
export class WeatherService {

  private basePath = '/index';
  public items: any;
  public item: any;

  constructor(private httpClient: HttpClient, private db: AngularFireDatabase ) { }

  getWeatherForCityName(cityName: String) {

    // check firebase for this city
    // if we have it return the weather wrapped in promise

    //otherwise continue below

    return this.httpClient.get(`https://api.openweathermap.org/data/2.5/forecast?APPID=a1b15b253a3f2de4b37fb81de974903b&q=${cityName}&units=metric`)
    .toPromise()
    .then((response: any) => {

      // we don't have this in firebase, so we add it here
      // firebaseservice.addWeather.......I know I shouldn't leave commented out code but might return to this later
                // const obj = this.db.database.ref(this.basePath);
                // obj.push(data);
                // console.log('Success');


      return new Weather(
        response.list.map(entry => entry.main.temp),
        response.list.map(entry => entry.dt),
        response.list.map(entry => entry.main.humidity)
      );
    })
    .catch(console.error)
  ;
  }
}


