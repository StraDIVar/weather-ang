import { Inject, Injectable } from '@angular/core';
import { LOCAL_STORAGE, StorageService } from 'angular-webstorage-service';
import { Place } from './place';
import { Observable, of } from 'rxjs';

const STORAGE_KEY = 'weather-ang-places';

@Injectable({
  providedIn: 'root'
})
export class PlaceService {

  constructor(@Inject(LOCAL_STORAGE) private storage: StorageService) {

  }

  getPlaces(): Observable<Place[]> {
    return of(this._getPlaces());
  }

  addPlace(place: Place): Observable<Place> {
    const places = this._getPlaces();

    if (places.filter((p) => p.id === place.id ).length === 0) {
      places.push(place);
    }

    this.storage.set(STORAGE_KEY, places);
    return of(place);
  }

  deletePlace(place: Place | number): Observable<Place[]> {
    const id = typeof place === 'number' ? place : place.id;
    const oldPlaces = this._getPlaces();
    const places = [];
    places.forEach((p) => {
      if (p.id !== id) {
        places.push(p);
      }
    });
    this.storage.set(STORAGE_KEY, places);
    return of(places);
  }

  private _getPlaces(): Place[] {
    return this.storage.get(STORAGE_KEY) || [];
  }
}
