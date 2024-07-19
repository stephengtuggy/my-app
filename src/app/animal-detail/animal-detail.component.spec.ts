import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';
import {Type} from '@angular/core';
import {Location} from '@angular/common';
import {MockPlatformLocation} from '@angular/common/testing';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {ActivatedRoute, Params} from '@angular/router';

import {AnimalDetailComponent} from './animal-detail.component';
import {Animal} from '../animal.model';
import {MockActivatedRoute} from './mock-activated.route';


describe('AnimalDetailComponent', () => {
  let component: AnimalDetailComponent;
  let fixture: ComponentFixture<AnimalDetailComponent>;
  let httpMock: HttpTestingController;
  let routeMock: MockActivatedRoute;
  let initialMockParams: Params;
  let locationMock: MockPlatformLocation;

  beforeEach(waitForAsync(() => {
    initialMockParams = {id: 11};
    routeMock = new MockActivatedRoute(initialMockParams);
    locationMock = new MockPlatformLocation;
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ],
      declarations: [ AnimalDetailComponent ],
      providers: [
        {
          provide: ActivatedRoute, useValue: routeMock,
        },
        {
          provide: Location, useValue: locationMock,
        }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnimalDetailComponent);
    component = fixture.componentInstance;
    httpMock = TestBed.inject<HttpTestingController>(HttpTestingController as Type<HttpTestingController>);
    fixture.detectChanges();
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    fixture.detectChanges();

    expect(component).toBeTruthy();

    const dummyAnimal: Animal = { id: 11, name: 'dummyAnimal' };
    const req = httpMock.expectOne('api/animals/11');
    req.flush(dummyAnimal);
  });
});
