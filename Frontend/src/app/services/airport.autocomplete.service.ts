import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Globals } from '../global/globals';
import { Observable } from 'rxjs';
import { AirportDto } from '../dtos';

@Injectable({
  providedIn: 'root',
})
export class AirportAutocompleteService {

  private autocompleteBaseUri: string = this.globals.backendUri + '/airport_list';

  constructor(private httpClient: HttpClient, private globals: Globals) {}

  getAutocompleteSuggestions(substring: string): Observable<AirportDto[]> {
    return this.httpClient.get<AirportDto[]>(`${this.autocompleteBaseUri}?substring=${substring}`);
  }
}
