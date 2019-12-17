import { TestBed } from '@angular/core/testing';

import { PagecounterService } from './pagecounter.service';

describe('PagecounterService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PagecounterService = TestBed.get(PagecounterService);
    expect(service).toBeTruthy();
  });
});
