import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdaptqComponent } from './adaptq.component';

describe('AdaptqComponent', () => {
  let component: AdaptqComponent;
  let fixture: ComponentFixture<AdaptqComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdaptqComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdaptqComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
