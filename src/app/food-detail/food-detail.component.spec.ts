import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';
import {beforeEach, describe, expect, it} from "vitest";

import {FoodDetailComponent} from './food-detail.component';

describe('FoodDetailComponent', () => {
    let component: FoodDetailComponent;
    let fixture: ComponentFixture<FoodDetailComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            imports: [FoodDetailComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(FoodDetailComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should be created', () => {
        expect(component).toBeTruthy();
    });
});
