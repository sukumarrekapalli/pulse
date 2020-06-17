import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdaptqcultureComponent } from './adaptqculture.component';

describe('AdaptqcultureComponent', () => {
  let component: AdaptqcultureComponent;
  let fixture: ComponentFixture<AdaptqcultureComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdaptqcultureComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdaptqcultureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
