import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ValueassessmentempComponent } from './valueassessmentemp.component';

describe('ValueassessmentempComponent', () => {
  let component: ValueassessmentempComponent;
  let fixture: ComponentFixture<ValueassessmentempComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ValueassessmentempComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ValueassessmentempComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
