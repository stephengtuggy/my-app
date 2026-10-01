import {ComponentFixture, TestBed} from '@angular/core/testing';
import {afterEach, beforeEach, describe, expect, it} from "vitest";

import {FoodListComponent} from './food-list.component';
import {provideHttpClient} from "@angular/common/http";
import {HttpTestingController, provideHttpClientTesting} from "@angular/common/http/testing";
import {DebugElement, Type} from "@angular/core";
import {By} from "@angular/platform-browser";

describe('FoodListComponent', () => {
    let component: FoodListComponent;
    let fixture: ComponentFixture<FoodListComponent>;
    let httpMock: HttpTestingController;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [FoodListComponent],
            providers: [
                provideHttpClient(),
                provideHttpClientTesting(),
            ]
        }).compileComponents();

        httpMock = TestBed.inject<HttpTestingController>(HttpTestingController as Type<HttpTestingController>);
        fixture = TestBed.createComponent(FoodListComponent);
        component = fixture.componentInstance;
        expect(component).toBeDefined();
    });

    afterEach(() => {
        httpMock.verify();
    });

    it('should be created', () => {
        expect(component).toBeTruthy();
    });

    it('should display page title "Foods" in h2 tag', async () => {
        fixture.detectChanges();
        httpMock.expectOne('api/foods');
        const h2De: DebugElement = fixture.debugElement.query(By.css('h2'));
        const h2El: HTMLElement = h2De.nativeElement;
        expect(h2El.textContent).toEqual("Foods");
    });
});
