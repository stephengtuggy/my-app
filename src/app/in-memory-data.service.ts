import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';

import { Animal } from './animal.model';
import { Food } from './food.model';
import { AnimalFood } from './animal-food.model';

@Injectable({
  providedIn: 'root',
})
export class InMemoryDataService implements InMemoryDbService {

  constructor() { }

  createDb() {
    const animals: Animal[] = [
      {id: 11, name: 'Elephant'},
      {id: 12, name: 'Zebra'},
      {id: 13, name: 'Monkey'},
      {id: 14, name: 'Human'}
    ];
    const foods: Food[] = [
      {id: 21, name: 'Hay'},
      {id: 22, name: 'Apples'},
      {id: 23, name: 'Bananas'},
      {id: 24, name: 'Bread'}
    ];
    const animalsFoods: AnimalFood[] = [
      {id: 31, animalID: 11, foodID: 21},
      {id: 32, animalID: 11, foodID: 24},
      {id: 33, animalID: 12, foodID: 21},
      {id: 34, animalID: 12, foodID: 22},
      {id: 35, animalID: 13, foodID: 23},
      {id: 36, animalID: 14, foodID: 22},
      {id: 37, animalID: 14, foodID: 23},
      {id: 38, animalID: 14, foodID: 24}
    ];
    return { animals, foods, animalsFoods };
  }

  genId(animals: Animal[]): number {
    return animals.length > 0 ? Math.max(...animals.map(animal => animal.id)) + 1 : 11;
  }

}
