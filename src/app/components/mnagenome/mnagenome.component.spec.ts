import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MnagenomeComponent } from './mnagenome.component';

describe('MnagenomeComponent', () => {
  let component: MnagenomeComponent;
  let fixture: ComponentFixture<MnagenomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MnagenomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MnagenomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
