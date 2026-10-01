import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';
import {afterEach, beforeEach, describe, expect, it} from "vitest";

import {FoodSearchComponent} from './food-search.component';
import {provideHttpClient} from "@angular/common/http";
import {HttpTestingController, provideHttpClientTesting} from "@angular/common/http/testing";
import {DebugElement, Type} from "@angular/core";
import {By} from "@angular/platform-browser";

describe('FoodSearchComponent', () => {
    let component: FoodSearchComponent;
    let fixture: ComponentFixture<FoodSearchComponent>;
    let httpMock: HttpTestingController;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [FoodSearchComponent],
            providers: [
                provideHttpClient(),
                provideHttpClientTesting(),
            ]
        }).compileComponents();

        httpMock = TestBed.inject<HttpTestingController>(HttpTestingController as Type<HttpTestingController>);
        fixture = TestBed.createComponent(FoodSearchComponent);
        component = fixture.componentInstance;
    });

    afterEach(() => {
        httpMock.verify();
    });

    it('should be created', () => {
        expect(component).toBeTruthy();
    });

    it('should display caption "Food Search" in h4 tag', async () => {
        fixture.detectChanges();
        const h4De: DebugElement = fixture.debugElement.query(By.css('h4'));
        const h4El: HTMLElement = h4De.nativeElement;
        expect(h4El.textContent).toEqual("Food Search");
    });
});
