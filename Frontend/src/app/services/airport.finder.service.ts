import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Globals } from '../global/globals';
import { Observable } from 'rxjs';
import { AirportDto } from '../dtos';
import { TravelStartDto } from '../dtos';

@Injectable({
  providedIn: 'root',
})
export class AirportFinderService {

  private airportFinderBaseUri: string = this.globals.backendUri + '/close-airports';

  constructor(private httpClient: HttpClient, private globals: Globals) {}

  getTargetAirports(requestObject: TravelStartDto): Observable<AirportDto[]> {
    return this.httpClient.post<AirportDto[]>(`${this.airportFinderBaseUri}`, requestObject);
  }
}
