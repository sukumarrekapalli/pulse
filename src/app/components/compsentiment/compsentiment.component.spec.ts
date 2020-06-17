import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CompsentimentComponent } from './compsentiment.component';

describe('CompsentimentComponent', () => {
  let component: CompsentimentComponent;
  let fixture: ComponentFixture<CompsentimentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompsentimentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompsentimentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
