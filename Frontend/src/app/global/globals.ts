import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class Globals {
  readonly backendUri: string = this.findBackendUrl();

  private findBackendUrl(): string {

    if (window.location.port === '4200') {
      // local `ng serve`, backend at localhost:8080
      return 'http://localhost:4000/api/v1';
    } else {
      return 'http://45.93.250.193:4000/api/v1';
    }
  }
}
