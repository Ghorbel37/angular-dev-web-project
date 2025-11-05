import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
}) //@Injectable: decorateur qui indique que le service accepte d'etre injecté dans les composant ou dans les services.
export class MemberService {

  constructor(private httpClient: HttpClient) { }
  
  //CRUD sur les membres
  getAllMembers(): Observable<any[]> {
    return this.httpClient.get<any[]>('http://localhost:3000/members');
  }
}
