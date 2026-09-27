import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateachatPage } from './updateachat.page';

describe('UpdateachatPage', () => {
  let component: UpdateachatPage;
  let fixture: ComponentFixture<UpdateachatPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateachatPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateachatPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
