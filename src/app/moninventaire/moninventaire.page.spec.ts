import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MoninventairePage } from './moninventaire.page';

describe('MoninventairePage', () => {
  let component: MoninventairePage;
  let fixture: ComponentFixture<MoninventairePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MoninventairePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MoninventairePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
