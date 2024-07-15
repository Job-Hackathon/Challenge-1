import { Component, Input, OnInit } from '@angular/core';
import { WeatherForecastDto, WeatherModalDataDto } from '../../../dtos';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-weather-modal',
  standalone: true,
  imports: [CommonModule],
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

  roundToNearestInteger(value: number): number {
    return Math.round(value);
  }

  formatDate(date: string): string {
    const dateObj = new Date(date);

    const day = dateObj.toLocaleDateString('en-US', { weekday: 'long' });
    const month = dateObj.toLocaleDateString('en-US', { month: 'long' });
    const dayOfMonth = dateObj.getDate();
    const year = dateObj.getFullYear();

    return `${day}, ${month} ${dayOfMonth}, ${year}`;
  }

  getWeatherIconFromData(data: WeatherForecastDto): string {
    const { sunshineDuration, rainSum, showersSum, snowfallSum, uvIndexMax } = data;

    if (snowfallSum > 0) {
      return "bi-snow";
    } else if (rainSum > 0 || showersSum > 0) {
      return "bi-cloud-rain";
    } else if (sunshineDuration > 0.75 * data.daylightDuration && uvIndexMax > 5) {
      return "bi-sun";
    } else if (sunshineDuration < 0.25 * data.daylightDuration) {
      return "bi-cloud";
    } else {
      return "bi-cloud-sun";
    }
  }

}
