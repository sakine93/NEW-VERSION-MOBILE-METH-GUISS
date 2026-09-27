import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FaturerecuPage } from './faturerecu.page';

describe('FaturerecuPage', () => {
  let component: FaturerecuPage;
  let fixture: ComponentFixture<FaturerecuPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FaturerecuPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FaturerecuPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
