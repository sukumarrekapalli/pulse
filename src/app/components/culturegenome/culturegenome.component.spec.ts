import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CulturegenomeComponent } from './culturegenome.component';

describe('CulturegenomeComponent', () => {
  let component: CulturegenomeComponent;
  let fixture: ComponentFixture<CulturegenomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CulturegenomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CulturegenomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
