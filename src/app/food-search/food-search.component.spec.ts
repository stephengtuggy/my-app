import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';
import {beforeEach, describe, expect, it} from "vitest";

import {FoodSearchComponent} from './food-search.component';
import {provideHttpClient} from "@angular/common/http";
import {provideHttpClientTesting} from "@angular/common/http/testing";

describe('FoodSearchComponent', () => {
    let component: FoodSearchComponent;
    let fixture: ComponentFixture<FoodSearchComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [FoodSearchComponent],
            providers: [
                provideHttpClient(),
                provideHttpClientTesting(),
            ]
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(FoodSearchComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should be created', () => {
        expect(component).toBeTruthy();
    });
});
