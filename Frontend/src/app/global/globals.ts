import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class Globals {
  readonly backendUri: string = this.findBackendUrl();

  private findBackendUrl(): string {
    return 'http://localhost:4000/api/v1';
    /**
    if (window.location.port === '4200') {
      // local `ng serve`, backend at localhost:8080
      return 'http://localhost:4000/api/v1';
    } else {
      // assume deployed somewhere and backend is available at same host/port as frontend
      return window.location.protocol + '//' + window.location.host + window.location.pathname + 'api/v1';
    }
      */
  }
}
