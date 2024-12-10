import { Component, OnInit } from '@angular/core';

import { Animal } from '../animal.model';
import { AnimalService } from '../animal.service';

@Component({
    selector: 'app-animal-list',
    templateUrl: './animal-list.component.html',
    styleUrls: ['./animal-list.component.css'],
    standalone: false
})
export class AnimalListComponent implements OnInit {
  animals: Animal[];

  constructor(private animalService: AnimalService) { }

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
