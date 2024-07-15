import { Injectable } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { WeatherModalComponent } from '../components';


@Injectable({
  providedIn: 'root',
})
export class ModalService {

  constructor(private modalService: NgbModal) {}

  openWeatherModal(weatherData: any): void {
    const modalRef = this.modalService.open(WeatherModalComponent, { size: 'lg' });
    modalRef.componentInstance.weatherData = weatherData;
  }
}
