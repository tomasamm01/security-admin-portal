import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Profile } from '../models/profile.model';
import { environment } from '../../../../environments/environment';

export interface UpdateState {
  id: number;
  estado: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  private baseUrl = environment.pathApi;

  constructor(private http: HttpClient) {}

  getProfiles(): Observable<Profile[]> {
    return this.http.get<Profile[]>(`${this.baseUrl}/perfil/obtener-todos`);
  }

  getProfileById(id: number): Observable<Profile> {
    return this.http.get<Profile>(`${this.baseUrl}/perfil/obtener/${id}`);
  }

  createProfile(profile: Profile): Observable<boolean> {
    return this.http.post<boolean>(`${this.baseUrl}/perfil/nuevo`, profile);
  }

  updateProfile(profile: Profile): Observable<boolean> {
    return this.http.post<boolean>(`${this.baseUrl}/perfil/actualizar`, profile);
  }

  deleteProfile(id: number): Observable<boolean> {
    return this.http.post<boolean>(`${this.baseUrl}/perfil/eliminar`, { id });
  }

  updateEstado(updateData: UpdateState): Observable<boolean> {
    return this.http.post<boolean>(`${this.baseUrl}/perfil/actualizar-estado`, updateData);
  }
}
