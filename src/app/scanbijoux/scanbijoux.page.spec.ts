import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ScanbijouxPage } from './scanbijoux.page';

describe('ScanbijouxPage', () => {
  let component: ScanbijouxPage;
  let fixture: ComponentFixture<ScanbijouxPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ScanbijouxPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ScanbijouxPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
