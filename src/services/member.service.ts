import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Member } from 'src/models/Member';

@Injectable({
  providedIn: 'root'
}) //@Injectable: decorateur qui indique que le service accepte d'etre injecté dans les composant ou dans les services.
export class MemberService {

  constructor(private httpClient: HttpClient) { }
  
  //CRUD sur les membres
  getAllMembers(): Observable<any[]> {
    return this.httpClient.get<any[]>('http://localhost:3000/members');
  }

  saveMember(member: Member): Observable<void> {
    return this.httpClient.post<void>('http://localhost:3000/members', member)
  }

  deleteMember(id: string): Observable<void> {
    return this.httpClient.delete<void>(`http://localhost:3000/members/${id}`)
  }

  updateMember(member: Member): Observable<void> {
    return this.httpClient.put<void>(`http://localhost:3000/members/${member.id}`, member)
  }
}
