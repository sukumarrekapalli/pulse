import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LeadershippulseComponent } from './leadershippulse.component';

describe('LeadershippulseComponent', () => {
  let component: LeadershippulseComponent;
  let fixture: ComponentFixture<LeadershippulseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LeadershippulseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LeadershippulseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
