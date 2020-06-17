import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CompsentimentcultureComponent } from './compsentimentculture.component';

describe('CompsentimentcultureComponent', () => {
  let component: CompsentimentcultureComponent;
  let fixture: ComponentFixture<CompsentimentcultureComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompsentimentcultureComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompsentimentcultureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
