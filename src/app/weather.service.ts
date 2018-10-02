import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Place } from './place';
import { CurrentWeather } from './current-weather';
import { catchError } from 'rxjs/operators';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {
  static WEATHER_API_KEY = 'Wl0CVjmemmXYgGytOopGHvQxitWCSG87'; // TODO: move this out of Git
  static WEATHER_API_CURRENT_WEATHER_URL = 'http://dataservice.accuweather.com/currentconditions/v1';

  constructor(private http: HttpClient) { }

  static currentWeatherUrl(placeId: number): string {
    return `${WeatherService.WEATHER_API_CURRENT_WEATHER_URL}/${placeId}` +
      `?apikey=${WeatherService.WEATHER_API_KEY}`;
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      console.error(error, `${operation} failed: ${error.message}`);

      return of(result as T);
    };
  }

  getCurrentWeather(place: Place | number): Observable<CurrentWeather[]> {
    const id = typeof place === 'number' ? place : place.id;

    return this.http.get<CurrentWeather[]>(WeatherService.currentWeatherUrl(id)).pipe(
      catchError(this.handleError(`getting current weather for id=${id}`, [new CurrentWeather()]))
    );
  }

}
