import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FacturebijouxComponent } from './facturebijoux.component';

describe('FacturebijouxComponent', () => {
  let component: FacturebijouxComponent;
  let fixture: ComponentFixture<FacturebijouxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FacturebijouxComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FacturebijouxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
