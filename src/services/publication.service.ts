import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/app/environment';
import { Publication } from 'src/models/Publication';

@Injectable({
  providedIn: 'root'
})
export class PublicationService {
  apiUrl = `${environment.apiUrl}/${environment.publicationApi}`;
  constructor(private httpClient: HttpClient) { }
  
  //CRUD sur les publications
  getAllPublications(): Observable<Publication[]> {
    return this.httpClient
      .get<{ _embedded?: { publications?: Publication[] } }>(`${this.apiUrl}/publications`)
      .pipe(
        map(res => Array.isArray(res) ? (res as unknown as Publication[]) : (res._embedded?.publications ?? []))
      );
  }

  getPublicationById(id: string): Observable<Publication> {
    return this.httpClient.get<Publication>(`${this.apiUrl}/publications/${id}`);
  }

  savePublication(publication: Publication): Observable<void> {
    return this.httpClient.post<void>(`${this.apiUrl}/publications`, publication)
  }

  deletePublication(id: string): Observable<void> {
    return this.httpClient.delete<void>(`${this.apiUrl}/publications/${id}`)
  }

  updatePublication(id: string, publication: Publication): Observable<void> {
    return this.httpClient.put<void>(`${this.apiUrl}/publications/${id}`, publication)
  }
}
