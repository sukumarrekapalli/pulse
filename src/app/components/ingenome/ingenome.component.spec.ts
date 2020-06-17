import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IngenomeComponent } from './ingenome.component';

describe('IngenomeComponent', () => {
  let component: IngenomeComponent;
  let fixture: ComponentFixture<IngenomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IngenomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IngenomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
