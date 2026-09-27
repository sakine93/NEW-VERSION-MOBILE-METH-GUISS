import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TransfertPage } from './transfert.page';

describe('TransfertPage', () => {
  let component: TransfertPage;
  let fixture: ComponentFixture<TransfertPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TransfertPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TransfertPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
