import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { Type } from '@angular/core';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';

import { AnimalListComponent } from './animal-list.component';
import { Animal } from '../animal.model';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

describe('AnimalListComponent', () => {
  let component: AnimalListComponent;
  let fixture: ComponentFixture<AnimalListComponent>;
  let httpMock: HttpTestingController;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
    declarations: [AnimalListComponent],
    imports: [],
    providers: [provideHttpClient(withInterceptorsFromDi()), provideHttpClientTesting()]
})
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnimalListComponent);
    component = fixture.componentInstance;
    httpMock = TestBed.inject<HttpTestingController>(HttpTestingController as Type<HttpTestingController>);
    fixture.detectChanges();
  });

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
