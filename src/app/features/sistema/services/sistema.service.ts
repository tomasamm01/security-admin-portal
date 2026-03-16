import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Sistema } from '../models/sistema.model';

@Injectable({
  providedIn: 'root'
})
export class SistemaService {
  private apiUrl = 'api/sistemas'; // Ajustar según tu API

  constructor(private http: HttpClient) {}

  getSistemas(): Observable<Sistema[]> {
    return this.http.get<Sistema[]>(this.apiUrl);
  }

  getSistemaById(id: number): Observable<Sistema> {
    return this.http.get<Sistema>(`${this.apiUrl}/${id}`);
  }

  createSistema(sistema: Sistema): Observable<Sistema> {
    return this.http.post<Sistema>(this.apiUrl, sistema);
  }

  updateSistema(id: number, sistema: Sistema): Observable<Sistema> {
    return this.http.put<Sistema>(`${this.apiUrl}/${id}`, sistema);
  }

  deleteSistema(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
