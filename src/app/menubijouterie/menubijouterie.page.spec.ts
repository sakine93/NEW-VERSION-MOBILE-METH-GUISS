import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MenubijouteriePage } from './menubijouterie.page';

describe('MenubijouteriePage', () => {
  let component: MenubijouteriePage;
  let fixture: ComponentFixture<MenubijouteriePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MenubijouteriePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MenubijouteriePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
