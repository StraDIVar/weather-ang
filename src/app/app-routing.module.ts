import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PlacesComponent } from './places/places.component';
import { PlaceDetailComponent } from './place-detail/place-detail.component';

const routes: Routes = [
  { path: '', redirectTo: '/places', pathMatch: 'full' },
  { path: 'places', component: PlacesComponent },
  { path: 'place/:id', component: PlaceDetailComponent }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
