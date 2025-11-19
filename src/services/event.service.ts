import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EventService {

  constructor(private httpClient: HttpClient) { }

  //CRUD sur les membres
    getAllEvents(): Observable<any[]> {
      return this.httpClient.get<any[]>('http://localhost:3000/events');
    }
  
    getEventById(id: string): Observable<Event> {
      return this.httpClient.get<Event>(`http://localhost:3000/events/${id}`);
    }
  
    saveEvent(event: Event): Observable<void> {
      return this.httpClient.post<void>('http://localhost:3000/events', event)
    }
  
    deleteEvent(id: string): Observable<void> {
      return this.httpClient.delete<void>(`http://localhost:3000/events/${id}`)
    }
  
    updateEvent(id: string, event: Event): Observable<void> {
      return this.httpClient.put<void>(`http://localhost:3000/events/${id}`, event)
    }
}
