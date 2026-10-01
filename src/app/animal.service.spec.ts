import {TestBed} from '@angular/core/testing';
import {beforeEach, describe, it} from "vitest";
import {AnimalService} from './animal.service';
import {doesNotThrow} from "node:assert";

describe('AnimalService', () => {
    let service: AnimalService;

    beforeEach(() => {
        service = TestBed.inject(AnimalService);
    });

    it('does not throw on valid animal ID', () => {
        doesNotThrow(() => {
            service.getAnimalNo404(11);
        });
    });

    it('does not throw on invalid animal ID', () => {
        doesNotThrow(() => {
            service.getAnimalNo404(1000000000);
        });
    });
});
