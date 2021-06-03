import { TestBed, inject, waitForAsync } from '@angular/core/testing';
import { Type } from '@angular/core';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { Animal } from './animal.model';
import { AnimalService } from './animal.service';

describe('AnimalService', () => {
  let httpMock: HttpTestingController;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ],
    })
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
