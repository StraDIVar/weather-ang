import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { StorageServiceModule } from 'angular-webstorage-service';
import { NgxPaginationModule } from 'ngx-pagination';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatCustomModule } from './mat-custom.module';

import { AppComponent } from './app.component';
import { PlacesComponent } from './places/places.component';
import { PlaceDetailComponent } from './place-detail/place-detail.component';
import { PlaceSearchComponent } from './place-search/place-search.component';

@NgModule({
  declarations: [
    AppComponent,
    PlacesComponent,
    PlaceDetailComponent,
    PlaceSearchComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    StorageServiceModule,
    HttpClientModule,
    NgxPaginationModule,
    BrowserAnimationsModule,
    MatCustomModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
