import { Component, OnInit } from '@angular/core';
import { PossibleTravelLocationDto, TravelStartDto } from '../../../dtos';
import { ActivatedRoute } from '@angular/router';
import { DestinationCardComponent } from "../../shared/destination-card/destination-card.component";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-destination-results-page',
  standalone: true,
  imports: [DestinationCardComponent, CommonModule],
  templateUrl: './destination-results-page.component.html',
  styleUrl: './destination-results-page.component.scss'
})
export class DestinationResultsPageComponent implements OnInit{

  results: PossibleTravelLocationDto[] = [];
  request: TravelStartDto = {
    originAirportCode: "",
    maxRadius: 100,
    targetWeather: "sunny",
    minimalTemperature: 20,
    maximalTemperature: 30
  };


  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.results = history.state.results;
    this.request = history.state.request;

    this.results.sort((a, b) => a.distance - b.distance);
  }


}
