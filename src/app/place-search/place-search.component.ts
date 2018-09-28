import { Component, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';

import {
  debounceTime, distinctUntilChanged, switchMap
} from 'rxjs/operators';

import { Place } from '../place';
import { PlaceSuggestion } from '../place-suggestion';
import { PlaceService } from '../place.service';

@Component({
  selector: 'app-place-search',
  templateUrl: './place-search.component.html',
  styleUrls: ['./place-search.component.styl']
})
export class PlaceSearchComponent implements OnInit {
  suggestions$: Observable<PlaceSuggestion[]>;
  private searchTerms = new Subject<string>();

  constructor(private placeService: PlaceService) { }

  search(term: string): void {
    this.searchTerms.next(term);
  }

  add(placeSuggestion: PlaceSuggestion): void {
    const place = {
      id: +placeSuggestion.Key,
      name: placeSuggestion.LocalizedName
    };
    this.placeService.addPlace(place);
  }

  ngOnInit(): void {
    this.suggestions$ = this.searchTerms.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap((term: string) => this.placeService.searchPlaces(term)),
    );
  }

}
