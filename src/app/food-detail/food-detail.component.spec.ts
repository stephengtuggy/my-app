import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { FoodDetailComponent } from './food-detail.component';

describe('FoodDetailComponent', () => {
  let component: FoodDetailComponent;
  let fixture: ComponentFixture<FoodDetailComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ FoodDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FoodDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
