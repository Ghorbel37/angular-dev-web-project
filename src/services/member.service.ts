import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/app/environment';
import { Member } from 'src/models/Member';
import { Publication } from 'src/models/Publication';
import { Evnt } from 'src/models/Event';
import { Tool } from 'src/models/Tool';

@Injectable({
  providedIn: 'root'
}) //@Injectable: decorateur qui indique que le service accepte d'etre injecté dans les composant ou dans les services.
export class MemberService {

  apiUrl = `${environment.apiUrl}/${environment.memberApi}`;
  constructor(private httpClient: HttpClient) { }
  
  //CRUD sur les membres
  getAllMembers(): Observable<any[]> {
    return this.httpClient.get<any[]>(`${this.apiUrl}/membres`);
  }

  getMemberById(id: string): Observable<Member> {
    return this.httpClient.get<Member>(`${this.apiUrl}/membres/${id}`);
  }

  // fetch member with publications included
  getFullMember(id: string): Observable<any> {
    return this.httpClient.get<any>(`${this.apiUrl}/fullmember/${id}`);
  }

  // Member-specific publications
  getMemberPublications(id: string): Observable<Publication[]> {
    return this.httpClient.get<Publication[]>(`${this.apiUrl}/membres/${id}/publications`);
  }

  // Associate an existing publication to a member
  addPublicationToMember(memberId: string, publicationId: string): Observable<void> {
    return this.httpClient.post<void>(`${this.apiUrl}/membres/${memberId}/publications/${publicationId}`, {});
  }

  // Remove publication association from member
  removePublicationFromMember(memberId: string, publicationId: string): Observable<void> {
    return this.httpClient.delete<void>(`${this.apiUrl}/membres/${memberId}/publications/${publicationId}`);
  }

  // Member-specific events
  getMemberEvents(id: string): Observable<Evnt[]> {
    return this.httpClient.get<Evnt[]>(`${this.apiUrl}/membres/${id}/evenements`);
  }

  addEventToMember(memberId: string, eventId: string): Observable<void> {
    return this.httpClient.post<void>(`${this.apiUrl}/membres/${memberId}/evenements/${eventId}`, {});
  }

  removeEventFromMember(memberId: string, eventId: string): Observable<void> {
    return this.httpClient.delete<void>(`${this.apiUrl}/membres/${memberId}/evenements/${eventId}`);
  }

  // Member-specific tools
  getMemberTools(id: string): Observable<Tool[]> {
    return this.httpClient.get<Tool[]>(`${this.apiUrl}/membres/${id}/outils`);
  }

  addToolToMember(memberId: string, toolId: string): Observable<void> {
    return this.httpClient.post<void>(`${this.apiUrl}/membres/${memberId}/outils/${toolId}`, {});
  }

  removeToolFromMember(memberId: string, toolId: string): Observable<void> {
    return this.httpClient.delete<void>(`${this.apiUrl}/membres/${memberId}/outils/${toolId}`);
  }

  saveMember(member: Member): Observable<void> {
    const t = (member.type || '').toLowerCase();
    if (t === 'enseignant') {
      return this.httpClient.post<void>(`${this.apiUrl}/membres/enseignant`, member);
    } else {
      return this.httpClient.post<void>(`${this.apiUrl}/membres/etudiant`, member);
    }
  }

  deleteMember(id: string): Observable<void> {
    return this.httpClient.delete<void>(`${this.apiUrl}/membres/${id}`)
  }

  updateMember(id: string, member: Member): Observable<void> {
    const t = (member.type || '').toLowerCase();
    if (t === 'enseignant') {
      return this.httpClient.put<void>(`${this.apiUrl}/membres/enseignant/${id}`, member);
    } else {
      return this.httpClient.put<void>(`${this.apiUrl}/membres/etudiant/${id}`, member);
    }
  }
}
