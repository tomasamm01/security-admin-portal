import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsersService } from '../../services/users.service';
import { Users } from '../../models/users.model';

@Component({
  selector: 'app-user-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss']
})
export class UsersListComponent implements OnInit {
  users: Users[] = [];
  loading = false;
  error: string | null = null;

  // Configuración para menu-listado
  opciones = {
    titulo: 'Gestión de Usuarios',
    placeholder: 'Buscar usuario por nombre...',
    valorAbuscar: '',
    habilitarVisualizacion: false
  };

  columnasExtras = [
    { titulo: 'Email', campo: 'email', tipo: 'texto' as const, fallback: 'Sin email' },
    { titulo: 'Rol', campo: 'rol', tipo: 'texto' as const, fallback: 'Sin rol' },
    { titulo: 'Departamento', campo: 'departamento', tipo: 'texto' as const, fallback: 'Sin departamento' }
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
    private usersService: UsersService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(): void {
    this.loading = true;
    this.error = null;
    
    this.usersService.getUsers().subscribe({
      next: (data) => {
        // Mapear datos al formato que espera menu-listado
        this.users = data.map(user => ({
          ...user,
          activo: !user.estado // menu-listado usa 'activo' para indicar estado deshabilitado
        }));
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Error al cargar los usuarios';
        this.loading = false;
        console.error(err);
      }
    });
  }

  // Event handlers para menu-listado
  onNuevo(valor: string): void {
    this.router.navigate(['/users/formulario']);
  }

  onEditar(user: any): void {
    this.router.navigate(['/users/formulario', user.id]);
  }

  onActualizarEstado(user: any): void {
    const nuevoEstado = !user.estado;
    
    this.usersService.updateUser(user.id, { ...user, estado: nuevoEstado }).subscribe({
      next: () => {
        this.loadUsers();
      },
      error: (err) => {
        this.error = 'Error al actualizar el estado del usuario';
        console.error(err);
      }
    });
  }

  onAccionBoton(event: { accion: string; item: any }): void {
    if (event.accion === 'eliminar') {
      this.eliminarUser(event.item.id);
    }
  }

  onRefrescar(): void {
    this.loadUsers();
  }

  eliminarUser(id: number): void {
    if (confirm('¿Está seguro de eliminar este usuario?')) {
      this.usersService.deleteUser(id).subscribe({
        next: () => {
          this.loadUsers();
        },
        error: (err) => {
          this.error = 'Error al eliminar el usuario';
          console.error(err);
        }
      });
    }
  }
}
