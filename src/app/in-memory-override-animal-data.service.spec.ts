import {TestBed} from '@angular/core/testing';

import {InMemoryOverrideAnimalDataService} from './in-memory-override-animal-data.service';
import {beforeEach, describe, expect, it} from "vitest";

describe('InMemoryOverrideAnimalDataService', () => {
    let service: InMemoryOverrideAnimalDataService;

    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(InMemoryOverrideAnimalDataService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
