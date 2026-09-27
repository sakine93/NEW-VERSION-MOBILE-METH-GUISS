import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateitemPage } from './updateitem.page';

describe('UpdateitemPage', () => {
  let component: UpdateitemPage;
  let fixture: ComponentFixture<UpdateitemPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateitemPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateitemPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
