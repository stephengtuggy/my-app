import {TestBed} from '@angular/core/testing';
import {beforeEach, describe, it} from "vitest";
import {FoodService} from './food.service';
import {doesNotThrow} from "node:assert";

describe('FoodService', () => {
    let service: FoodService;

    beforeEach(() => {
        service = TestBed.inject(FoodService);
    });

    it('does not throw on valid food ID', () => {
        doesNotThrow(() => {
            service.getFoodNo404(21);
        });
    });

    it('does not throw on invalid food ID', () => {
        doesNotThrow(() => {
            service.getFoodNo404(2000000000);
        });
    });
});
