import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LmainComponent } from './lmain.component';

describe('LmainComponent', () => {
  let component: LmainComponent;
  let fixture: ComponentFixture<LmainComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LmainComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LmainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
