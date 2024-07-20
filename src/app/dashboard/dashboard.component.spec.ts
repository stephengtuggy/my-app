import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import {Component, Type} from '@angular/core';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';

import { DashboardComponent } from './dashboard.component';
import { Animal } from '../animal.model';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;
  let httpMock: HttpTestingController;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
    declarations: [
        DashboardComponent,
        MockAnimalSearchComponent
    ],
    imports: [],
    providers: [provideHttpClient(withInterceptorsFromDi()), provideHttpClientTesting()]
})
    .compileComponents();

    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    httpMock = fixture.debugElement.injector.get<HttpTestingController>(HttpTestingController as Type<HttpTestingController>);
    fixture.detectChanges();
  }));

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();

    const dummyAnimals: Animal[] = [];
    const req = httpMock.expectOne('api/animals');
    req.flush(dummyAnimals);
  });
});

@Component({
  selector: 'app-animal-search',
  template: ''
})
class MockAnimalSearchComponent {}
