import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { Type } from '@angular/core';
import { Location } from '@angular/common';
import { MockPlatformLocation } from '@angular/common/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ActivatedRoute, ActivatedRouteSnapshot, Params, ParamMap, convertToParamMap } from '@angular/router';
import { of, BehaviorSubject } from 'rxjs';

import { AnimalDetailComponent } from './animal-detail.component';
import { Animal } from '../animal.model';


export class MockActivatedRouteSnapshot implements ActivatedRouteSnapshot {
  private innerTestParams?: Params;

  constructor(params?: Params) {
    if (params) {
      this.testParams = params;
    } else {
      this.testParams = null;
    }
  }

  private get testParams() {
    return this.innerTestParams;
  }

  private set testParams(params: Params) {
    this.innerTestParams = params;
  }

  get paramMap() {
    return convertToParamMap(this.testParams);
  }

  get queryParamMap() {
    return this.paramMap;
  }

  get url() {
    return null;
  }

  get fragment() {
    return null;
  }

  get data() {
    return null;
  }

  get outlet() {
    return null;
  }

  get params() {
    return this.innerTestParams;
  }

  get queryParams() {
    return this.innerTestParams;
  }

  get component() {
    return null;
  }

  get routeConfig() {
    return null;
  }

  get root() {
    return null;
  }

  get parent() {
    return null;
  }

  get firstChild() {
    return null;
  }

  get children() {
    return null;
  }

  get pathFromRoot() {
    return null;
  }
}


export class MockActivatedRoute implements ActivatedRoute {
  private innerTestParams?: Params;
  private subject?: BehaviorSubject<Params> = new BehaviorSubject(this.testParams);
  private paramMapSubject?: BehaviorSubject<ParamMap> = new BehaviorSubject(convertToParamMap(this.testParams));

  constructor(params?: Params) {
    if (params) {
      this.testParams = params;
    } else {
      this.testParams = null;
    }
  }

  private get testParams() {
    return this.innerTestParams;
  }

  private set testParams(params: Params) {
    this.innerTestParams = params;
    this.subject.next(params);
    this.paramMapSubject.next(convertToParamMap(params));
  }

  get snapshot() {
    return new MockActivatedRouteSnapshot(this.testParams);
  }

  get params() {
    return this.subject.asObservable();
  }

  get queryParams() {
    return this.params;
  }

  get paramMap() {
    return this.paramMapSubject.asObservable();
  }

  get queryParamMap() {
    return this.paramMap;
  }

  get url() {
    return null;
  }

  get fragment() {
    return null;
  }

  get data() {
    return null;
  }

  get outlet() {
    return null;
  }

  get component() {
    return null;
  }

  get routeConfig() {
    return null;
  }

  get root() {
    return null;
  }

  get parent() {
    return null;
  }

  get firstChild() {
    return null;
  }

  get children() {
    return null;
  }

  get pathFromRoot() {
    return null;
  }
}


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
