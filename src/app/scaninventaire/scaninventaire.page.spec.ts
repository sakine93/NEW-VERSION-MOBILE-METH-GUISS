import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ScaninventairePage } from './scaninventaire.page';

describe('ScaninventairePage', () => {
  let component: ScaninventairePage;
  let fixture: ComponentFixture<ScaninventairePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ScaninventairePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ScaninventairePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
