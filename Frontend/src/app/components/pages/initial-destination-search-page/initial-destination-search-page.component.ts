import { Component, OnInit } from '@angular/core';
import { TravelStartDto, AirportDto } from '../../../dtos';
import { NgForm } from '@angular/forms';
import { FormsModule } from '@angular/forms'; // Import FormsModule
import { AirportAutocompleteService, AirportFinderService } from '../../../services';
import { CommonModule } from '@angular/common';
import { Subject } from 'rxjs';
import { debounceTime, switchMap, filter } from 'rxjs/operators';
import { Router } from '@angular/router';

@Component({
  selector: 'app-initial-destination-search-page',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './initial-destination-search-page.component.html',
  styleUrl: './initial-destination-search-page.component.scss'
})
export class InitialDestinationSearchPageComponent implements OnInit {

  constructor(
    private airportAutocompleteService: AirportAutocompleteService,
    private airportFinderService: AirportFinderService,
    private router: Router
  ) {}

  airportInputType: string = "name";

  travelStartDto: TravelStartDto = {
    originAirportCode: "",
    maxRadius: 2000,
    targetWeather: "sunny",
    minimalTemperature: 10,
    maximalTemperature: 40
  };

  loading: boolean = false; // Variable to control loading overlay

  currentInputFieldValue: string = "";

  matchingAirports: AirportDto[] = [];

  private searchSubject = new Subject<string>();

  ngOnInit(): void {
    this.searchSubject.pipe(
      debounceTime(750), // Wait for 750 milliseconds after the last event before emitting the value
      filter(value => value.trim().length > 0), // Only proceed if the value is not empty
      switchMap(value => this.airportAutocompleteService.getAutocompleteSuggestions(value))
    ).subscribe(
      (airports) => {
        this.matchingAirports = airports;
      },
      (error) => {
        console.log(error);
      }
    );
  }


  setWeatherPreference(weather: string) {
    this.travelStartDto.targetWeather = weather;
  }

  onSubmit(form: NgForm): void {
    this.loading = true;
    this.airportFinderService.getTargetAirports(this.travelStartDto).subscribe(
      (res) => {
        this.loading = false;
        this.router.navigate(['/destination-results'], { state: { results: res, request:  this.travelStartDto} });
      },
      (error) => {
        this.loading = false;
        console.log(error);
      }
    );
  }


  onAirportInputChange() {
    // Fetch autocomplete suggestions based on current input field value
    this.travelStartDto.originAirportCode = "";
    this.searchSubject.next(this.currentInputFieldValue);
  }

  onAirportSelection(selectedAirportName: string) {
    const selectedAirport = this.matchingAirports.find(airport => airport.airport === selectedAirportName);
    if (selectedAirport) {
      this.travelStartDto.originAirportCode = selectedAirport.iata;
    }
  }
}
