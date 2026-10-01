import {ComponentFixture, TestBed} from '@angular/core/testing';
import {Type} from '@angular/core';
import {HttpTestingController, provideHttpClientTesting} from '@angular/common/http/testing';
import {afterEach, beforeEach, describe, expect, it} from "vitest";

import {AnimalSearchComponent} from './animal-search.component';
import {provideHttpClient} from '@angular/common/http';
import {provideRouter} from "@angular/router";

describe('AnimalSearchComponent', () => {
    let component: AnimalSearchComponent;
    let fixture: ComponentFixture<AnimalSearchComponent>;
    let httpMock: HttpTestingController;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [AnimalSearchComponent],
            providers: [
                provideHttpClient(),
                provideHttpClientTesting(),
                provideRouter([]),
                AnimalSearchComponent,
            ]
        }).compileComponents();

        httpMock = TestBed.inject<HttpTestingController>(HttpTestingController as Type<HttpTestingController>);
        fixture = TestBed.createComponent(AnimalSearchComponent);
        component = fixture.componentInstance;
    });

    afterEach(() => {
        httpMock.verify();
    });

    it('should be created', () => {
        expect(component).toBeTruthy();
    });
});
