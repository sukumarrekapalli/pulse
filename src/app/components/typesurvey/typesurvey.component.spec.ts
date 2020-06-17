import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TypesurveyComponent } from './typesurvey.component';

describe('TypesurveyComponent', () => {
  let component: TypesurveyComponent;
  let fixture: ComponentFixture<TypesurveyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TypesurveyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TypesurveyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
