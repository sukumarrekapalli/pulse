import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GravityilabsurveyComponent } from './gravityilabsurvey.component';

describe('GravityilabsurveyComponent', () => {
  let component: GravityilabsurveyComponent;
  let fixture: ComponentFixture<GravityilabsurveyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GravityilabsurveyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GravityilabsurveyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
