import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddgalleryPage } from './addgallery.page';

describe('AddgalleryPage', () => {
  let component: AddgalleryPage;
  let fixture: ComponentFixture<AddgalleryPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddgalleryPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddgalleryPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
