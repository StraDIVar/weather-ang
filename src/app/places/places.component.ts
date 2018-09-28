import { Component, OnInit } from '@angular/core';
import { Place } from '../place';
import { PlaceService } from '../place.service';

@Component({
  selector: 'app-places',
  templateUrl: './places.component.html',
  styleUrls: ['./places.component.styl']
})
export class PlacesComponent implements OnInit {

  places: Place[];

  constructor(private placeService: PlaceService) { }

  ngOnInit() {
    this.placeService.addPlace({id: 0, name: 'Minssssk'}); // TODO: debug only, remove
    this.getPlaces();
  }

  getPlaces(): void {
    this.placeService.getPlaces()
      .subscribe(places => this.places = places);
  }

  delete(place: Place): void {
    this.placeService.deletePlace(place)
      .subscribe(places => this.places = places);
  }

}
