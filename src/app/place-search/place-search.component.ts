import { Component, OnInit } from '@angular/core';
import { Observable, of, Subject } from 'rxjs';
import {
  debounceTime, distinctUntilChanged, switchMap
} from 'rxjs/operators';
import { Router } from '@angular/router';

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

  constructor(private placeService: PlaceService, private router: Router) { }

  private subscribe(): void {
    this.suggestions$ = this.searchTerms.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap((term: string) => this.placeService.searchPlaces(term)),
    );
  }

  private clear(): void {
    this.suggestions$ = of([]);
    this.subscribe();
  }

  ngOnInit(): void {
    this.subscribe();
  }

  search(term: string): void {
    this.searchTerms.next(term);
  }

  add(placeSuggestion: PlaceSuggestion): void {
    const id = +placeSuggestion.Key;
    const place = {
      id: id,
      name: placeSuggestion.LocalizedName
    };
    this.placeService.addPlace(place);
    this.clear();
    this.router.navigate(['places', id]);
  }

  displayFn(value): string {
    return  value ? value.LocalizedName : '';
  }

}
