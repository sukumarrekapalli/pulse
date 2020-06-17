import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ValueassessmentComponent } from './valueassessment.component';

describe('ValueassessmentComponent', () => {
  let component: ValueassessmentComponent;
  let fixture: ComponentFixture<ValueassessmentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ValueassessmentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ValueassessmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
