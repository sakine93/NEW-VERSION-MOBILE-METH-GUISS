import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ParamgrammagePage } from './paramgrammage.page';

describe('ParamgrammagePage', () => {
  let component: ParamgrammagePage;
  let fixture: ComponentFixture<ParamgrammagePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ParamgrammagePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ParamgrammagePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
