import {inject, TestBed, waitForAsync} from '@angular/core/testing';
import {Type} from '@angular/core';
import {HttpTestingController, provideHttpClientTesting} from '@angular/common/http/testing';
import {afterEach, beforeEach, describe, expect, it} from "vitest";
import {AnimalService} from './animal.service';
import {provideHttpClient, withInterceptorsFromDi, withXhr} from '@angular/common/http';

describe('AnimalService', () => {
    let httpMock: HttpTestingController;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            imports: [],
            providers: [provideHttpClient(withXhr(), withInterceptorsFromDi()), provideHttpClientTesting(), AnimalService]
        });
    }));

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [AnimalService]
        });
        httpMock = TestBed.inject<HttpTestingController>(HttpTestingController as Type<HttpTestingController>);
    });

    afterEach(() => {
        httpMock.verify();
    });

    it('should be created', inject([AnimalService], (service: AnimalService) => {
        expect(service).toBeTruthy();
    }));
});
