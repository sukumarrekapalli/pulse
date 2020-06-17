import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PeoplespeakComponent } from './peoplespeak.component';

describe('PeoplespeakComponent', () => {
  let component: PeoplespeakComponent;
  let fixture: ComponentFixture<PeoplespeakComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PeoplespeakComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PeoplespeakComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
