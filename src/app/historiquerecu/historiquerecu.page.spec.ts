import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoriquerecuPage } from './historiquerecu.page';

describe('HistoriquerecuPage', () => {
  let component: HistoriquerecuPage;
  let fixture: ComponentFixture<HistoriquerecuPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HistoriquerecuPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HistoriquerecuPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
