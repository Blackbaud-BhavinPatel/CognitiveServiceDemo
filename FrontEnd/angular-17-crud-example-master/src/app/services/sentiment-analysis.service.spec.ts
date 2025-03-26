import { TestBed } from '@angular/core/testing';

import { SentimentAnalysisService } from './sentiment-analysis.service';

describe('SentimentAnalysisService', () => {
  let service: SentimentAnalysisService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SentimentAnalysisService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
