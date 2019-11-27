import { TestBed } from '@angular/core/testing';

import { PreloderService } from './preloder.service';

describe('PreloderService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PreloderService = TestBed.get(PreloderService);
    expect(service).toBeTruthy();
  });
});
