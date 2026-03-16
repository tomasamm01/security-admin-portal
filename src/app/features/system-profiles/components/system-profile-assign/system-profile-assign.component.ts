import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { 
  Sistema, 
  Perfil, 
  SistemaPerfil, 
  SistemaPerfilAsignacion,
  CreateSistemaPerfilRequest 
} from '../../models/sistema-perfil.model';
import { SistemaPerfilService } from '../../services/sistema-perfil.service';

@Component({
  selector: 'app-system-profile-assign',
  templateUrl: './system-profile-assign.component.html',
  styleUrls: ['./system-profile-assign.component.scss']
})
export class SystemProfileAssignComponent implements OnInit {
  assignForm: FormGroup;
  sistemas: Sistema[] = [];
  perfiles: Perfil[] = [];
  perfilesDisponibles: Perfil[] = [];
  perfilesAsignados: SistemaPerfil[] = [];
  loading = false;
  modoEdicion = false;
  sistemaSeleccionado?: Sistema;

  constructor(
    private fb: FormBuilder,
    private sistemaPerfilService: SistemaPerfilService
  ) {
    this.assignForm = this.createForm();
  }

  ngOnInit(): void {
    this.loadSistemas();
    this.loadPerfiles();
  }

  /**
   * Crea el formulario reactivo
   */
  private createForm(): FormGroup {
    return this.fb.group({
      sistemaSeleccionado: ['', Validators.required],
      perfilesSeleccionados: this.fb.array([], Validators.required)
    });
  }

  /**
   * Obtiene el FormArray de perfiles seleccionados
   */
  get perfilesSeleccionadosArray(): FormArray {
    return this.assignForm.get('perfilesSeleccionados') as FormArray;
  }

  /**
   * Carga la lista de sistemas disponibles
   */
  private loadSistemas(): void {
    this.loading = true;
    this.sistemaPerfilService.getSistemas().subscribe({
      next: (sistemas) => {
        this.sistemas = sistemas;
        this.loading = false;
      },
      error: (err) => {
        console.error('Error al cargar sistemas:', err);
        this.loading = false;
      }
    });
  }

  /**
   * Carga la lista de perfiles disponibles
   */
  private loadPerfiles(): void {
    this.sistemaPerfilService.getPerfiles().subscribe({
      next: (perfiles) => {
        this.perfiles = perfiles;
      },
      error: (err) => {
        console.error('Error al cargar perfiles:', err);
      }
    });
  }

  /**
   * Maneja el cambio de sistema seleccionado
   */
  onSistemaChange(event: any): void {
    const sistemaId = +event.target.value;
    
    if (sistemaId) {
      this.sistemaSeleccionado = this.sistemas.find(s => s.id === sistemaId);
      this.loadPerfilesAsignados(sistemaId);
      this.loadPerfilesDisponibles(sistemaId);
    } else {
      this.limpiarSeleccion();
    }
  }

  /**
   * Carga los perfiles ya asignados al sistema
   */
  private loadPerfilesAsignados(sistemaId: number): void {
    this.loading = true;
    this.sistemaPerfilService.getPerfilesPorSistema(sistemaId).subscribe({
      next: (asignados) => {
        this.perfilesAsignados = asignados;
        this.actualizarPerfilesSeleccionados();
        this.loading = false;
      },
      error: (err) => {
        console.error('Error al cargar perfiles asignados:', err);
        this.loading = false;
      }
    });
  }

  /**
   * Carga los perfiles disponibles para asignar al sistema
   */
  private loadPerfilesDisponibles(sistemaId: number): void {
    this.sistemaPerfilService.getPerfilesDisponiblesParaSistema(sistemaId).subscribe({
      next: (disponibles) => {
        this.perfilesDisponibles = disponibles;
      },
      error: (err) => {
        console.error('Error al cargar perfiles disponibles:', err);
        this.perfilesDisponibles = [];
      }
    });
  }

  /**
   * Actualiza el FormArray con los perfiles ya asignados
   */
  private actualizarPerfilesSeleccionados(): void {
    this.perfilesSeleccionadosArray.clear();
    
    this.perfilesAsignados.forEach(asignado => {
      this.perfilesSeleccionadosArray.push(
        this.fb.control(asignado.perfilId)
      );
    });
  }

  /**
   * Maneja el cambio de un perfil
   */
  onPerfilChange(perfilId: number, checked: boolean): void {
    if (checked) {
      this.perfilesSeleccionadosArray.push(this.fb.control(perfilId));
    } else {
      const index = this.perfilesSeleccionadosArray.value.indexOf(perfilId);
      if (index > -1) {
        this.perfilesSeleccionadosArray.removeAt(index);
      }
    }
  }

  /**
   * Verifica si un perfil está seleccionado
   */
  isPerfilSeleccionado(perfilId: number): boolean {
    return this.perfilesSeleccionadosArray.value.includes(perfilId);
  }

  /**
   * Verifica si un perfil está actualmente asignado
   */
  isPerfilAsignado(perfilId: number): boolean {
    return this.perfilesAsignados.some(p => p.perfilId === perfilId);
  }

  /**
   * Limpia la selección actual
   */
  limpiarSeleccion(): void {
    this.sistemaSeleccionado = undefined;
    this.perfilesAsignados = [];
    this.perfilesDisponibles = [];
    this.perfilesSeleccionadosArray.clear();
    this.assignForm.get('sistemaSeleccionado')?.setValue('');
    this.modoEdicion = false;
  }

  /**
   * Guarda las asignaciones
   */
  guardarAsignaciones(): void {
    if (this.assignForm.invalid || !this.sistemaSeleccionado) {
      this.marcarFormularioComoTocado();
      return;
    }

    this.loading = true;
    const perfilesIds = this.perfilesSeleccionadosArray.value;

    const request: CreateSistemaPerfilRequest = {
      sistemaId: this.sistemaSeleccionado.id,
      perfilesIds: perfilesIds
    };

    this.sistemaPerfilService.updateSistemaPerfil(
      this.sistemaSeleccionado.id, 
      { sistemaId: this.sistemaSeleccionado.id, perfilesIds }
    ).subscribe({
      next: () => {
        this.loading = false;
        console.log('Asignaciones guardadas exitosamente');
        alert('Perfiles asignados exitosamente');
        this.loadPerfilesAsignados(this.sistemaSeleccionado!.id);
        this.loadPerfilesDisponibles(this.sistemaSeleccionado!.id);
      },
      error: (err) => {
        this.loading = false;
        console.error('Error al guardar asignaciones:', err);
        alert('Error al asignar los perfiles');
      }
    });
  }

  /**
   * Elimina una asignación específica
   */
  eliminarAsignacion(asignacion: SistemaPerfil): void {
    if (confirm(`¿Está seguro de eliminar la asignación del perfil "${asignacion.perfilNombre}"?`)) {
      this.sistemaPerfilService.deleteSistemaPerfil(asignacion.id).subscribe({
        next: () => {
          this.loadPerfilesAsignados(asignacion.sistemaId);
          this.loadPerfilesDisponibles(asignacion.sistemaId);
          console.log('Asignación eliminada');
          alert('Asignación eliminada exitosamente');
        },
        error: (err) => {
          console.error('Error al eliminar asignación:', err);
          alert('Error al eliminar la asignación');
        }
      });
    }
  }

  /**
   * Marca todos los campos como touched para mostrar errores
   */
  private marcarFormularioComoTocado(): void {
    Object.values(this.assignForm.controls).forEach(control => {
      control.markAsTouched();
    });
  }

  /**
   * Obtiene mensaje de error para un campo
   */
  getFieldError(fieldName: string): string {
    const field = this.assignForm.get(fieldName);
    if (field?.errors && field.touched) {
      if (field.errors['required']) return 'Este campo es requerido';
    }
    return '';
  }

  /**
   * Verifica si el formulario es válido
   */
  get isFormValid(): boolean {
    return this.assignForm.valid && this.perfilesSeleccionadosArray.length > 0;
  }

  /**
   * Obtiene estadísticas de asignación
   */
  getEstadisticasAsignacion(): {
    totalAsignados: number;
    totalDisponibles: number;
    totalPerfiles: number;
    porcentajeAsignado: number;
  } {
    const totalAsignados = this.perfilesAsignados.length;
    const totalDisponibles = this.perfilesDisponibles.length;
    const totalPerfiles = this.perfiles.length;
    const porcentajeAsignado = totalPerfiles > 0 ? (totalAsignados / totalPerfiles) * 100 : 0;

    return {
      totalAsignados,
      totalDisponibles,
      totalPerfiles,
      porcentajeAsignado
    };
  }

  /**
   * Selecciona todos los perfiles disponibles
   */
  seleccionarTodos(): void {
    this.perfilesDisponibles.forEach(perfil => {
      if (!this.isPerfilSeleccionado(perfil.id)) {
        this.perfilesSeleccionadosArray.push(this.fb.control(perfil.id));
      }
    });
  }

  /**
   * Deselecciona todos los perfiles
   */
  deseleccionarTodos(): void {
    this.perfilesSeleccionadosArray.clear();
  }

  /**
   * Cancela la operación
   */
  cancelar(): void {
    if (this.perfilesSeleccionadosArray.value.length > 0) {
      if (confirm('¿Hay cambios sin guardar. ¿Está seguro de cancelar?')) {
        this.limpiarSeleccion();
      }
    } else {
      this.limpiarSeleccion();
    }
  }

  /**
   * Filtra perfiles por texto
   */
  filtrarPerfiles(texto: string): void {
    if (!texto) {
      this.loadPerfilesDisponibles(this.sistemaSeleccionado?.id || 0);
      return;
    }

    this.sistemaPerfilService.getPerfilesDisponiblesParaSistema(
      this.sistemaSeleccionado?.id || 0
    ).subscribe({
      next: (disponibles) => {
        this.perfilesDisponibles = disponibles.filter(perfil =>
          perfil.nombre.toLowerCase().includes(texto.toLowerCase()) ||
          (perfil.descripcion?.toLowerCase().includes(texto.toLowerCase()) || false)
        );
      },
      error: (err) => {
        console.error('Error al filtrar perfiles:', err);
      }
    });
  }

  /**
   * Obtiene el color del badge según el porcentaje de asignación
   */
  getBadgeColor(porcentaje: number): string {
    if (porcentaje === 0) return 'bg-danger';
    if (porcentaje < 25) return 'bg-warning';
    if (porcentaje < 75) return 'bg-info';
    return 'bg-success';
  }
}
