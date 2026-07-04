import {Injectable} from '@angular/core';
import {InMemoryAnimalDataService} from "./in-memory-animal-data.service";

@Injectable({
    providedIn: 'root',
})
export class InMemoryOverrideAnimalDataService extends InMemoryAnimalDataService {
    // Overrides id generator and delivers next available `id`, starting with 1001.
    genId<T extends {id: any}>(collection: T[], collectionName: string): any {
        return 1 + collection.reduce((prev, curr) => Math.max(prev, curr.id || 0), 1000);
    }
}
