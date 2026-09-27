import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AidaPage } from './aida.page';

describe('AidaPage', () => {
  let component: AidaPage;
  let fixture: ComponentFixture<AidaPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AidaPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AidaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
