import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PeoplespeakcultureComponent } from './peoplespeakculture.component';

describe('PeoplespeakcultureComponent', () => {
  let component: PeoplespeakcultureComponent;
  let fixture: ComponentFixture<PeoplespeakcultureComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PeoplespeakcultureComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PeoplespeakcultureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
