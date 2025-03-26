import { TestBed } from '@angular/core/testing';

import { AgentbotService } from './agentbot.service';

describe('AgentbotService', () => {
  let service: AgentbotService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AgentbotService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
