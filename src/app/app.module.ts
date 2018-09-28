import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { PlacesComponent } from './places/places.component';
import { AppRoutingModule } from './/app-routing.module';
import { PlaceDetailComponent } from './place-detail/place-detail.component';
import { StorageServiceModule } from 'angular-webstorage-service';

@NgModule({
  declarations: [
    AppComponent,
    PlacesComponent,
    PlaceDetailComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    StorageServiceModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
