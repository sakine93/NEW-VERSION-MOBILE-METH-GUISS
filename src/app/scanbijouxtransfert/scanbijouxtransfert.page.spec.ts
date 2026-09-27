import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ScanbijouxtransfertPage } from './scanbijouxtransfert.page';

describe('ScanbijouxtransfertPage', () => {
  let component: ScanbijouxtransfertPage;
  let fixture: ComponentFixture<ScanbijouxtransfertPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ScanbijouxtransfertPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ScanbijouxtransfertPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
