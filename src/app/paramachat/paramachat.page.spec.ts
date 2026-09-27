import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ParamachatPage } from './paramachat.page';

describe('ParamachatPage', () => {
  let component: ParamachatPage;
  let fixture: ComponentFixture<ParamachatPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ParamachatPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ParamachatPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
