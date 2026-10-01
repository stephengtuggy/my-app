import {ComponentFixture, TestBed} from '@angular/core/testing';
import {Type} from '@angular/core';
import {Location} from '@angular/common';
import {MockPlatformLocation} from '@angular/common/testing';
import {HttpTestingController, provideHttpClientTesting} from '@angular/common/http/testing';
import {ActivatedRoute, Params} from '@angular/router';
import {afterEach, beforeEach, describe, expect, it} from "vitest";

import {AnimalDetailComponent} from './animal-detail.component';
import {MockActivatedRoute} from './mock-activated.route';
import {provideHttpClient} from '@angular/common/http';


describe('AnimalDetailComponent', () => {
    let component: AnimalDetailComponent;
    let fixture: ComponentFixture<AnimalDetailComponent>;
    let httpMock: HttpTestingController;
    let routeMock: MockActivatedRoute;
    let initialMockParams: Params;
    let locationMock: MockPlatformLocation;

    beforeEach(async () => {
        initialMockParams = {id: 11};
        routeMock = new MockActivatedRoute(initialMockParams);
        locationMock = new MockPlatformLocation;
        await TestBed.configureTestingModule({
            imports: [AnimalDetailComponent],
            providers: [
                {
                    provide: ActivatedRoute, useValue: routeMock,
                },
                {
                    provide: Location, useValue: locationMock,
                },
                provideHttpClient(),
                provideHttpClientTesting()
            ]
        }).compileComponents();

        httpMock = TestBed.inject<HttpTestingController>(HttpTestingController as Type<HttpTestingController>);
        fixture = TestBed.createComponent(AnimalDetailComponent);
        component = fixture.componentInstance;
        expect(component).toBeDefined();
    });

    afterEach(() => {
        httpMock.verify();
    });

    it('should be created', () => {
        expect(component).toBeTruthy();
    });
});
