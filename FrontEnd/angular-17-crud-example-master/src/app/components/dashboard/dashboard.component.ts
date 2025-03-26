import { Component, OnInit } from '@angular/core';
import { Conversation } from '../../models/conversation.model';
import { SentimentAnalysisService } from '../../services/sentiment-analysis.service';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {
  errorMessage: string | null = null;
  successMessage: string | null = null;
  constructor(private sentimentAnalysisService:SentimentAnalysisService,private sanitizer: DomSanitizer){}

 ngOnInit(): void {
  this.sentimentAnalysisService.getSentimentDataFromApi().subscribe({
    next: (data) => {
      this.conversation = data;
      console.log(this.conversation);
    },
    error: (e) => console.error(e)
  });
 }
   conversation?: Conversation[];

   selectedConversation: Conversation | null = null;

    openModal(conversation: Conversation) {
        this.selectedConversation = conversation;
    }
    closeModal() {
      this.selectedConversation = null;
  }

  formatConversation(conversation: string): SafeHtml {
    const formattedConversation = conversation.replace(/\n/g, '<br>');
    return this.sanitizer.bypassSecurityTrustHtml(formattedConversation);
}

GetAnalysis(conversationId: any) {
  this.sentimentAnalysisService.getConversationById(conversationId).subscribe({
    next: (data: Conversation) => {
        // this.conversation = data;
        this.errorMessage = null;
        this.successMessage = 'Conversation data fetched successfully!';
        console.log('Conversation data:', this.conversation);

         // Refresh the component after a short delay
      setTimeout(() => {
        this.refreshComponent();
    }, 2000); // Adjust the delay as needed
    },
    error: (error: any) => {
      this.errorMessage = `Error fetching conversation: ${error}`;
      this.successMessage = null;
        console.error(this.errorMessage);
    }
});
}
refreshComponent(): void {
  this.successMessage = null;
  this.errorMessage = null;
  // You can add any additional logic needed to refresh the component
  this.ngOnInit(); // Reinitialize the component
}
getGradient(sentimentScore:Conversation): string {
  const goodColor = '#5A9936';
  const neutralColor = '#FBB034';
  const badColor = '#EF4044';

  return `linear-gradient(to right, ${goodColor} ${sentimentScore.positive * 100}%, ${neutralColor} ${sentimentScore.neutral * 100}%, ${badColor} ${sentimentScore.negative * 100}%)`;
}


getSentimentImage(conversation: Conversation): string {
  
  if (conversation.positive >= conversation.neutral && conversation.positive >= conversation.negative) {
    return 'assets/images/positive.png';
  } else if ((conversation.neutral >= conversation.positive && conversation.neutral >= conversation.negative)||(Math.round(conversation.positive*10)==Math.round(conversation.negative*10))) {
    return 'assets/images/neutral.png';
  } else {
    return 'assets/images/negative.png';
  }
}

}
             



