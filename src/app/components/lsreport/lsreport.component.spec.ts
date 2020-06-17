import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LSReportComponent } from './lsreport.component';

describe('LSReportComponent', () => {
  let component: LSReportComponent;
  let fixture: ComponentFixture<LSReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LSReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LSReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
