import {ComponentFixture, TestBed} from '@angular/core/testing';
import {afterEach, beforeEach, describe, expect, it} from "vitest";

import {FoodDetailComponent} from './food-detail.component';
import {provideHttpClient} from "@angular/common/http";
import {HttpTestingController, provideHttpClientTesting} from "@angular/common/http/testing";
import {DebugElement, Type} from "@angular/core";
import {By} from "@angular/platform-browser";
import {MockActivatedRoute} from "../animal-detail/mock-activated.route";
import {ActivatedRoute, Params} from "@angular/router";
import {MockPlatformLocation} from "@angular/common/testing";
import {Location} from "@angular/common";

describe('FoodDetailComponent', () => {
    let component: FoodDetailComponent;
    let fixture: ComponentFixture<FoodDetailComponent>;
    let httpMock: HttpTestingController;
    let routeMock: MockActivatedRoute;
    let initialMockParams: Params;
    let locationMock: MockPlatformLocation;

    beforeEach(async () => {
        initialMockParams = {id: 21};
        routeMock = new MockActivatedRoute(initialMockParams);
        locationMock = new MockPlatformLocation;

        await TestBed.configureTestingModule({
            imports: [FoodDetailComponent],
            providers: [
                {
                    provide: ActivatedRoute, useValue: routeMock,
                },
                {
                    provide: Location, useValue: locationMock,
                },
                provideHttpClient(),
                provideHttpClientTesting(),
            ]
        }).compileComponents();

        httpMock = TestBed.inject<HttpTestingController>(HttpTestingController as Type<HttpTestingController>);
        fixture = TestBed.createComponent(FoodDetailComponent);
        component = fixture.componentInstance;
        expect(component).toBeDefined();
    });

    afterEach(() => {
        httpMock.verify();
    });

    it('should be created', () => {
        expect(component).toBeTruthy();
    });

    it('should have an h2 tag containing " Details"', async () => {
        await fixture.whenStable();
        httpMock.expectOne('api/foods/0');    // FIXME: Should be nonzero, shouldn't it?
        const h2De: DebugElement = fixture.debugElement.query(By.css('h2'));
        const h2El: HTMLElement = h2De.nativeElement;
        expect(h2El.textContent).toContain(' Details');
    });
});
