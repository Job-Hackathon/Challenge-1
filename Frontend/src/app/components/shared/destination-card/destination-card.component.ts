import { Component, Input, ElementRef, ViewChild, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { PossibleTravelLocationDto } from '../../../dtos';
import { countryNames, countryImages } from '../../../enums';
import { AirportWeatherService, ModalService } from '../../../services';
import { WeatherModalDataDto } from '../../../dtos';

@Component({
  selector: 'app-destination-card',
  standalone: true,
  imports: [],
  templateUrl: './destination-card.component.html',
  styleUrl: './destination-card.component.scss'
})
export class DestinationCardComponent implements AfterViewInit{
  @ViewChild('cardDiv') cardDiv!: ElementRef<HTMLDivElement>;

  @Input() destination: PossibleTravelLocationDto = {
    destinationAirportCountry: "",
    destinationAirportCode: "",
    destinationAirportName: "",
    distance: 0,
    target_weather: "",
    locationTemperature: 0,
    imageUrl: ""
  }

  constructor(
    private cdr: ChangeDetectorRef,
    private modalService: ModalService,
    private airportWeatherService: AirportWeatherService
  ) {}

  placeholderUrl: string = 'https://placehold.co/300';


  ngAfterViewInit(): void {
    // Ensure cardDiv is available and has width
    if (this.cardDiv && this.cardDiv.nativeElement.offsetWidth) {
      const width = this.cardDiv.nativeElement.offsetWidth - 2;
      this.placeholderUrl = `https://placehold.co/${width}x300`;
      this.cdr.detectChanges();

    } else {
      // Fallback in case width isn't available (though it should be)
      this.placeholderUrl = 'https://placehold.co/300';
    }
  }

  roundToNearestInteger(value: number): number {
    return Math.round(value);
  }

  getCountryFullName(code: string): string {
    return countryNames[code] || 'Unknown'; // Handle if code is not found
  }

  getCountryImagePath(code: string): string {
    return countryImages[code] || '';
  }

  removeAirportWordAndShorten(src: string): string {
    // at max 30 characters

    // remove any remaining string if a '(' is found
    const index = src.indexOf('(');

    if (index != -1 ) {
      src = src.substring(0, index);
    }

    return src.replace('Airport', '');
  }

  showWeatherModal(): void {
    this.airportWeatherService.getWeatherAirport(this.destination.destinationAirportCode).subscribe(
      (res) => {
        let weatherModalData: WeatherModalDataDto = {
          destination: this.destination,
          forecast: res
        }

        this.modalService.openWeatherModal(weatherModalData);
      },
      (error) => {
        console.log(error);
      }
    )

  }
}
