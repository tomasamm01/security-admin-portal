import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { delay, map } from 'rxjs/operators';
import { 
  SistemaPerfil, 
  SistemaPerfilAsignacion,
  PerfilAsignado,
  CreateSistemaPerfilRequest,
  UpdateSistemaPerfilRequest,
  Sistema,
  Perfil
} from '../models/sistema-perfil.model';

@Injectable({
  providedIn: 'root'
})
export class SistemaPerfilService {
  
  // Mock data - Sistemas
  private mockSistemas: Sistema[] = [
    {
      id: 1,
      nombre: 'Sistema de Gestión Administrativa',
      descripcion: 'Sistema principal para gestión administrativa',
      estado: true,
      fechaCreacion: new Date('2024-01-15'),
      fechaActualizacion: new Date('2024-03-10')
    },
    {
      id: 2,
      nombre: 'Sistema de Tesorería',
      descripcion: 'Sistema para control financiero y tesorería',
      estado: true,
      fechaCreacion: new Date('2024-01-20'),
      fechaActualizacion: new Date('2024-03-08')
    },
    {
      id: 3,
      nombre: 'Sistema de Mesa de Entradas',
      descripcion: 'Sistema para gestión de documentos y expedientes',
      estado: true,
      fechaCreacion: new Date('2024-02-01'),
      fechaActualizacion: new Date('2024-03-12')
    },
    {
      id: 4,
      nombre: 'Sistema de Recursos Humanos',
      descripcion: 'Sistema para gestión de personal y RRHH',
      estado: true,
      fechaCreacion: new Date('2024-02-10'),
      fechaActualizacion: new Date('2024-03-05')
    }
  ];

  // Mock data - Perfiles
  private mockPerfiles: Perfil[] = [
    {
      id: 1,
      nombre: 'Administrador General',
      descripcion: 'Acceso completo al sistema',
      estado: true,
      fechaCreacion: new Date('2024-01-16')
    },
    {
      id: 2,
      nombre: 'Gestor de Usuarios',
      descripcion: 'Gestión de usuarios y permisos',
      estado: true,
      fechaCreacion: new Date('2024-01-16')
    },
    {
      id: 3,
      nombre: 'Operador Administrativo',
      descripcion: 'Operaciones básicas administrativas',
      estado: true,
      fechaCreacion: new Date('2024-01-17')
    },
    {
      id: 4,
      nombre: 'Tesorero Principal',
      descripcion: 'Control total de operaciones financieras',
      estado: true,
      fechaCreacion: new Date('2024-01-21')
    },
    {
      id: 5,
      nombre: 'Analista Financiero',
      descripcion: 'Análisis y reportes financieros',
      estado: true,
      fechaCreacion: new Date('2024-01-21')
    },
    {
      id: 6,
      nombre: 'Operador de Caja',
      descripcion: 'Operaciones básicas de caja',
      estado: true,
      fechaCreacion: new Date('2024-01-22')
    },
    {
      id: 7,
      nombre: 'Jefe de Mesa de Entradas',
      descripcion: 'Supervisión de documentos',
      estado: true,
      fechaCreacion: new Date('2024-02-02')
    },
    {
      id: 8,
      nombre: 'Operador de Documentación',
      descripcion: 'Gestión de expedientes',
      estado: true,
      fechaCreacion: new Date('2024-02-02')
    },
    {
      id: 9,
      nombre: 'Gerente de RRHH',
      descripcion: 'Gestión completa de RRHH',
      estado: true,
      fechaCreacion: new Date('2024-02-11')
    },
    {
      id: 10,
      nombre: 'Especialista en Personal',
      descripcion: 'Gestión de personal y nóminas',
      estado: true,
      fechaCreacion: new Date('2024-02-11')
    }
  ];

  // Mock data - Asignaciones Sistema-Perfil
  private mockSistemaPerfiles: SistemaPerfil[] = [
    // Sistema 1 - Gestión Administrativa
    {
      id: 1,
      sistemaId: 1,
      sistemaNombre: 'Sistema de Gestión Administrativa',
      perfilId: 1,
      perfilNombre: 'Administrador General',
      perfilDescripcion: 'Acceso completo al sistema',
      estado: true,
      fechaAsignacion: new Date('2024-01-20'),
      asignadoPor: 'admin',
      fechaActualizacion: new Date('2024-03-10')
    },
    {
      id: 2,
      sistemaId: 1,
      sistemaNombre: 'Sistema de Gestión Administrativa',
      perfilId: 2,
      perfilNombre: 'Gestor de Usuarios',
      perfilDescripcion: 'Gestión de usuarios y permisos',
      estado: true,
      fechaAsignacion: new Date('2024-01-21'),
      asignadoPor: 'admin'
    },
    {
      id: 3,
      sistemaId: 1,
      sistemaNombre: 'Sistema de Gestión Administrativa',
      perfilId: 3,
      perfilNombre: 'Operador Administrativo',
      perfilDescripcion: 'Operaciones básicas administrativas',
      estado: true,
      fechaAsignacion: new Date('2024-01-22'),
      asignadoPor: 'admin'
    },

    // Sistema 2 - Tesorería
    {
      id: 4,
      sistemaId: 2,
      sistemaNombre: 'Sistema de Tesorería',
      perfilId: 4,
      perfilNombre: 'Tesorero Principal',
      perfilDescripcion: 'Control total de operaciones financieras',
      estado: true,
      fechaAsignacion: new Date('2024-01-25'),
      asignadoPor: 'admin',
      fechaActualizacion: new Date('2024-03-08')
    },
    {
      id: 5,
      sistemaId: 2,
      sistemaNombre: 'Sistema de Tesorería',
      perfilId: 5,
      perfilNombre: 'Analista Financiero',
      perfilDescripcion: 'Análisis y reportes financieros',
      estado: true,
      fechaAsignacion: new Date('2024-01-26'),
      asignadoPor: 'admin'
    },
    {
      id: 6,
      sistemaId: 2,
      sistemaNombre: 'Sistema de Tesorería',
      perfilId: 6,
      perfilNombre: 'Operador de Caja',
      perfilDescripcion: 'Operaciones básicas de caja',
      estado: true,
      fechaAsignacion: new Date('2024-01-27'),
      asignadoPor: 'admin'
    },

    // Sistema 3 - Mesa de Entradas
    {
      id: 7,
      sistemaId: 3,
      sistemaNombre: 'Sistema de Mesa de Entradas',
      perfilId: 7,
      perfilNombre: 'Jefe de Mesa de Entradas',
      perfilDescripcion: 'Supervisión de documentos',
      estado: true,
      fechaAsignacion: new Date('2024-02-05'),
      asignadoPor: 'admin',
      fechaActualizacion: new Date('2024-03-12')
    },
    {
      id: 8,
      sistemaId: 3,
      sistemaNombre: 'Sistema de Mesa de Entradas',
      perfilId: 8,
      perfilNombre: 'Operador de Documentación',
      perfilDescripcion: 'Gestión de expedientes',
      estado: true,
      fechaAsignacion: new Date('2024-02-06'),
      asignadoPor: 'admin'
    }
  ];

  constructor() { }

  /**
   * Obtiene todos los sistemas
   * ENDPOINT FUTURO: GET /api/sistemas
   */
  getSistemas(): Observable<Sistema[]> {
    return of(this.mockSistemas.filter(s => s.estado)).pipe(
      delay(300),
      map(sistemas => {
        console.log('Sistemas cargados:', sistemas);
        return sistemas;
      })
    );
  }

  /**
   * Obtiene todos los perfiles
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
   * Obtiene todas las asignaciones sistema-perfil
   * ENDPOINT FUTURO: GET /api/sistema-perfiles
   */
  getSistemaPerfiles(): Observable<SistemaPerfil[]> {
    return of(this.mockSistemaPerfiles.filter(sp => sp.estado)).pipe(
      delay(300),
      map(asignaciones => {
        console.log('Asignaciones sistema-perfil cargadas:', asignaciones);
        return asignaciones;
      })
    );
  }

  /**
   * Obtiene las asignaciones agrupadas por sistema
   * ENDPOINT FUTURO: GET /api/sistema-perfiles/agrupados
   */
  getSistemaPerfilesAgrupados(): Observable<SistemaPerfilAsignacion[]> {
    const agrupados = this.mockSistemaPerfiles
      .filter(sp => sp.estado)
      .reduce((acc, sp) => {
        if (!acc[sp.sistemaId]) {
          acc[sp.sistemaId] = {
            sistemaId: sp.sistemaId,
            sistemaNombre: sp.sistemaNombre,
            perfilesAsignados: []
          };
        }
        
        acc[sp.sistemaId].perfilesAsignados.push({
          perfilId: sp.perfilId,
          perfilNombre: sp.perfilNombre,
          perfilDescripcion: sp.perfilDescripcion,
          estado: sp.estado,
          fechaAsignacion: sp.fechaAsignacion
        });
        
        return acc;
      }, {} as { [key: number]: SistemaPerfilAsignacion });

    return of(Object.values(agrupados)).pipe(
      delay(300),
      map(agrupado => {
        console.log('Asignaciones agrupadas:', agrupado);
        return agrupado;
      })
    );
  }

  /**
   * Obtiene asignaciones por sistema ID
   * ENDPOINT FUTURO: GET /api/sistema-perfiles?sistemaId=:id
   */
  getPerfilesPorSistema(sistemaId: number): Observable<SistemaPerfil[]> {
    const asignaciones = this.mockSistemaPerfiles.filter(
      sp => sp.sistemaId === sistemaId && sp.estado
    );
    
    return of(asignaciones).pipe(
      delay(200),
      map(result => {
        console.log(`Perfiles para sistema ${sistemaId}:`, result);
        return result;
      })
    );
  }

  /**
   * Obtiene asignaciones por perfil ID
   * ENDPOINT FUTURO: GET /api/sistema-perfiles?perfilId=:id
   */
  getSistemasPorPerfil(perfilId: number): Observable<SistemaPerfil[]> {
    const asignaciones = this.mockSistemaPerfiles.filter(
      sp => sp.perfilId === perfilId && sp.estado
    );
    
    return of(asignaciones).pipe(
      delay(200),
      map(result => {
        console.log(`Sistemas para perfil ${perfilId}:`, result);
        return result;
      })
    );
  }

  /**
   * Crea nuevas asignaciones sistema-perfil
   * ENDPOINT FUTURO: POST /api/sistema-perfiles
   */
  createSistemaPerfil(request: CreateSistemaPerfilRequest): Observable<SistemaPerfil[]> {
    const nuevasAsignaciones: SistemaPerfil[] = request.perfilesIds.map(perfilId => {
      const sistema = this.mockSistemas.find(s => s.id === request.sistemaId);
      const perfil = this.mockPerfiles.find(p => p.id === perfilId);
      
      return {
        id: Math.max(...this.mockSistemaPerfiles.map(sp => sp.id)) + 1,
        sistemaId: request.sistemaId,
        sistemaNombre: sistema?.nombre || '',
        perfilId: perfilId,
        perfilNombre: perfil?.nombre || '',
        perfilDescripcion: perfil?.descripcion,
        estado: true,
        fechaAsignacion: new Date(),
        asignadoPor: 'admin'
      };
    });

    this.mockSistemaPerfiles.push(...nuevasAsignaciones);
    
    return of(nuevasAsignaciones).pipe(
      delay(300),
      map(result => {
        console.log('Asignaciones creadas:', result);
        return result;
      })
    );
  }

  /**
   * Actualiza asignaciones de un sistema
   * ENDPOINT FUTURO: PUT /api/sistema-perfiles/sistema/:sistemaId
   */
  updateSistemaPerfil(sistemaId: number, request: UpdateSistemaPerfilRequest): Observable<SistemaPerfil[]> {
    // Eliminar asignaciones existentes
    this.mockSistemaPerfiles = this.mockSistemaPerfiles.filter(
      sp => sp.sistemaId !== sistemaId
    );

    // Crear nuevas asignaciones
    return this.createSistemaPerfil({
      sistemaId,
      perfilesIds: request.perfilesIds
    });
  }

  /**
   * Elimina una asignación específica (desactivación)
   * ENDPOINT FUTURO: DELETE /api/sistema-perfiles/:id
   */
  deleteSistemaPerfil(id: number): Observable<void> {
    const index = this.mockSistemaPerfiles.findIndex(sp => sp.id === id);
    
    if (index === -1) {
      return throwError(() => new Error('Asignación no encontrada'));
    }
    
    this.mockSistemaPerfiles[index].estado = false;
    this.mockSistemaPerfiles[index].fechaActualizacion = new Date();
    
    return of(void 0).pipe(delay(300));
  }

  /**
   * Elimina todas las asignaciones de un sistema
   * ENDPOINT FUTURO: DELETE /api/sistema-perfiles/sistema/:sistemaId
   */
  deletePerfilesDeSistema(sistemaId: number): Observable<void> {
    this.mockSistemaPerfiles = this.mockSistemaPerfiles.map(sp => {
      if (sp.sistemaId === sistemaId) {
        return {
          ...sp,
          estado: false,
          fechaActualizacion: new Date()
        };
      }
      return sp;
    });
    
    return of(void 0).pipe(delay(300));
  }

  /**
   * Obtiene perfiles disponibles para un sistema (no asignados)
   * ENDPOINT FUTURO: GET /api/perfiles/disponibles?sistemaId=:id
   */
  getPerfilesDisponiblesParaSistema(sistemaId: number): Observable<Perfil[]> {
    const asignados = this.mockSistemaPerfiles
      .filter(sp => sp.sistemaId === sistemaId && sp.estado)
      .map(sp => sp.perfilId);
    
    const disponibles = this.mockPerfiles.filter(
      p => p.estado && !asignados.includes(p.id)
    );
    
    return of(disponibles).pipe(delay(200));
  }

  /**
   * Verifica si un perfil está asignado a un sistema
   * ENDPOINT FUTURO: GET /api/sistema-perfiles/verificar?sistemaId=:id&perfilId=:id
   */
  verificarAsignacion(sistemaId: number, perfilId: number): Observable<boolean> {
    const asignado = this.mockSistemaPerfiles.some(
      sp => sp.sistemaId === sistemaId && sp.perfilId === perfilId && sp.estado
    );
    
    return of(asignado).pipe(delay(100));
  }
}
