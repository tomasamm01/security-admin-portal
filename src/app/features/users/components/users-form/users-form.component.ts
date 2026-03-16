import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { UsersService } from '../../services/users.service';
import { Users } from '../../models/users.model';

@Component({
  selector: 'app-user-form',
  templateUrl: './users-form.component.html',
  styleUrls: ['./users-form.component.scss']
})
export class UsersFormComponent implements OnInit {
  usersForm: FormGroup;
  idUser: number | null = null;
  loading = false;
  error: string | null = null;
  imagenPreview: string | null = null;

  roles = ['ADMINISTRADOR', 'TESORERIA', 'MESA DE ENTRADAS', 'USUARIO'];
  departamentos = ['SISTEMAS', 'TESORERIA', 'MESA DE ENTRADAS', 'ADMINISTRACION', 'RRHH'];

  constructor(
    private fb: FormBuilder,
    private usersService: UsersService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.usersForm = this.fb.group({
      nombre: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      username: ['', [Validators.required]],
      password: [''],
      rol: ['', [Validators.required]],
      departamento: [''],
      telefono: ['', [Validators.pattern('^[0-9]{6,15}$')]],
      observaciones: [''],
      estado: [true],
      imagen: ['']
    });
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.idUser = +id;
      this.loadUser();
    }
  }

  loadUser(): void {
    if (!this.idUser) return;

    this.loading = true;
    this.error = null;

    this.usersService.getUserById(this.idUser).subscribe({
      next: (user) => {
        this.usersForm.patchValue(user);
        this.imagenPreview = user.imagen || null;
        this.loading = false;
        // No mostrar contraseña en modo edición
        this.usersForm.get('password')?.setValue('');
      },
      error: (err) => {
        this.error = 'Error al cargar el usuario';
        this.loading = false;
        console.error(err);
      }
    });
  }

  onSubmit(): void {
    if (this.usersForm.invalid) {
      this.usersForm.markAllAsTouched();
      return;
    }

    this.loading = true;
    this.error = null;

    const user: Users = this.usersForm.value;
    
    // No enviar contraseña si está vacía en modo edición
    if (this.idUser && !user.password) {
      delete user.password;
    }

    const operation = this.idUser
      ? this.usersService.updateUser(this.idUser, user)
      : this.usersService.createUser(user);

    operation.subscribe({
      next: () => {
        this.router.navigate(['/users']);
      },
      error: (err) => {
        this.error = `Error al ${this.idUser ? 'actualizar' : 'crear'} el usuario`;
        this.loading = false;
        console.error(err);
      }
    });
  }

  onFileChange(event: any): void {
    // El usuario agregará el manejo de archivos aquí
    console.log('Archivo seleccionado:', event.target.files[0]);
  }
}
