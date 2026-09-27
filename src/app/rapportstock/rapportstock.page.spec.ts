import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RapportstockPage } from './rapportstock.page';

describe('RapportstockPage', () => {
  let component: RapportstockPage;
  let fixture: ComponentFixture<RapportstockPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RapportstockPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RapportstockPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
