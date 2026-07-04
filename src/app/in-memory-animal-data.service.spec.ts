import {inject, TestBed} from '@angular/core/testing';

import {InMemoryAnimalDataService} from './in-memory-animal-data.service';
import {beforeEach, describe, expect, it } from "vitest";

describe('InMemoryAnimalDataService', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [InMemoryAnimalDataService]
        });
    });

    it('should be created', inject([InMemoryAnimalDataService], (service: InMemoryAnimalDataService) => {
        expect(service).toBeTruthy();
    }));
});
