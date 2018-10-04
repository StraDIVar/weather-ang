import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {WeatherService} from '../weather.service';
import {Place} from '../place';
import {CurrentWeather} from '../current-weather';
import {PlaceService} from '../place.service';

@Component({
  selector: 'app-place-detail',
  templateUrl: './place-detail.component.html',
  styleUrls: ['./place-detail.component.styl']
})
export class PlaceDetailComponent implements OnInit {
  place: Place;
  currentWeather: CurrentWeather;

  constructor(
    private route: ActivatedRoute,
    private placeService: PlaceService,
    private weatherService: WeatherService,
  ) {
    // TODO: may be there is a better solution to trigger update of component when changes only param in path
    route.params.subscribe(val => {
      this.ngOnInit();
    });
  }

  ngOnInit() {
    if (this.getId() === 'current') {
      this.getDefaultWeather();
    } else {
      this.getPlace(this.getId());
      this.getWeather(this.getId());
    }
  }

  private getId(): number | 'current' {
    const id = this.route.snapshot.paramMap.get('id');
    return id === 'current' ? id : +id;
  }

  private getPlace(id: number | 'current'): void {
    if (id !== 'current') {
      this.placeService.getPlace(id)
        .subscribe(place => this.place = place);
    }
  }

  private getWeather(id: number | 'current'): void {
    if (id !== 'current') {
      this.weatherService.getCurrentWeather(id)
        .subscribe(currentWeather => this.currentWeather = currentWeather[0]);
    }
  }

  private getDefaultWeather(): void {
    navigator.geolocation.getCurrentPosition(position => {
      this.placeService.getPlaceForPosition(position)
        .subscribe(placeSuggestion => {
          const id = +placeSuggestion.Key;
          this.place = {
            id: id,
            name: placeSuggestion.LocalizedName
          };
          this.getWeather(id);
        });
    });
  }

}
