import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ScanachatsPage } from './scanachats.page';

describe('ScanachatsPage', () => {
  let component: ScanachatsPage;
  let fixture: ComponentFixture<ScanachatsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ScanachatsPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ScanachatsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
