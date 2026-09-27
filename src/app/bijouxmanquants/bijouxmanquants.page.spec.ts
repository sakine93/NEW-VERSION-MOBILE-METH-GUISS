import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BijouxmanquantsPage } from './bijouxmanquants.page';

describe('BijouxmanquantsPage', () => {
  let component: BijouxmanquantsPage;
  let fixture: ComponentFixture<BijouxmanquantsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BijouxmanquantsPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BijouxmanquantsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
