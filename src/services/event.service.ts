import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Evnt } from 'src/models/Event';

@Injectable({
  providedIn: 'root'
})
export class EventService {

  constructor(private httpClient: HttpClient) { }

  //CRUD sur les membres
    getAllEvents(): Observable<any[]> {
      return this.httpClient.get<any[]>('http://localhost:3000/events');
    }
  
    getEventById(id: string): Observable<Evnt> {
      return this.httpClient.get<Evnt>(`http://localhost:3000/events/${id}`);
    }
  
    saveEvent(event: Event): Observable<void> {
      return this.httpClient.post<void>('http://localhost:3000/events', event)
    }
  
    deleteEvent(id: string): Observable<void> {
      return this.httpClient.delete<void>(`http://localhost:3000/events/${id}`)
    }
  
    updateEvent(id: string, event: Evnt): Observable<void> {
      return this.httpClient.put<void>(`http://localhost:3000/events/${id}`, event)
    }
}
