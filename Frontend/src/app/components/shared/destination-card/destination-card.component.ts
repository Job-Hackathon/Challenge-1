import { Component, Input, ElementRef, ViewChild, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PossibleTravelLocationDto } from '../../../dtos';

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
    destinationAirportCode: "",
    destinationAirportName: "",
    distance: 0,
    target_weather: "",
    locationTemperature: 0,
    imageUrl: ""
  }

  constructor(private cdr: ChangeDetectorRef) {}

  placeholderUrl: string = 'https://placehold.co/300';


  ngAfterViewInit(): void {
    console.log("HELLO")
    // Ensure cardDiv is available and has width
    if (this.cardDiv && this.cardDiv.nativeElement.offsetWidth) {
      const width = this.cardDiv.nativeElement.offsetWidth - 2;
      this.placeholderUrl = `https://placehold.co/${width}x300`;
      this.cdr.detectChanges();

    } else {
      console.log("NOT FOUND")

      // Fallback in case width isn't available (though it should be)
      this.placeholderUrl = 'https://placehold.co/300';
    }
  }

  roundToNearestInteger(value: number): number {
    return Math.round(value);
  }
}
