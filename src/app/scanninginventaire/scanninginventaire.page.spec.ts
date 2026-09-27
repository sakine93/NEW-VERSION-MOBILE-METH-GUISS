import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ScanninginventairePage } from './scanninginventaire.page';

describe('ScanninginventairePage', () => {
  let component: ScanninginventairePage;
  let fixture: ComponentFixture<ScanninginventairePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ScanninginventairePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ScanninginventairePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
