import { Inject, Injectable } from '@angular/core';
import { LOCAL_STORAGE, StorageService } from 'angular-webstorage-service';
import { Place } from './place';
import { PlaceSuggestion } from './place-suggestion';
import { Observable, of, Subject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError  } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PlaceService {
  static STORAGE_KEY = 'weather-ang-places';
  static WEATHER_API_KEY = 'Wl0CVjmemmXYgGytOopGHvQxitWCSG87'; // TODO: move this out of Git
  static WEATHER_API_AUTOCOMPLETE_URL = 'http://dataservice.accuweather.com/locations/v1/cities/autocomplete';
  static WEATHER_API_GEOPOSITION_URL = 'http://dataservice.accuweather.com/locations/v1/cities/geoposition/search';

  placesChange: Subject<Place[]> = new Subject<Place[]>();

  constructor(@Inject(LOCAL_STORAGE) private storage: StorageService, private http: HttpClient) {

  }

  static autocompleteUrl(term: string): string {
    return `${PlaceService.WEATHER_API_AUTOCOMPLETE_URL}?apikey=${PlaceService.WEATHER_API_KEY}&q=${term}`;
  }

  static geopositionUrl(position: Position): string {
    return `${PlaceService.WEATHER_API_GEOPOSITION_URL}?apikey=${PlaceService.WEATHER_API_KEY}` +
      `&q=${position.coords.latitude},${position.coords.longitude}`;
  }

  private readPlaces(): Place[] {
    return this.storage.get(PlaceService.STORAGE_KEY) || [];
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      console.error(error, `${operation} failed: ${error.message}`);

      return of(result as T);
    };
  }

  getPlaces(): Observable<Place[]> {
    return of(this.readPlaces());
  }

  getPlace(id: number): Observable<Place> {
    const places = this.readPlaces().filter(p => p.id === id);
    const place = places.length ? places[0] : new Place();
    return of(place);
  }

  getPlaceForPosition(position: Position): Observable<PlaceSuggestion> {
    return this.http.get<PlaceSuggestion>(PlaceService.geopositionUrl(position)).pipe(
      catchError(this.handleError('get place by geoposition', new PlaceSuggestion()))
    );
  }

  addPlace(place: Place): void {
    const places = this.readPlaces();

    if (places.filter((p) => p.id === place.id ).length === 0) {
      places.push(place);
    }

    this.storage.set(PlaceService.STORAGE_KEY, places);
    this.placesChange.next(places);
  }

  deletePlace(place: Place | number): void {
    const id = typeof place === 'number' ? place : place.id;
    const oldPlaces = this.readPlaces();
    const places = [];
    oldPlaces.forEach((p) => {
      if (p.id !== id) {
        places.push(p);
      }
    });
    this.storage.set(PlaceService.STORAGE_KEY, places);
    this.placesChange.next(places);
  }

  searchPlaces(term: string): Observable<PlaceSuggestion[]> {
    if (!term.trim()) {
      return of([]);
    }
    return this.http.get<PlaceSuggestion[]>(PlaceService.autocompleteUrl(term)).pipe(
      catchError(this.handleError('searching places', []))
    );
  }

}
