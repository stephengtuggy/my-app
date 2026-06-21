import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
    selector: 'app-food-search',
    templateUrl: './food-search.component.html',
    styleUrls: ['./food-search.component.css'],
    changeDetection: ChangeDetectionStrategy.Eager,
    standalone: false
})
export class FoodSearchComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
