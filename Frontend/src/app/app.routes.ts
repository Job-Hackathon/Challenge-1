import { Routes } from '@angular/router';
import { InitialDestinationSearchPageComponent, StartPageComponent } from './components';

export const routes: Routes = [
  { path: 'destination-search', component: InitialDestinationSearchPageComponent },
  { path: '', component: StartPageComponent }
];
