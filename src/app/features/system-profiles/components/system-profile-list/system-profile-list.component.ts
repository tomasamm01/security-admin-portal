import { Component, OnInit } from '@angular/core';
import { SistemaPerfilAsignacion, SistemaPerfil } from '../../models/sistema-perfil.model';
import { SistemaPerfilService } from '../../services/sistema-perfil.service';

@Component({
  selector: 'app-system-profile-list',
  templateUrl: './system-profile-list.component.html',
  styleUrls: ['./system-profile-list.component.scss']
})
export class SystemProfileListComponent implements OnInit {
  asignaciones: SistemaPerfilAsignacion[] = [];
  loading = false;
  displayedColumns: string[] = [
    'sistemaNombre',
    'perfilesAsignados',
    'cantidadPerfiles',
    'fechaUltimaActualizacion',
    'acciones'
  ];

  constructor(
    private sistemaPerfilService: SistemaPerfilService
  ) {}

  ngOnInit(): void {
    this.loadAsignaciones();
  }

  /**
   * Carga todas las asignaciones sistema-perfil
   */
  loadAsignaciones(): void {
    this.loading = true;
    this.sistemaPerfilService.getSistemaPerfilesAgrupados().subscribe({
      next: (asignaciones) => {
        this.asignaciones = asignaciones;
        this.loading = false;
        console.log('Asignaciones cargadas:', asignaciones);
      },
      error: (err) => {
        console.error('Error al cargar asignaciones:', err);
        this.loading = false;
      }
    });
  }

  /**
   * Navega a la página de asignación de perfiles
   */
  asignarPerfiles(sistema: SistemaPerfilAsignacion): void {
    console.log('Asignar perfiles al sistema:', sistema);
    // TODO: Implementar navegación o modal para asignación
    alert(`Función para asignar perfiles al sistema: ${sistema.sistemaNombre}`);
  }

  /**
   * Ver detalles de las asignaciones de un sistema
   */
  verDetalles(sistema: SistemaPerfilAsignacion): void {
    console.log('Ver detalles del sistema:', sistema);
    
    const detalles = `
Sistema: ${sistema.sistemaNombre}
Perfiles asignados: ${sistema.perfilesAsignados.length}

${sistema.perfilesAsignados.map(p => `- ${p.perfilNombre}: ${p.perfilDescripcion || 'Sin descripción'}`).join('\n')}
    `.trim();
    
    alert(detalles);
  }

  /**
   * Elimina todas las asignaciones de un sistema
   */
  eliminarAsignaciones(sistema: SistemaPerfilAsignacion): void {
    if (confirm(`¿Está seguro de eliminar todas las asignaciones del sistema "${sistema.sistemaNombre}"? Esta acción no se puede deshacer.`)) {
      this.sistemaPerfilService.deletePerfilesDeSistema(sistema.sistemaId).subscribe({
        next: () => {
          this.loadAsignaciones();
          console.log('Asignaciones eliminadas');
          alert('Asignaciones eliminadas exitosamente');
        },
        error: (err) => {
          console.error('Error al eliminar asignaciones:', err);
          alert('Error al eliminar las asignaciones');
        }
      });
    }
  }

  /**
   * Obtiene la fecha de última actualización de los perfiles de un sistema
   */
  getFechaUltimaActualizacion(sistema: SistemaPerfilAsignacion): string {
    if (sistema.perfilesAsignados.length === 0) return 'N/A';
    
    const fechas = sistema.perfilesAsignados.map(p => p.fechaAsignacion);
    const ultimaFecha = new Date(Math.max(...fechas.map(f => f.getTime())));
    
    return this.formatDate(ultimaFecha);
  }

  /**
   * Formatea una fecha
   */
  formatDate(date: Date): string {
    return date.toLocaleDateString();
  }

  /**
   * Obtiene los nombres de los perfiles formateados
   */
  getPerfilesNombres(sistema: SistemaPerfilAsignacion): string {
    if (sistema.perfilesAsignados.length === 0) return 'Sin perfiles asignados';
    
    const nombres = sistema.perfilesAsignados.map(p => p.perfilNombre);
    
    if (nombres.length <= 2) {
      return nombres.join(', ');
    }
    
    return `${nombres.slice(0, 2).join(', ')} y ${nombres.length - 2} más`;
  }

  /**
   * Obtiene el estado de un sistema basado en sus asignaciones
   */
  getEstadoSistema(sistema: SistemaPerfilAsignacion): string {
    if (sistema.perfilesAsignados.length === 0) {
      return 'Sin asignaciones';
    }
    
    if (sistema.perfilesAsignados.length === 1) {
      return '1 perfil';
    }
    
    return `${sistema.perfilesAsignados.length} perfiles`;
  }

  /**
   * Verifica si un sistema tiene asignaciones
   */
  tieneAsignaciones(sistema: SistemaPerfilAsignacion): boolean {
    return sistema.perfilesAsignados.length > 0;
  }

  /**
   * Obtiene el color del badge según la cantidad de perfiles
   */
  getBadgeColor(cantidad: number): string {
    if (cantidad === 0) return 'bg-secondary';
    if (cantidad <= 2) return 'bg-info';
    if (cantidad <= 5) return 'bg-primary';
    return 'bg-success';
  }

  /**
   * Exporta las asignaciones a un formato visual
   */
  exportarAsignaciones(): void {
    console.log('Exportando asignaciones...');
    
    const exportData = this.asignaciones.map(sistema => ({
      Sistema: sistema.sistemaNombre,
      'Cantidad de Perfiles': sistema.perfilesAsignados.length,
      'Perfiles Asignados': sistema.perfilesAsignados.map(p => p.perfilNombre).join(', '),
      'Última Actualización': this.getFechaUltimaActualizacion(sistema)
    }));
    
    console.log('Datos para exportar:', exportData);
    alert('Función de exportación - ver consola para datos');
  }

  /**
   * Filtra asignaciones por texto
   */
  filtrarAsignaciones(texto: string): void {
    if (!texto) {
      this.loadAsignaciones();
      return;
    }

    this.sistemaPerfilService.getSistemaPerfilesAgrupados().subscribe({
      next: (asignaciones) => {
        this.asignaciones = asignaciones.filter(sistema => 
          sistema.sistemaNombre.toLowerCase().includes(texto.toLowerCase()) ||
          sistema.perfilesAsignados.some(p => 
            p.perfilNombre.toLowerCase().includes(texto.toLowerCase())
          )
        );
      },
      error: (err) => {
        console.error('Error al filtrar asignaciones:', err);
      }
    });
  }

  /**
   * Obtiene estadísticas generales
   */
  getEstadisticas(): {
    totalSistemas: number;
    totalAsignaciones: number;
    sistemasConAsignaciones: number;
    sistemasSinAsignaciones: number;
  } {
    const totalSistemas = this.asignaciones.length;
    const totalAsignaciones = this.asignaciones.reduce(
      (total, sistema) => total + sistema.perfilesAsignados.length, 0
    );
    const sistemasConAsignaciones = this.asignaciones.filter(
      sistema => sistema.perfilesAsignados.length > 0
    ).length;
    const sistemasSinAsignaciones = totalSistemas - sistemasConAsignaciones;

    return {
      totalSistemas,
      totalAsignaciones,
      sistemasConAsignaciones,
      sistemasSinAsignaciones
    };
  }
}
