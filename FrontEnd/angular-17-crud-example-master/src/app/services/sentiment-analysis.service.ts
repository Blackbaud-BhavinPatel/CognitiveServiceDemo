import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class SentimentAnalysisService {

  private apiUrl = 'https://api.example.com/sentiment'; // Replace with your actual API URL

  constructor(private http: HttpClient) { }
  GetsentimentApiData(isSample:boolean=false)
  {
    if(isSample)
    return this.getSentimentDataFromSampleData()
    return this.getSentimentDataFromApi()
  }

  /**
   * Real API interaction method
   * This method fetches sentiment analysis data from an API endpoint.
   */
  getSentimentDataFromApi(): Observable<any> {
    // API call to fetch real sentiment analysis data
    return this.http.get(`${this.apiUrl}/samples`);
  }
  /** Sample Data */
   getSentimentDataFromSampleData() : any[]
  {
   return [
      {
        "conversationId": 1,
        "conversationText": "Customer: My order hasn't arrived yet. Tracking number is ABC123. Associate: I apologize for the delay. Let me check on that for you.",
        "agentName": "Alice Smith",
        "clientName": "David Miller",
        "sentiment": "",
        "channel": "Email",
        "neutral": null,
        "negative": null,
        "positive": null
      },
      {
        "conversationId": 2,
        "conversationText": "Customer: I'm having trouble setting up the new software. Associate: Can you please describe the steps you've taken so far?",
        "agentName": "Bob Johnson",
        "clientName": "Eve Garcia",
        "sentiment": "",
        "channel": "Phone",
        "neutral": null,
        "negative": null,
        "positive": null
      },
      {
        "conversationId": 3,
        "conversationText": "Customer: I have a question about your return policy. Associate: Our return policy allows for returns within 30 days with proof of purchase.",
        "agentName": "Alice Smith",
        "clientName": "Frank Wilson",
        "sentiment": "",
        "channel": "Chat",
        "neutral": null,
        "negative": null,
        "positive": null
      },
      {
        "conversationId": 4,
        "conversationText": "Customer: Interested in learning more about your enterprise solutions. Associate: Certainly! I can connect you with our sales team.",
        "agentName": "Charlie Brown",
        "clientName": "Grace Rodriguez",
        "sentiment": "",
        "channel": "Email",
        "neutral": null,
        "negative": null,
        "positive": null
      },
      {
        "conversationId": 5,
        "conversationText": "Customer: The product I received is damaged. Associate: I'm very sorry to hear that. Could you please send us a photo?",
        "agentName": "Diana Lee",
        "clientName": "Henry Martinez",
        "sentiment": "",
        "channel": "Chat",
        "neutral": null,
        "negative": null,
        "positive": null
      },
      {
        "conversationId": 6,
        "conversationText": "Customer: Follow up on my previous email regarding the missing parts. Associate: Yes, I see your email. We are working on shipping those out to you.",
        "agentName": "Bob Johnson",
        "clientName": "David Miller",
        "sentiment": "",
        "channel": "Phone",
        "neutral": null,
        "negative": null,
        "positive": null
      },
      {
        "conversationId": 7,
        "conversationText": "Customer: Can you help me troubleshoot an error message I'm seeing? Associate: Please provide the exact error message and when it occurs.",
        "agentName": "Ethan Davis",
        "clientName": "Frank Wilson",
        "sentiment": "",
        "channel": "Email",
        "neutral": null,
        "negative": null,
        "positive": null
      },
      {
        "conversationId": 8,
        "conversationText": "Customer: Just wanted to say I had a great experience with your support team! Associate: Thank you for your positive feedback! We appreciate it.",
        "agentName": "Alice Smith",
        "clientName": "Ivy Anderson",
        "sentiment": "",
        "channel": "Chat",
        "neutral": null,
        "negative": null,
        "positive": null
      },
      {
        "conversationId": 9,
        "conversationText": "Customer: I need to upgrade my account. Associate: I can assist you with that. What type of upgrade are you looking for?",
        "agentName": "Charlie Brown",
        "clientName": "Eve Garcia",
        "sentiment": "",
        "channel": "Phone",
        "neutral": null,
        "negative": null,
        "positive": null
      },
      {
        "conversationId": 10,
        "conversationText": "Customer: Hi, I wanted to give feedback on the new feature you released. Its great, but I think it could be improved.\nAgent: Thank you for your feedback! We appreciate hearing from our users. Could you please share more details on what improvements youd like to see?\nCustomer: Sure, I think it would be better if the feature allowed more customization options.\nAgent: Thats a valuable suggestion. Ill pass this on to our development team. Your input helps us improve our services. Is there anything else youd like to share?\nCustomer: No, thats all. Thanks for listening!\nAgent: Youre welcome! Have a great day!",
        "agentName": "Diana Lee",
        "clientName": "Henry Martinez",
        "sentiment": "Positive",
        "channel": "Email",
        "neutral": 0.15,
        "negative": 0.03,
        "positive": 0.82
      },
      {
        "conversationId": 11,
        "conversationText": "Customer: Hi, I need help understanding my recent invoice. Can you explain the charges?\n \nAgent: Sure, I'd be happy to help! Let me pull up your account details. Could you please provide your account number?\n \nCustomer: It's 123456.\n \nAgent: Thank you. I see that your invoice includes charges for your monthly subscription, as well as a one-time fee for additional services you requested last month. Would you like a detailed breakdown of these charges?\n \nCustomer: Yes, please.\n \nAgent: Here’s the breakdown: Your monthly subscription is $50, and the one-time fee for additional services is $20. Is there anything else I can assist you with?\n \nCustomer: No, that's all. Thank you!\n \nAgent: You're welcome! Have a great day!",
        "agentName": "Alice Smith",
        "clientName": "Bhavin Patel",
        "sentiment": "Positive",
        "channel": "Email",
        "neutral": 0.06,
        "negative": 0,
        "positive": 0.93
      }
    ]
  }
}
