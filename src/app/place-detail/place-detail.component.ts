import {Component, Input, OnInit} from '@angular/core';
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
  @Input() place: Place;
  @Input() currentWeather: CurrentWeather;

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
    this.getPlace();
    this.getCurrentWeather();
  }

  private getId(): number {
    return +this.route.snapshot.paramMap.get('id');
  }

  private getPlace(): void {
    this.placeService.getPlace(this.getId())
      .subscribe(place => this.place = place);
  }

  private getCurrentWeather(): void {
    this.weatherService.getCurrentWeather(this.getId())
      .subscribe(currentWeather => this.currentWeather = currentWeather[0]);
  }

}
