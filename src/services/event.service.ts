import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/app/environment';
import { Evnt } from 'src/models/Event';

@Injectable({
  providedIn: 'root'
})
export class EventService {

  apiUrl = `${environment.apiUrl}/${environment.eventApi}`;
  constructor(private httpClient: HttpClient) { }

  //CRUD sur les evenements
    getAllEvents(): Observable<Evnt[]> {
      return this.httpClient
      .get<{ _embedded?: { evenements?: Evnt[] } }>(`${this.apiUrl}/evenements`)
      .pipe(
        map(res => Array.isArray(res) ? (res as unknown as Evnt[]) : (res._embedded?.evenements ?? []))
      );
    }
  
    getEventById(id: string): Observable<Evnt> {
      return this.httpClient.get<Evnt>(`${this.apiUrl}/evenements/${id}`);
    }
  
    saveEvent(event: Event): Observable<void> {
      return this.httpClient.post<void>(`${this.apiUrl}/evenements`, event)
    }
  
    deleteEvent(id: string): Observable<void> {
      return this.httpClient.delete<void>(`${this.apiUrl}/evenements/${id}`)
    }
  
    updateEvent(id: string, event: Evnt): Observable<void> {
      return this.httpClient.put<void>(`${this.apiUrl}/evenements/${id}`, event)
    }
}
