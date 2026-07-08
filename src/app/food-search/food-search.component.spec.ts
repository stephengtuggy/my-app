import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';
import {beforeEach, describe, expect, it} from "vitest";

import {FoodSearchComponent} from './food-search.component';

describe('FoodSearchComponent', () => {
    let component: FoodSearchComponent;
    let fixture: ComponentFixture<FoodSearchComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            imports: [FoodSearchComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(FoodSearchComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should be created', () => {
        expect(component).toBeTruthy();
    });
});
