import { TestBed } from '@angular/core/testing';

import { PageCounterService } from './pagecounter.service';

describe('PagecounterService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PageCounterService = TestBed.get(PageCounterService);
    expect(service).toBeTruthy();
  });
});
