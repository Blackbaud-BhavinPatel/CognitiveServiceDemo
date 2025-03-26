import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgentBbbotComponent } from './agent-bbbot.component';

describe('AgentBbbotComponent', () => {
  let component: AgentBbbotComponent;
  let fixture: ComponentFixture<AgentBbbotComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AgentBbbotComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AgentBbbotComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
