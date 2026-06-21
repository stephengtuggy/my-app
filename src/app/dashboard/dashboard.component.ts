import { Component, OnInit, ChangeDetectionStrategy, inject } from '@angular/core';
import { Animal } from '../animal.model';
import { AnimalService } from '../animal.service';
import { RouterLink } from '@angular/router';
import { AnimalSearchComponent } from '../animal-search/animal-search.component';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.css'],
    changeDetection: ChangeDetectionStrategy.Eager,
    imports: [RouterLink, AnimalSearchComponent]
})
export class DashboardComponent implements OnInit {
  private animalService = inject(AnimalService);

  animals: Animal[] = [];

  constructor() { }

  ngOnInit() {
    this.getAnimals();
  }

  getAnimals(): void {
    this.animalService.getAnimals()
      .subscribe(animals => this.animals = animals.slice(0, 4));
  }
}
