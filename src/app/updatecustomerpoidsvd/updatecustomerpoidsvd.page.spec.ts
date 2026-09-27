import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdatecustomerpoidsvdPage } from './updatecustomerpoidsvd.page';

describe('UpdatecustomerpoidsvdPage', () => {
  let component: UpdatecustomerpoidsvdPage;
  let fixture: ComponentFixture<UpdatecustomerpoidsvdPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdatecustomerpoidsvdPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdatecustomerpoidsvdPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
