import { Component, OnInit, ChangeDetectionStrategy, inject } from '@angular/core';

import { Animal } from '../animal.model';
import { AnimalService } from '../animal.service';

@Component({
    selector: 'app-animal-list',
    templateUrl: './animal-list.component.html',
    styleUrls: ['./animal-list.component.css'],
    changeDetection: ChangeDetectionStrategy.Eager,
    standalone: false
})
export class AnimalListComponent implements OnInit {
  private animalService = inject(AnimalService);

  animals: Animal[] = new Array<Animal>();

  constructor() { }

  ngOnInit(): void {
    this.getAnimals();
  }

  getAnimals(): void {
    this.animalService.getAnimals()
        .subscribe(animals => this.animals = animals);
  }

  add(name: string): void {
    name = name.trim();
    if (!name) {
      return;
    }
    this.animalService.addAnimal({ name } as Animal)
      .subscribe(animal => {
        this.animals.push(animal);
      });
  }

  delete(animal: Animal): void {
    this.animals = this.animals.filter(a => a !== animal);
    this.animalService.deleteAnimal(animal).subscribe();
  }
}
