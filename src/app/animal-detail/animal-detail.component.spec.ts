import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';
import {Type} from '@angular/core';
import {Location} from '@angular/common';
import {MockPlatformLocation} from '@angular/common/testing';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import {ActivatedRoute, Params} from '@angular/router';

import {AnimalDetailComponent} from './animal-detail.component';
import {Animal} from '../animal.model';
import {MockActivatedRoute} from './mock-activated.route';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';


describe('AnimalDetailComponent', () => {
  let component: AnimalDetailComponent;
  let fixture: ComponentFixture<AnimalDetailComponent>;
  let httpMock: HttpTestingController;
  let routeMock: MockActivatedRoute;
  // let initialMockParams: Params;
  let locationMock: MockPlatformLocation;

  beforeEach(waitForAsync(() => {
    // initialMockParams = {id: 11};
    // routeMock = new MockActivatedRoute(initialMockParams);
    routeMock = new MockActivatedRoute(null);
    locationMock = new MockPlatformLocation;
    TestBed.configureTestingModule({
    declarations: [AnimalDetailComponent],
    imports: [],
    providers: [
        {
            provide: ActivatedRoute, useValue: routeMock,
        },
        {
            provide: Location, useValue: locationMock,
        },
        provideHttpClient(withInterceptorsFromDi()),
        provideHttpClientTesting()
    ]
})
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnimalDetailComponent);
    component = fixture.componentInstance;
    httpMock = TestBed.inject<HttpTestingController>(HttpTestingController as Type<HttpTestingController>);
    // fixture.detectChanges();
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be truthy', () => {
    // fixture.detectChanges();

    expect(component).toBeTruthy();

    // const dummyAnimal: Animal = { id: 11, name: 'dummyAnimal' };
    // const req = httpMock.expectOne('api/animals/11');
    // req.flush(dummyAnimal);
  });
});
