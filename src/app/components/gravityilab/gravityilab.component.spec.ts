import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GravityilabComponent } from './gravityilab.component';

describe('GravityilabComponent', () => {
  let component: GravityilabComponent;
  let fixture: ComponentFixture<GravityilabComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GravityilabComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GravityilabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
