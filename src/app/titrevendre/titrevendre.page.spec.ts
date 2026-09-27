import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TitrevendrePage } from './titrevendre.page';

describe('TitrevendrePage', () => {
  let component: TitrevendrePage;
  let fixture: ComponentFixture<TitrevendrePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TitrevendrePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TitrevendrePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
