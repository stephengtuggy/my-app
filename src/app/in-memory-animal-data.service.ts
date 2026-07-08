import {Injectable} from '@angular/core';
import {InMemoryDbService, RequestInfo} from 'angular-in-memory-web-api';

import {Animal} from './animal.model';
import {Food} from './food.model';
import {AnimalFood} from './animal-food.model';
import {delay, Observable, of} from "rxjs";

interface AnimalFoodResponse {
    animals: Animal[];
    foods: Food[];
    animalsFoods: AnimalFood[];
}

@Injectable({
    providedIn: 'root',
})
export class InMemoryAnimalDataService implements InMemoryDbService {

    constructor() {
    }

    createDb(reqInfo: RequestInfo | undefined): Observable<AnimalFoodResponse> | Promise<AnimalFoodResponse> | AnimalFoodResponse {
        const animals: Animal[] = [
            {id: 11, animalName: 'Elephant'},
            {id: 12, animalName: 'Zebra'},
            {id: 13, animalName: 'Monkey'},
            {id: 14, animalName: 'Human'}
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

        // default returnType
        let returnType = 'object';
        // let returnType  = 'observable';
        // let returnType  = 'promise';

        // demonstrate POST commands/resetDb
        // this example clears the collections if the request body tells it to do so
        if (reqInfo) {
            const body = reqInfo.utils.getJsonBody(reqInfo.req) || {};
            if (body.clear === true) {
                animals.length = 0;
                foods.length = 0;
                animalsFoods.length = 0;
            }

            // 'returnType` can be 'object' | 'observable' | 'promise'
            returnType = body.returnType || 'object';
        }
        const db = {animals, foods, animalsFoods};

        switch (returnType) {
            case 'observable':
                return of(db).pipe(delay(10));
            case 'promise':
                return new Promise((resolve) => setTimeout(() => resolve(db), 10));
            default:
                return db;
        }
    }

    // genId(collection: Animal[], collectionName: string): number {
    //     return collection.length > 0 ? Math.max(...collection.map(animal => animal.id)) + 1 : 11;
    // }

}
