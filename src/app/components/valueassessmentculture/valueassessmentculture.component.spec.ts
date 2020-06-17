import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ValueassessmentcultureComponent } from './valueassessmentculture.component';

describe('ValueassessmentcultureComponent', () => {
  let component: ValueassessmentcultureComponent;
  let fixture: ComponentFixture<ValueassessmentcultureComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ValueassessmentcultureComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ValueassessmentcultureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
