import { Component, OnInit } from '@angular/core';

import { Observable, Subject } from 'rxjs';

import {
  debounceTime, distinctUntilChanged, switchMap
} from 'rxjs/operators';

import { Animal } from '../animal.model';
import { AnimalService } from '../animal.service';

@Component({
    selector: 'app-animal-search',
    templateUrl: './animal-search.component.html',
    styleUrls: ['./animal-search.component.css'],
    standalone: false
})
export class AnimalSearchComponent implements OnInit {
  animals$: Observable<Animal[]>;
  private searchTerms = new Subject<string>();

  constructor(private animalService: AnimalService) { }

  search(term: string): void {
    this.searchTerms.next(term);
  }

  ngOnInit(): void {
    this.animals$ = this.searchTerms.pipe(
      // wait 300ms after each keystroke before considering the term
      debounceTime(300),

      // ignore new term if same as previous term
      distinctUntilChanged(),

      // switch to new search observable each time the term changes
      switchMap((term: string) => this.animalService.searchAnimals(term)),
    );
  }

}
