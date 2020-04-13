import { TestBed } from '@angular/core/testing';

import { AutoCompletesService } from './auto-completes.service';

describe('AutoCompletesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AutoCompletesService = TestBed.get(AutoCompletesService);
    expect(service).toBeTruthy();
  });
});
