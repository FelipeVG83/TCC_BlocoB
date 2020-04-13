import { TestBed } from '@angular/core/testing';

import { NgbDateFRParserFormatterService } from './ngb-date-frparser-formatter.service';

describe('NgbDateFRParserFormatterService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: NgbDateFRParserFormatterService = TestBed.get(NgbDateFRParserFormatterService);
    expect(service).toBeTruthy();
  });
});
