import {inject, TestBed, waitForAsync} from '@angular/core/testing';
import {afterEach, beforeEach, describe, expect, it} from "vitest";

import {FoodService} from './food.service';
import {HttpTestingController} from "@angular/common/http/testing";
import {Type} from "@angular/core";

describe('FoodService', () => {
    let httpMock: HttpTestingController;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            imports: [],
            providers: [FoodService]
        });
    }));

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [FoodService]
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
