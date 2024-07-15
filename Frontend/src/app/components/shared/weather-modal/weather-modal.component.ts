import { Component, Input, OnInit } from '@angular/core';
import { WeatherModalDataDto } from '../../../dtos';

@Component({
  selector: 'app-weather-modal',
  standalone: true,
  imports: [],
  templateUrl: './weather-modal.component.html',
  styleUrl: './weather-modal.component.scss'
})
export class WeatherModalComponent implements OnInit{

  ngOnInit(): void {
    console.log(this.weatherData);
  }

  @Input() weatherData: WeatherModalDataDto = {
    destination: {
      destinationAirportCountry: "",
      destinationAirportCode: "",
      destinationAirportName: "",
      distance: 0,
      target_weather: "",
      locationTemperature: 0,
      imageUrl: ""
    },
    forecast: []
  }


}
