import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AchatsPage } from './achats.page';

describe('AchatsPage', () => {
  let component: AchatsPage;
  let fixture: ComponentFixture<AchatsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AchatsPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AchatsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
