import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Conversation } from '../models/conversation.model';

@Injectable({
    providedIn: 'root'
})
export class SentimentAnalysisService {

    private apiUrl = 'http://localhost:5291/api'; // Replace with your actual API URL

    constructor(private http: HttpClient) { }

    /**
     * Fetch all sentiment analysis data from the API.
     */
    getSentimentDataFromApi(): Observable<Conversation[]> {
        return this.http.get<Conversation[]>(`${this.apiUrl}/Agents`)
            .pipe(
                catchError(this.handleError)
            );
    }

    /**
     * Fetch a conversation by its ConversationId.
     * @param conversationId - The ID of the conversation to fetch
     * @returns Observable containing the conversation data
     */
    getConversationById(conversationId: number): Observable<Conversation> {
        return this.http.get<Conversation>(`${this.apiUrl}/Azure/analyze?conversationId=${conversationId}`)
            .pipe(
                catchError(this.handleError)
            );
    }

    /**
     * Handle HTTP errors
     * @param error - The HTTP error response
     * @returns Observable that throws an error
     */
    private handleError(error: HttpErrorResponse): Observable<never> {
        let errorMessage = 'An unknown error occurred!';
        if (error.error instanceof ErrorEvent) {
            // Client-side or network error
            errorMessage = `Error: ${error.error.message}`;
        } else {
            // Backend error
            errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
        }
        console.error(errorMessage);
        return throwError(errorMessage);
    }
}