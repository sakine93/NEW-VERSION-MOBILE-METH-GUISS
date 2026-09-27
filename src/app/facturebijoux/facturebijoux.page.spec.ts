import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FacturebijouxPage } from './facturebijoux.page';

describe('FacturebijouxPage', () => {
  let component: FacturebijouxPage;
  let fixture: ComponentFixture<FacturebijouxPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FacturebijouxPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FacturebijouxPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
