import { Routes } from '@angular/router';
import { DestinationResultsPageComponent, InitialDestinationSearchPageComponent, StartPageComponent } from './components';

export const routes: Routes = [
  { path: 'destination-search', component: InitialDestinationSearchPageComponent },
  { path: 'destination-results', component: DestinationResultsPageComponent },
  { path: '', component: StartPageComponent }
];
