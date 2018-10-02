import { Component, OnInit } from '@angular/core';
import { Place } from '../place';
import { PlaceService } from '../place.service';

@Component({
  selector: 'app-places',
  templateUrl: './places.component.html',
  styleUrls: ['./places.component.styl']
})
export class PlacesComponent implements OnInit {
  page = 1;
  places: Place[];
  PER_PAGE = 5;

  constructor(private placeService: PlaceService) { }

  ngOnInit() {
    this.getPlaces();
    this.placeService.placesChange.subscribe((places: Place[]) => this.places = places);
  }

  getPlaces(): void {
    this.placeService.getPlaces()
      .subscribe((places: Place[]) => this.places = places);
  }

  delete(place: Place): void {
    this.placeService.deletePlace(place);
  }

}
