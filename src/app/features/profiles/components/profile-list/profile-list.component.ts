import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProfileService } from '../../services/profile.service';
import { Profile } from '../../models/profile.model';

@Component({
  selector: 'app-profile-list',
  templateUrl: './profile-list.component.html',
  styleUrls: ['./profile-list.component.scss']
})
export class ProfileListComponent implements OnInit {
  profiles: Profile[] = [];
  loading = false;
  error: string | null = null;

  opciones = {
    titulo: 'Gestión de Perfiles',
    placeholder: 'Buscar perfil por nombre...',
    valorAbuscar: '',
    habilitarVisualizacion: false
  };

  columnasExtras = [
    { titulo: 'Descripción', campo: 'descripcion', tipo: 'texto' as const, fallback: 'Sin descripción' }
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
    private profileService: ProfileService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadProfiles();
  }

  loadProfiles(): void {
    this.loading = true;
    this.error = null;
    
    this.profileService.getProfiles().subscribe({
      next: (data) => {
        this.profiles = data
          .map(profile => ({
            ...profile,
            nombre: profile.nombrePerfil,
            activo: !profile.activo
          }))
          .sort((a, b) => {
            if (a.activo === b.activo) return 0;
            return a.activo ? 1 : -1;
          });
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Error al cargar los perfiles';
        this.loading = false;
        console.error(err);
      }
    });
  }

  onNuevo(valor: string): void {
    this.router.navigate(['/perfiles/formulario']);
  }

  onEditar(profile: any): void {
    this.router.navigate(['/perfiles/formulario', profile.idProfile]);
  }

  onActualizarEstado(profile: any): void {
    const nuevoEstado = !profile.activo;
    
    this.profileService.updateProfile({ ...profile, activo: nuevoEstado }).subscribe({
      next: () => {
        this.loadProfiles();
      },
      error: (err: any) => {
        this.error = 'Error al actualizar el estado del perfil';
        console.error(err);
      }
    });
  }

  onAccionBoton(event: { accion: string; item: any }): void {
    if (event.accion === 'eliminar') {
      this.eliminarProfile(event.item.idProfile);
    }
  }

  onRefrescar(): void {
    this.loadProfiles();
  }

  eliminarProfile(idProfile: number): void {
    if (confirm('¿Está seguro de eliminar este perfil?')) {
      this.profileService.deleteProfile(idProfile).subscribe({
        next: () => {
          this.loadProfiles();
        },
        error: (err: any) => {
          this.error = 'Error al eliminar el perfil';
          console.error(err);
        }
      });
    }
  }
}
