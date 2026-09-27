import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoriqueachatsPage } from './historiqueachats.page';

describe('HistoriqueachatsPage', () => {
  let component: HistoriqueachatsPage;
  let fixture: ComponentFixture<HistoriqueachatsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HistoriqueachatsPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HistoriqueachatsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
