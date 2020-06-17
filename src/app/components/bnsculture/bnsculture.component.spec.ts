import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BnscultureComponent } from './bnsculture.component';

describe('BnscultureComponent', () => {
  let component: BnscultureComponent;
  let fixture: ComponentFixture<BnscultureComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BnscultureComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BnscultureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
