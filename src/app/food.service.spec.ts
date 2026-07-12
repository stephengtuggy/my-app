import {inject, TestBed} from '@angular/core/testing';
import {afterEach, beforeEach, describe, expect, it} from "vitest";

import {FoodService} from './food.service';
import {HttpTestingController, provideHttpClientTesting} from "@angular/common/http/testing";
import {Type} from "@angular/core";
import {provideHttpClient, withInterceptorsFromDi, withXhr} from "@angular/common/http";

describe('FoodService', () => {
    let httpMock: HttpTestingController;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [],
            providers: [provideHttpClient(withXhr(), withInterceptorsFromDi()), provideHttpClientTesting(), FoodService]
        });
        httpMock = TestBed.inject<HttpTestingController>(HttpTestingController as Type<HttpTestingController>);
    });

    afterEach(() => {
        httpMock.verify();
    })

    it('should be created', inject([FoodService], (service: FoodService) => {
        expect(service).toBeTruthy();
    }));
});
