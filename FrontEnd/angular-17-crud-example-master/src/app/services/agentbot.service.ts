import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AgentbotService {

 private apiUrl = 'http://localhost:5291/api'; // Replace with your actual API URL
 
 constructor(private http: HttpClient) {}

 GetAnswerFromQuestion(data: any):Observable<string> {
  return this.http.post<any>(`${this.apiUrl}/QuestionAnswer`, data).pipe(
    map(response => {
      const answers = response?.answer?.value?.answers || [];
      if (answers.length > 0) {
        const firstAnswer = answers[0];
        return `Answer: ${firstAnswer.answer || 'N/A'}`;
      }
      return 'No valid answer found.';
    }),
    catchError(error => {
      console.error('Error:', error);
      return of('I\'m sorry, but I couldn\'t find any relevant information for your query');
    })
  );
}


 processApiResponse(response: any): string {
  const answers = response?.answer?.value?.answers || [];
  if (answers.length > 0) {
    const firstAnswer = answers[0];
    return `Question: ${firstAnswer.questions?.[0] || 'N/A'}\nAnswer: ${firstAnswer.answer || 'N/A'}`;
  }
  return 'No valid answer found.';
}


}
