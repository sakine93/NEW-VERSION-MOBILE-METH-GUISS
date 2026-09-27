import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListetransfertPage } from './listetransfert.page';

describe('ListetransfertPage', () => {
  let component: ListetransfertPage;
  let fixture: ComponentFixture<ListetransfertPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListetransfertPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListetransfertPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
