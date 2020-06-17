import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AmainComponent } from './amain.component';

describe('AmainComponent', () => {
  let component: AmainComponent;
  let fixture: ComponentFixture<AmainComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AmainComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AmainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
