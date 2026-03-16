import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Sistema } from '../models/sistema.model';
import { environment } from '../../../../environments/environment';

// Interface para actualizar estado
export interface UpdateState {
  id: number;
  estado: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class SistemaService {
  private baseUrl = environment.pathApi;

  constructor(private http: HttpClient) {}

  // GET: /sistema/obtener-todos
  getSistemas(): Observable<Sistema[]> {
    return this.http.get<Sistema[]>(`${this.baseUrl}/sistema/obtener-todos`);
  }

  // GET: /sistema/obtener/{id}
  getSistemaById(id: number): Observable<Sistema> {
    return this.http.get<Sistema>(`${this.baseUrl}/sistema/obtener/${id}`);
  }

  // POST: /sistema/new
  createSistema(sistema: Sistema): Observable<boolean> {
    return this.http.post<boolean>(`${this.baseUrl}/sistema/new`, sistema);
  }

  // POST: /sistema/update
  updateSistema(sistema: Sistema): Observable<boolean> {
    return this.http.post<boolean>(`${this.baseUrl}/sistema/update`, sistema);
  }

  // POST: /sistema/update-state
  updateEstado(updateData: UpdateState): Observable<boolean> {
    return this.http.post<boolean>(`${this.baseUrl}/sistema/update-state`, updateData);
  }
}
