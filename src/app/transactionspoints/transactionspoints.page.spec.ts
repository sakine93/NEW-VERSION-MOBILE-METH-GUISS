import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TransactionspointsPage } from './transactionspoints.page';

describe('TransactionspointsPage', () => {
  let component: TransactionspointsPage;
  let fixture: ComponentFixture<TransactionspointsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TransactionspointsPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TransactionspointsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
