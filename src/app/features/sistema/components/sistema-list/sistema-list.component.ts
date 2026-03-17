import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SistemaService } from '../../services/sistema.service';
import { Sistema } from '../../models/sistema.model';

@Component({
  selector: 'app-sistema-list',
  templateUrl: './sistema-list.component.html',
  styleUrls: ['./sistema-list.component.scss']
})
export class SistemaListComponent implements OnInit {
  sistemas: Sistema[] = [];
  loading = false;
  error: string | null = null;

  // Configuración para menu-listado
  opciones = {
    titulo: 'Gestión de Sistemas',
    placeholder: 'Buscar sistema por nombre...',
    valorAbuscar: '',
    habilitarVisualizacion: false
  };

  columnasExtras = [
    { titulo: 'URL', campo: 'url', tipo: 'texto' as const, fallback: 'Sin URL' },
    { titulo: 'Observaciones', campo: 'observaciones', tipo: 'texto' as const, fallback: 'Sin observaciones' }
  ];

  botonesAccion = [
    { 
      nombre: 'Api key', 
      titulo: 'Ver API Key', 
      icono: 'bi bi-key', 
      clase: 'btn-outline-info' 
    }
  ];

  constructor(
    private sistemaService: SistemaService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadSistemas();
  }

  loadSistemas(): void {
    this.loading = true;
    this.error = null;
    
    this.sistemaService.getSistemas().subscribe({
      next: (data) => {
        // Mapear datos: invertir 'activo' porque menu-listado usa activo=true para deshabilitado
        // Backend: activo=true (habilitado), activo=false (deshabilitado)
        // Menu-listado: activo=true (deshabilitado/rojo), activo=false (habilitado/verde)
        this.sistemas = data
          .map(sistema => ({
            ...sistema,
            activo: !sistema.activo // Invertir la lógica
          }))
          .sort((a, b) => {
            // Ordenar: habilitados primero (activo=false en menu-listado)
            if (a.activo === b.activo) return 0;
            return a.activo ? 1 : -1;
          });
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Error al cargar los sistemas';
        this.loading = false;
        console.error(err);
      }
    });
  }

  // Event handlers para menu-listado
  onNuevo(valor: string): void {
    this.router.navigate(['/sistemas/formulario']);
  }

  onEditar(sistema: any): void {
    this.router.navigate(['/sistemas/formulario', sistema.idSistema]);
  }

  onActualizarEstado(sistema: any): void {
    const nuevoEstado = !sistema.activo;
    
    this.sistemaService.updateSistema({ ...sistema, activo: nuevoEstado }).subscribe({
      next: () => {
        this.loadSistemas();
      },
      error: (err: any) => {
        this.error = 'Error al actualizar el estado del sistema';
        console.error(err);
      }
    });
  }

  onAccionBoton(event: { accion: string; item: any }): void {
    if (event.accion === 'eliminar') {
      this.eliminarSistema(event.item.idSistema);
    }
  }

  onRefrescar(): void {
    this.loadSistemas();
  }

  eliminarSistema(idSistema: number): void {
    if (confirm('¿Está seguro de eliminar este sistema?')) {
      this.sistemaService.deleteSistema(idSistema).subscribe({
        next: () => {
          this.loadSistemas();
        },
        error: (err: any) => {
          this.error = 'Error al eliminar el sistema';
          console.error(err);
        }
      });
    }
  }
}
