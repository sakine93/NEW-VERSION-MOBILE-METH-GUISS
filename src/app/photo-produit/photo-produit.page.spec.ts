import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PhotoProduitPage } from './photo-produit.page';

describe('PhotoProduitPage', () => {
  let component: PhotoProduitPage;
  let fixture: ComponentFixture<PhotoProduitPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PhotoProduitPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PhotoProduitPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
