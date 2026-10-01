import {ComponentFixture, TestBed} from '@angular/core/testing';
import {Type} from '@angular/core';
import {HttpTestingController, provideHttpClientTesting} from '@angular/common/http/testing';

import {AnimalListComponent} from './animal-list.component';
import {provideHttpClient} from '@angular/common/http';
import {afterEach, beforeEach, describe, expect, it} from "vitest";

describe('AnimalListComponent', () => {
    let component: AnimalListComponent;
    let fixture: ComponentFixture<AnimalListComponent>;
    let httpMock: HttpTestingController;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [AnimalListComponent],
            providers: [provideHttpClient(), provideHttpClientTesting()]
        }).compileComponents();

        httpMock = TestBed.inject<HttpTestingController>(HttpTestingController as Type<HttpTestingController>);
        fixture = TestBed.createComponent(AnimalListComponent);
        component = fixture.componentInstance;
    });

    afterEach(() => {
        httpMock.verify();
    });

    it('should be created', () => {
        expect(component).toBeTruthy();
    });
});
