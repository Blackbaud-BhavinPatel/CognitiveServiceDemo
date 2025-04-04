import { Component } from '@angular/core';
import { AgentbotService } from '../../services/agentbot.service';

@Component({
  selector: 'app-agent-bbbot',
  templateUrl: './agent-bbbot.component.html',
  styleUrl: './agent-bbbot.component.css'
})
export class AgentBbbotComponent {
  messages: { text: string, type: 'question' | 'answer' }[] = [];
  newMessage: string = '';
  messageType: 'question' | 'answer' = 'question';

  constructor(private agentbotService: AgentbotService) { }

  sendMessage() {
    if (this.newMessage.trim()) {
      this.messages.push({ text: this.newMessage, type: 'question' });
      this.agentbotService.GetAnswerFromQuestion({ question: this.newMessage }).subscribe(
        response => {
          // Split the response after the colon
          const splitResponse = response.split(':');
          const formattedResponse = splitResponse.length > 1 ? splitResponse[2].trim() : response;
  
          this.messages.push({ text: formattedResponse, type: 'answer' });
        }
      );
      this.newMessage = '';
    }
  }
}
