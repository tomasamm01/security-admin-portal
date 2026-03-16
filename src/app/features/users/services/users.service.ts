import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Users } from '../models/users.model';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private apiUrl = 'api/users'; // Ajustar según tu API

  constructor(private http: HttpClient) {}

  getUsers(): Observable<Users[]> {
    return this.http.get<Users[]>(this.apiUrl);
  }

  getUserById(id: number): Observable<Users> {
    return this.http.get<Users>(`${this.apiUrl}/${id}`);
  }

  createUser(user: Users): Observable<Users> {
    return this.http.post<Users>(this.apiUrl, user);
  }

  updateUser(id: number, user: Users): Observable<Users> {
    return this.http.put<Users>(`${this.apiUrl}/${id}`, user);
  }

  deleteUser(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
