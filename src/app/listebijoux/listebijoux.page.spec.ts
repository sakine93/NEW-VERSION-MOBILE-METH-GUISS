import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListebijouxPage } from './listebijoux.page';

describe('ListebijouxPage', () => {
  let component: ListebijouxPage;
  let fixture: ComponentFixture<ListebijouxPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListebijouxPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListebijouxPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
