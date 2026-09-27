import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TransfertmenuPage } from './transfertmenu.page';

describe('TransfertmenuPage', () => {
  let component: TransfertmenuPage;
  let fixture: ComponentFixture<TransfertmenuPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TransfertmenuPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TransfertmenuPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
