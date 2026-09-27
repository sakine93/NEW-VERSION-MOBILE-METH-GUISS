import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VentepoidsPage } from './ventepoids.page';

describe('VentepoidsPage', () => {
  let component: VentepoidsPage;
  let fixture: ComponentFixture<VentepoidsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VentepoidsPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VentepoidsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
