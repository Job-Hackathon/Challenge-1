import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Globals } from '../global/globals';
import { Observable } from 'rxjs';
import { WeatherForecastDto } from '../dtos';

@Injectable({
  providedIn: 'root',
})
export class AirportWeatherService {

  private airportFinderBaseUri: string = this.globals.backendUri + '/airport-weather';

  constructor(private httpClient: HttpClient, private globals: Globals) {}

  getWeatherAirport(iata: string): Observable<WeatherForecastDto[]> {
    return this.httpClient.get<WeatherForecastDto[]>(`${this.airportFinderBaseUri}?iata=${iata}`);
  }
}
