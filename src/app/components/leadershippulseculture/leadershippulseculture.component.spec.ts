import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LeadershippulsecultureComponent } from './leadershippulseculture.component';

describe('LeadershippulsecultureComponent', () => {
  let component: LeadershippulsecultureComponent;
  let fixture: ComponentFixture<LeadershippulsecultureComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LeadershippulsecultureComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LeadershippulsecultureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
