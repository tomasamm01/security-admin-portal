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
      nombre: 'eliminar', 
      titulo: 'Eliminar', 
      icono: 'bi bi-trash', 
      clase: 'btn-outline-danger' 
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
        // Mapear datos al formato que espera menu-listado
        this.sistemas = data.map(sistema => ({
          ...sistema,
          activo: !sistema.estado // menu-listado usa 'activo' para indicar estado deshabilitado
        }));
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
    this.router.navigate(['/sistemas/formulario', sistema.id]);
  }

  onActualizarEstado(sistema: any): void {
    const nuevoEstado = !sistema.estado;
    
    this.sistemaService.updateSistema(sistema.id, { ...sistema, estado: nuevoEstado }).subscribe({
      next: () => {
        this.loadSistemas();
      },
      error: (err) => {
        this.error = 'Error al actualizar el estado del sistema';
        console.error(err);
      }
    });
  }

  onAccionBoton(event: { accion: string; item: any }): void {
    if (event.accion === 'eliminar') {
      this.eliminarSistema(event.item.id);
    }
  }

  onRefrescar(): void {
    this.loadSistemas();
  }

  eliminarSistema(id: number): void {
    if (confirm('¿Está seguro de eliminar este sistema?')) {
      this.sistemaService.deleteSistema(id).subscribe({
        next: () => {
          this.loadSistemas();
        },
        error: (err) => {
          this.error = 'Error al eliminar el sistema';
          console.error(err);
        }
      });
    }
  }
}
