import { Component, OnInit, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { Observable, of, combineLatest } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { Sistema } from '../../models/sistema.model';
import { Perfil, PerfilAsignado } from '../../models/perfil.model';
import { SistemaService } from '../../services/sistema.service';
import { PerfilService } from '../../services/perfil.service';

@Component({
  selector: 'app-role-selector',
  templateUrl: './role-selector.component.html',
  styleUrls: ['./role-selector.component.scss']
})
export class RoleSelectorComponent implements OnInit, OnChanges {
  @Input() usuarioId?: number;
  @Input() perfilesAsignados: PerfilAsignado[] = [];
  @Output() perfilesChange = new EventEmitter<PerfilAsignado[]>();

  roleForm: FormGroup;
  sistemas: Sistema[] = [];
  perfilesDisponibles: Perfil[] = [];
  loading = false;
  
  // Para el autocomplete
  sistemasFiltrados$!: Observable<Sistema[]>;
  perfilesFiltrados$!: Observable<Perfil[]>;

  constructor(
    private fb: FormBuilder,
    private sistemaService: SistemaService,
    private perfilService: PerfilService
  ) {
    this.roleForm = this.fb.group({
      sistemaSeleccionado: ['', Validators.required],
      perfilSeleccionado: ['', Validators.required],
      perfilesAsignados: this.fb.array([])
    });
  }

  ngOnInit(): void {
    this.loadSistemas();
    this.setupAutocomplete();
    
    // Cargar perfiles asignados si hay un usuarioId
    if (this.usuarioId) {
      this.loadPerfilesAsignados();
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['perfilesAsignados'] && !changes['perfilesAsignados'].firstChange) {
      this.updatePerfilesAsignadosArray();
    }
  }

  // Getters para el FormArray
  get perfilesAsignadosArray(): FormArray {
    return this.roleForm.get('perfilesAsignados') as FormArray;
  }

  /**
   * Carga la lista de sistemas disponibles
   */
  private loadSistemas(): void {
    this.loading = true;
    this.sistemaService.getSistemas().subscribe({
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
   * Carga los perfiles asignados al usuario
   */
  private loadPerfilesAsignados(): void {
    if (!this.usuarioId) return;

    this.loading = true;
    this.perfilService.getPerfilesByUsuarioId(this.usuarioId).subscribe({
      next: (perfiles) => {
        this.perfilesAsignados = perfiles;
        this.updatePerfilesAsignadosArray();
        this.loading = false;
      },
      error: (err) => {
        console.error('Error al cargar perfiles asignados:', err);
        this.loading = false;
      }
    });
  }

  /**
   * Configura los filtros para autocomplete
   */
  private setupAutocomplete(): void {
    // Filtro para sistemas
    this.sistemasFiltrados$ = this.roleForm.get('sistemaSeleccionado')!.valueChanges.pipe(
      startWith(''),
      map(value => this.filterSistemas(value))
    );

    // Filtro para perfiles
    this.perfilesFiltrados$ = combineLatest([
      this.roleForm.get('perfilSeleccionado')!.valueChanges.pipe(startWith('')),
      of(this.perfilesDisponibles)
    ]).pipe(
      map(([searchText, perfiles]) => this.filterPerfiles(searchText, perfiles))
    );
  }

  /**
   * Maneja el cambio de sistema seleccionado
   */
  onSistemaChange(event: any): void {
    const sistemaId = +event.target.value;
    
    this.roleForm.get('sistemaSeleccionado')?.setValue(sistemaId);
    
    if (sistemaId) {
      this.loadPerfilesBySistema(sistemaId);
      // Limpiar selección de perfil
      this.roleForm.get('perfilSeleccionado')?.setValue('');
    } else {
      this.perfilesDisponibles = [];
    }
  }

  /**
   * Carga los perfiles disponibles para un sistema
   */
  private loadPerfilesBySistema(sistemaId: number): void {
    this.loading = true;
    this.perfilService.getPerfilesBySistemaId(sistemaId).subscribe({
      next: (perfiles) => {
        this.perfilesDisponibles = perfiles;
        this.loading = false;
      },
      error: (err) => {
        console.error('Error al cargar perfiles del sistema:', err);
        this.perfilesDisponibles = [];
        this.loading = false;
      }
    });
  }

  /**
   * Agrega un perfil a la lista de asignados
   */
  agregarPerfil(): void {
    const sistemaControl = this.roleForm.get('sistemaSeleccionado');
    const perfilControl = this.roleForm.get('perfilSeleccionado');

    const sistemaId = sistemaControl?.value;
    const perfilId = perfilControl?.value;

    if (!sistemaId || !perfilId) {
      return;
    }

    const sistema = this.sistemas.find(s => s.id === sistemaId);
    const perfil = this.perfilesDisponibles.find(p => p.id === perfilId);

    if (!sistema || !perfil) {
      return;
    }

    // Verificar que el perfil no esté ya asignado
    const yaAsignado = this.perfilesAsignados.some(p => p.perfilId === perfil.id);
    if (yaAsignado) {
      return;
    }

    const nuevoPerfilAsignado: PerfilAsignado = {
      perfilId: perfil.id,
      perfilNombre: perfil.nombre,
      sistemaId: sistema.id,
      sistemaNombre: sistema.nombre
    };

    this.perfilesAsignados.push(nuevoPerfilAsignado);
    this.updatePerfilesAsignadosArray();
    this.emitirCambios();

    // Limpiar formulario
    sistemaControl.setValue('');
    perfilControl.setValue('');
    this.perfilesDisponibles = [];
  }

  /**
   * Elimina un perfil asignado
   */
  eliminarPerfil(index: number): void {
    const perfilEliminado = this.perfilesAsignados[index];
    this.perfilesAsignados.splice(index, 1);
    this.updatePerfilesAsignadosArray();
    this.emitirCambios();

    // Si hay usuarioId, eliminar en backend
    if (this.usuarioId && perfilEliminado) {
      this.perfilService.eliminarPerfilDeUsuario(this.usuarioId, perfilEliminado.perfilId).subscribe({
        error: (err) => console.error('Error al eliminar perfil:', err)
      });
    }
  }

  /**
   * Actualiza el FormArray con los perfiles asignados
   */
  private updatePerfilesAsignadosArray(): void {
    this.perfilesAsignadosArray.clear();
    
    this.perfilesAsignados.forEach(perfil => {
      this.perfilesAsignadosArray.push(this.fb.group({
        perfilId: [perfil.perfilId],
        perfilNombre: [perfil.perfilNombre],
        sistemaId: [perfil.sistemaId],
        sistemaNombre: [perfil.sistemaNombre]
      }));
    });
  }

  /**
   * Emite los cambios de perfiles asignados
   */
  private emitirCambios(): void {
    this.perfilesChange.emit([...this.perfilesAsignados]);
  }

  /**
   * Filtra sistemas para autocomplete
   */
  private filterSistemas(value: string | Sistema | null): Sistema[] {
    if (!value) return this.sistemas;
    
    const filterValue = typeof value === 'string' ? value.toLowerCase() : value.nombre.toLowerCase();
    return this.sistemas.filter(sistema => 
      sistema.nombre.toLowerCase().includes(filterValue)
    );
  }

  /**
   * Filtra perfiles para autocomplete
   */
  private filterPerfiles(value: string | Perfil | null, perfiles: Perfil[]): Perfil[] {
    if (!value) return perfiles;
    
    const filterValue = typeof value === 'string' ? value.toLowerCase() : value.nombre.toLowerCase();
    return perfiles.filter(perfil => 
      perfil.nombre.toLowerCase().includes(filterValue)
    );
  }

  /**
   * Display function para autocomplete de sistemas
   */
  displaySistema(sistema: Sistema): string {
    return sistema ? sistema.nombre : '';
  }

  /**
   * Display function para autocomplete de perfiles
   */
  displayPerfil(perfil: Perfil): string {
    return perfil ? perfil.nombre : '';
  }

  /**
   * Guarda todos los perfiles asignados (para nuevo usuario)
   */
  guardarPerfiles(): void {
    if (!this.usuarioId || this.perfilesAsignados.length === 0) {
      return;
    }

    const perfilesParaAsignar = this.perfilesAsignados.map(p => ({ perfilId: p.perfilId }));
    
    this.perfilService.asignarPerfilesAUsuario(this.usuarioId, perfilesParaAsignar).subscribe({
      next: () => {
        console.log('Perfiles asignados exitosamente');
      },
      error: (err) => {
        console.error('Error al asignar perfiles:', err);
      }
    });
  }
}
