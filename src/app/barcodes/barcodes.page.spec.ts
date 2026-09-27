import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BarcodesPage } from './barcodes.page';

describe('BarcodesPage', () => {
  let component: BarcodesPage;
  let fixture: ComponentFixture<BarcodesPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BarcodesPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BarcodesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
