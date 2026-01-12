import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/app/environment';
import { Tool } from 'src/models/Tool';

@Injectable({
  providedIn: 'root'
})
export class ToolService {
  apiUrl = `${environment.apiUrl}/${environment.toolApi}`;
  constructor(private httpClient: HttpClient) { }
  
  //CRUD sur les outils
  getAllTools(): Observable<Tool[]> {
    return this.httpClient
      .get<{ _embedded?: { outils?: Tool[] } }>(`${this.apiUrl}/outils`)
      .pipe(
        map(res => Array.isArray(res) ? (res as unknown as Tool[]) : (res._embedded?.outils ?? []))
      );
  }

  getToolById(id: string): Observable<Tool> {
    return this.httpClient.get<Tool>(`${this.apiUrl}/outils/${id}`);
  }

  saveTool(tool: Tool): Observable<void> {
    return this.httpClient.post<void>(`${this.apiUrl}/outils`, tool)
  }

  deleteTool(id: string): Observable<void> {
    return this.httpClient.delete<void>(`${this.apiUrl}/outils/${id}`)
  }

  updateTool(id: string, tool: Tool): Observable<void> {
    return this.httpClient.put<void>(`${this.apiUrl}/outils/${id}`, tool)
  }
}
