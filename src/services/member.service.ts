import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/app/environment';
import { Member } from 'src/models/Member';

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
