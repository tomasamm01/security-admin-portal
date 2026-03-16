import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { SistemaService } from '../../services/sistema.service';
import { Sistema } from '../../models/sistema.model';

@Component({
  selector: 'app-sistema-form',
  templateUrl: './sistema-form.component.html',
  styleUrls: ['./sistema-form.component.scss']
})
export class SistemaFormComponent implements OnInit {
  sistemaForm: FormGroup;
  idSistema: number | null = null;
  loading = false;
  error: string | null = null;
  imagenPreview: string | null = null;

  constructor(
    private fb: FormBuilder,
    private sistemaService: SistemaService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.sistemaForm = this.fb.group({
      nombre: ['', [Validators.required]],
      url: ['', [Validators.required, Validators.pattern('https?://.+')]],
      observaciones: [''],
      estado: [true],
      desktop: [false],
      ownPassword: [false],
      intranet: [false],
      imagen: ['']
    });
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.idSistema = +id;
      this.loadSistema();
    }
  }

  loadSistema(): void {
    if (!this.idSistema) return;

    this.loading = true;
    this.error = null;

    this.sistemaService.getSistemaById(this.idSistema).subscribe({
      next: (sistema) => {
        this.sistemaForm.patchValue(sistema);
        this.imagenPreview = sistema.imagen || null;
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Error al cargar el sistema';
        this.loading = false;
        console.error(err);
      }
    });
  }

  onSubmit(): void {
    if (this.sistemaForm.invalid) {
      this.sistemaForm.markAllAsTouched();
      return;
    }

    this.loading = true;
    this.error = null;

    const sistema: Sistema = this.sistemaForm.value;
    
    // Agregar ID si es actualización
    if (this.idSistema) {
      sistema.id = this.idSistema;
    }

    const operation = this.idSistema
      ? this.sistemaService.updateSistema(sistema)
      : this.sistemaService.createSistema(sistema);

    operation.subscribe({
      next: () => {
        this.router.navigate(['/sistemas']);
      },
      error: (err) => {
        this.error = `Error al ${this.idSistema ? 'actualizar' : 'crear'} el sistema`;
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
