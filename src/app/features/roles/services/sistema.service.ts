import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { delay, map } from 'rxjs/operators';
import { Sistema } from '../models/sistema.model';

@Injectable({
  providedIn: 'root'
})
export class SistemaService {
  
  // Mock data - Reemplazar con llamada real a API
  private mockSistemas: Sistema[] = [
    {
      id: 1,
      nombre: 'Sistema de Gestión Administrativa',
      descripcion: 'Módulo principal de administración',
      estado: true,
      fechaCreacion: new Date('2024-01-15'),
      fechaActualizacion: new Date('2024-03-10')
    },
    {
      id: 2,
      nombre: 'Sistema de Tesorería',
      descripcion: 'Gestión financiera y tesorería',
      estado: true,
      fechaCreacion: new Date('2024-01-20'),
      fechaActualizacion: new Date('2024-03-08')
    },
    {
      id: 3,
      nombre: 'Sistema de Mesa de Entradas',
      descripcion: 'Gestión de documentos y expedientes',
      estado: true,
      fechaCreacion: new Date('2024-02-01'),
      fechaActualizacion: new Date('2024-03-12')
    },
    {
      id: 4,
      nombre: 'Sistema de Recursos Humanos',
      descripcion: 'Gestión de personal y RRHH',
      estado: true,
      fechaCreacion: new Date('2024-02-10'),
      fechaActualizacion: new Date('2024-03-05')
    }
  ];

  constructor() { }

  /**
   * Obtiene todos los sistemas activos
   * ENDPOINT FUTURO: GET /api/sistemas
   */
  getSistemas(): Observable<Sistema[]> {
    // Simular delay de red
    return of(this.mockSistemas.filter(s => s.estado)).pipe(
      delay(300),
      map(sistemas => {
        console.log('Sistemas cargados:', sistemas);
        return sistemas;
      })
    );
  }

  /**
   * Obtiene un sistema por ID
   * ENDPOINT FUTURO: GET /api/sistemas/:id
   */
  getSistemaById(id: number): Observable<Sistema> {
    const sistema = this.mockSistemas.find(s => s.id === id);
    
    if (sistema) {
      return of(sistema).pipe(delay(200));
    } else {
      return throwError(() => new Error('Sistema no encontrado'));
    }
  }

  /**
   * Crea un nuevo sistema
   * ENDPOINT FUTURO: POST /api/sistemas
   */
  createSistema(sistema: Omit<Sistema, 'id' | 'fechaCreacion' | 'fechaActualizacion'>): Observable<Sistema> {
    const newSistema: Sistema = {
      ...sistema,
      id: Math.max(...this.mockSistemas.map(s => s.id)) + 1,
      fechaCreacion: new Date(),
      fechaActualizacion: new Date()
    };
    
    this.mockSistemas.push(newSistema);
    return of(newSistema).pipe(delay(300));
  }

  /**
   * Actualiza un sistema existente
   * ENDPOINT FUTURO: PUT /api/sistemas/:id
   */
  updateSistema(id: number, sistema: Partial<Sistema>): Observable<Sistema> {
    const index = this.mockSistemas.findIndex(s => s.id === id);
    
    if (index === -1) {
      return throwError(() => new Error('Sistema no encontrado'));
    }
    
    this.mockSistemas[index] = {
      ...this.mockSistemas[index],
      ...sistema,
      fechaActualizacion: new Date()
    };
    
    return of(this.mockSistemas[index]).pipe(delay(300));
  }

  /**
   * Elimina un sistema (cambio de estado)
   * ENDPOINT FUTURO: DELETE /api/sistemas/:id
   */
  deleteSistema(id: number): Observable<void> {
    const index = this.mockSistemas.findIndex(s => s.id === id);
    
    if (index === -1) {
      return throwError(() => new Error('Sistema no encontrado'));
    }
    
    this.mockSistemas[index].estado = false;
    this.mockSistemas[index].fechaActualizacion = new Date();
    
    return of(void 0).pipe(delay(300));
  }
}
