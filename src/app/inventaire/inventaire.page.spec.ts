import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InventairePage } from './inventaire.page';

describe('InventairePage', () => {
  let component: InventairePage;
  let fixture: ComponentFixture<InventairePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InventairePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InventairePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
