import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Users } from '../models/users.model';
import { environment } from '../../../../environments/environment';

// Interface para actualizar estado
export interface UpdateUserState {
  id: number;
  estado: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private baseUrl = environment.pathApi;

  constructor(private http: HttpClient) {}

  // GET: /usuario/obtener-todos
  getUsers(): Observable<Users[]> {
    return this.http.get<Users[]>(`${this.baseUrl}/usuario/obtener-todos`);
  }

  // GET: /usuario/obtener/{id}
  getUserById(id: number): Observable<Users> {
    return this.http.get<Users>(`${this.baseUrl}/usuario/obtener/${id}`);
  }

  // POST: /usuario/new
  createUser(user: Users): Observable<boolean> {
    return this.http.post<boolean>(`${this.baseUrl}/usuario/new`, user);
  }

  // POST: /usuario/update
  updateUser(user: Users): Observable<boolean> {
    return this.http.post<boolean>(`${this.baseUrl}/usuario/update`, user);
  }

  // POST: /usuario/update-state
  updateEstado(updateData: UpdateUserState): Observable<boolean> {
    return this.http.post<boolean>(`${this.baseUrl}/usuario/update-state`, updateData);
  }
}
