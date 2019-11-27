import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalsPage } from './modals.page';

describe('ModalsPage', () => {
  let component: ModalsPage;
  let fixture: ComponentFixture<ModalsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalsPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
