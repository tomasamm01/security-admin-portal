import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { delay, map } from 'rxjs/operators';
import { Perfil, PerfilAsignado } from '../models/perfil.model';

@Injectable({
  providedIn: 'root'
})
export class PerfilService {
  
  // Mock data - Reemplazar con llamada real a API
  private mockPerfiles: Perfil[] = [
    // Perfiles del Sistema de Gestión Administrativa (ID: 1)
    {
      id: 1,
      nombre: 'Administrador General',
      descripcion: 'Acceso completo al sistema administrativo',
      sistemaId: 1,
      sistemaNombre: 'Sistema de Gestión Administrativa',
      estado: true,
      fechaCreacion: new Date('2024-01-16'),
      fechaActualizacion: new Date('2024-03-10')
    },
    {
      id: 2,
      nombre: 'Gestor de Usuarios',
      descripcion: 'Gestión de usuarios y permisos básicos',
      sistemaId: 1,
      sistemaNombre: 'Sistema de Gestión Administrativa',
      estado: true,
      fechaCreacion: new Date('2024-01-16'),
      fechaActualizacion: new Date('2024-03-10')
    },
    {
      id: 3,
      nombre: 'Operador Administrativo',
      descripcion: 'Acceso a funciones operativas básicas',
      sistemaId: 1,
      sistemaNombre: 'Sistema de Gestión Administrativa',
      estado: true,
      fechaCreacion: new Date('2024-01-17'),
      fechaActualizacion: new Date('2024-03-11')
    },

    // Perfiles del Sistema de Tesorería (ID: 2)
    {
      id: 4,
      nombre: 'Tesorero Principal',
      descripcion: 'Control total de operaciones financieras',
      sistemaId: 2,
      sistemaNombre: 'Sistema de Tesorería',
      estado: true,
      fechaCreacion: new Date('2024-01-21'),
      fechaActualizacion: new Date('2024-03-08')
    },
    {
      id: 5,
      nombre: 'Analista Financiero',
      descripcion: 'Análisis y reportes financieros',
      sistemaId: 2,
      sistemaNombre: 'Sistema de Tesorería',
      estado: true,
      fechaCreacion: new Date('2024-01-21'),
      fechaActualizacion: new Date('2024-03-08')
    },
    {
      id: 6,
      nombre: 'Operador de Caja',
      descripcion: 'Operaciones básicas de caja',
      sistemaId: 2,
      sistemaNombre: 'Sistema de Tesorería',
      estado: true,
      fechaCreacion: new Date('2024-01-22'),
      fechaActualizacion: new Date('2024-03-09')
    },

    // Perfiles del Sistema de Mesa de Entradas (ID: 3)
    {
      id: 7,
      nombre: 'Jefe de Mesa de Entradas',
      descripcion: 'Supervisión y control de documentos',
      sistemaId: 3,
      sistemaNombre: 'Sistema de Mesa de Entradas',
      estado: true,
      fechaCreacion: new Date('2024-02-02'),
      fechaActualizacion: new Date('2024-03-12')
    },
    {
      id: 8,
      nombre: 'Operador de Documentación',
      descripcion: 'Gestión de expedientes y documentos',
      sistemaId: 3,
      sistemaNombre: 'Sistema de Mesa de Entradas',
      estado: true,
      fechaCreacion: new Date('2024-02-02'),
      fechaActualizacion: new Date('2024-03-12')
    },

    // Perfiles del Sistema de Recursos Humanos (ID: 4)
    {
      id: 9,
      nombre: 'Gerente de RRHH',
      descripcion: 'Gestión completa de recursos humanos',
      sistemaId: 4,
      sistemaNombre: 'Sistema de Recursos Humanos',
      estado: true,
      fechaCreacion: new Date('2024-02-11'),
      fechaActualizacion: new Date('2024-03-05')
    },
    {
      id: 10,
      nombre: 'Especialista en Personal',
      descripcion: 'Gestión de personal y nóminas',
      sistemaId: 4,
      sistemaNombre: 'Sistema de Recursos Humanos',
      estado: true,
      fechaCreacion: new Date('2024-02-11'),
      fechaActualizacion: new Date('2024-03-05')
    }
  ];

  constructor() { }

  /**
   * Obtiene todos los perfiles activos
   * ENDPOINT FUTURO: GET /api/perfiles
   */
  getPerfiles(): Observable<Perfil[]> {
    return of(this.mockPerfiles.filter(p => p.estado)).pipe(
      delay(300),
      map(perfiles => {
        console.log('Perfiles cargados:', perfiles);
        return perfiles;
      })
    );
  }

  /**
   * Obtiene perfiles por sistema ID
   * ENDPOINT FUTURO: GET /api/perfiles?sistemaId=:id
   */
  getPerfilesBySistemaId(sistemaId: number): Observable<Perfil[]> {
    const perfiles = this.mockPerfiles.filter(p => p.sistemaId === sistemaId && p.estado);
    
    return of(perfiles).pipe(
      delay(200),
      map(perfilesFiltrados => {
        console.log(`Perfiles para sistema ${sistemaId}:`, perfilesFiltrados);
        return perfilesFiltrados;
      })
    );
  }

  /**
   * Obtiene un perfil por ID
   * ENDPOINT FUTURO: GET /api/perfiles/:id
   */
  getPerfilById(id: number): Observable<Perfil> {
    const perfil = this.mockPerfiles.find(p => p.id === id);
    
    if (perfil) {
      return of(perfil).pipe(delay(200));
    } else {
      return throwError(() => new Error('Perfil no encontrado'));
    }
  }

  /**
   * Crea un nuevo perfil
   * ENDPOINT FUTURO: POST /api/perfiles
   */
  createPerfil(perfil: Omit<Perfil, 'id' | 'fechaCreacion' | 'fechaActualizacion'>): Observable<Perfil> {
    const newPerfil: Perfil = {
      ...perfil,
      id: Math.max(...this.mockPerfiles.map(p => p.id)) + 1,
      fechaCreacion: new Date(),
      fechaActualizacion: new Date()
    };
    
    this.mockPerfiles.push(newPerfil);
    return of(newPerfil).pipe(delay(300));
  }

  /**
   * Actualiza un perfil existente
   * ENDPOINT FUTURO: PUT /api/perfiles/:id
   */
  updatePerfil(id: number, perfil: Partial<Perfil>): Observable<Perfil> {
    const index = this.mockPerfiles.findIndex(p => p.id === id);
    
    if (index === -1) {
      return throwError(() => new Error('Perfil no encontrado'));
    }
    
    this.mockPerfiles[index] = {
      ...this.mockPerfiles[index],
      ...perfil,
      fechaActualizacion: new Date()
    };
    
    return of(this.mockPerfiles[index]).pipe(delay(300));
  }

  /**
   * Elimina un perfil (cambio de estado)
   * ENDPOINT FUTURO: DELETE /api/perfiles/:id
   */
  deletePerfil(id: number): Observable<void> {
    const index = this.mockPerfiles.findIndex(p => p.id === id);
    
    if (index === -1) {
      return throwError(() => new Error('Perfil no encontrado'));
    }
    
    this.mockPerfiles[index].estado = false;
    this.mockPerfiles[index].fechaActualizacion = new Date();
    
    return of(void 0).pipe(delay(300));
  }

  /**
   * Obtiene perfiles asignados a un usuario
   * ENDPOINT FUTURO: GET /api/usuarios/:id/perfiles
   */
  getPerfilesByUsuarioId(usuarioId: number): Observable<PerfilAsignado[]> {
    // Mock: simular perfiles asignados a un usuario
    const mockPerfilesAsignados: PerfilAsignado[] = [
      {
        perfilId: 1,
        perfilNombre: 'Administrador General',
        sistemaId: 1,
        sistemaNombre: 'Sistema de Gestión Administrativa'
      },
      {
        perfilId: 4,
        perfilNombre: 'Tesorero Principal',
        sistemaId: 2,
        sistemaNombre: 'Sistema de Tesorería'
      }
    ];
    
    return of(mockPerfilesAsignados).pipe(delay(200));
  }

  /**
   * Asigna perfiles a un usuario
   * ENDPOINT FUTURO: POST /api/usuarios/:id/perfiles
   */
  asignarPerfilesAUsuario(usuarioId: number, perfiles: { perfilId: number }[]): Observable<void> {
    console.log(`Asignando perfiles al usuario ${usuarioId}:`, perfiles);
    return of(void 0).pipe(delay(300));
  }

  /**
   * Elimina asignación de perfil a usuario
   * ENDPOINT FUTURO: DELETE /api/usuarios/:id/perfiles/:perfilId
   */
  eliminarPerfilDeUsuario(usuarioId: number, perfilId: number): Observable<void> {
    console.log(`Eliminando perfil ${perfilId} del usuario ${usuarioId}`);
    return of(void 0).pipe(delay(200));
  }
}
