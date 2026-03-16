import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { 
  SystemApiKey, 
  SystemKeyType, 
  SystemKeyPermission,
  CreateSystemApiKeyRequest,
  UpdateSystemApiKeyRequest 
} from '../../models/system-api-key.model';
import { SystemKeyService } from '../../services/system-key.service';

@Component({
  selector: 'app-system-key-form',
  templateUrl: './system-key-form.component.html',
  styleUrls: ['./system-key-form.component.scss']
})
export class SystemKeyFormComponent implements OnInit {
  apiKeyForm: FormGroup;
  availablePermissions: SystemKeyPermission[] = [];
  keyTypes: { value: SystemKeyType; label: string }[] = [];
  loading = false;
  generatedKey?: string;

  // Data passed from parent (for modal/dialog usage)
  mode: 'create' | 'edit' | 'view' = 'create';
  apiKey?: SystemApiKey;

  constructor(
    private fb: FormBuilder,
    private systemKeyService: SystemKeyService
  ) {
    this.apiKeyForm = this.createForm();
  }

  ngOnInit(): void {
    this.loadAvailableData();
    
    if (this.mode === 'edit' && this.apiKey) {
      this.populateForm(this.apiKey);
    }
    
    if (this.mode === 'view' && this.apiKey) {
      this.populateForm(this.apiKey);
      this.apiKeyForm.disable();
    }
  }

  /**
   * Carga los datos disponibles (permisos, tipos)
   */
  private loadAvailableData(): void {
    this.systemKeyService.getAvailablePermissions().subscribe(permissions => {
      this.availablePermissions = permissions;
    });

    this.keyTypes = this.systemKeyService.getSystemKeyTypes();
  }

  /**
   * Crea el formulario reactivo
   */
  private createForm(): FormGroup {
    return this.fb.group({
      name: ['', [Validators.required, Validators.maxLength(100)]],
      description: ['', Validators.maxLength(255)],
      keyType: [SystemKeyType.API_ACCESS, Validators.required],
      permissions: this.fb.array([], Validators.required),
      expiresAt: [null],
      isActive: [true]
    });
  }

  /**
   * Obtiene el FormArray de permisos
   */
  get permissionsArray(): FormArray {
    return this.apiKeyForm.get('permissions') as FormArray;
  }

  /**
   * Maneja el cambio de un permiso
   */
  onPermissionChange(permissionId: string, event: Event): void {
    const target = event.target as HTMLInputElement;
    const checked = target?.checked || false;
    
    if (checked) {
      this.permissionsArray.push(this.fb.control(permissionId));
    } else {
      const index = this.permissionsArray.value.indexOf(permissionId);
      if (index > -1) {
        this.permissionsArray.removeAt(index);
      }
    }
  }

  /**
   * Verifica si un permiso está seleccionado
   */
  isPermissionSelected(permissionId: string): boolean {
    return this.permissionsArray.value.includes(permissionId);
  }

  /**
   * Pobla el formulario con datos de una API key existente
   */
  private populateForm(apiKey: SystemApiKey): void {
    this.apiKeyForm.patchValue({
      name: apiKey.name,
      description: apiKey.description,
      keyType: apiKey.keyType,
      expiresAt: apiKey.expiresAt,
      isActive: apiKey.isActive
    });

    // Limpiar y agregar permisos
    this.permissionsArray.clear();
    apiKey.permissions.forEach(permission => {
      this.permissionsArray.push(this.fb.control(permission.id));
    });
  }

  /**
   * Genera una nueva API key
   */
  generateApiKey(): void {
    const keyType = this.apiKeyForm.get('keyType')?.value;
    if (keyType) {
      this.generatedKey = this.systemKeyService.generateApiKey(keyType);
    }
  }

  /**
   * Envía el formulario
   */
  onSubmit(): void {
    if (this.apiKeyForm.invalid) {
      this.markFormAsTouched();
      return;
    }

    this.loading = true;
    const formValue = this.apiKeyForm.value;

    if (this.mode === 'create') {
      this.createApiKey(formValue);
    } else if (this.mode === 'edit' && this.apiKey) {
      this.updateApiKey(this.apiKey.id, formValue);
    }
  }

  /**
   * Crea una nueva API key
   */
  private createApiKey(formValue: any): void {
    const request: CreateSystemApiKeyRequest = {
      name: formValue.name,
      description: formValue.description,
      keyType: formValue.keyType,
      permissions: formValue.permissions,
      expiresAt: formValue.expiresAt
    };

    this.systemKeyService.createSystemApiKey(request).subscribe({
      next: (apiKey) => {
        this.loading = false;
        console.log('API Key creada:', apiKey);
        alert('API Key creada exitosamente');
        this.resetForm();
      },
      error: (err) => {
        this.loading = false;
        console.error('Error al crear API key:', err);
        alert('Error al crear la API Key');
      }
    });
  }

  /**
   * Actualiza una API key existente
   */
  private updateApiKey(id: number, formValue: any): void {
    const request: UpdateSystemApiKeyRequest = {
      name: formValue.name,
      description: formValue.description,
      permissions: formValue.permissions,
      isActive: formValue.isActive,
      expiresAt: formValue.expiresAt
    };

    this.systemKeyService.updateSystemApiKey(id, request).subscribe({
      next: (apiKey) => {
        this.loading = false;
        console.log('API Key actualizada:', apiKey);
        alert('API Key actualizada exitosamente');
      },
      error: (err) => {
        this.loading = false;
        console.error('Error al actualizar API key:', err);
        alert('Error al actualizar la API Key');
      }
    });
  }

  /**
   * Resetea el formulario
   */
  resetForm(): void {
    this.apiKeyForm.reset();
    this.permissionsArray.clear();
    this.generatedKey = undefined;
  }

  /**
   * Marca todos los campos como touched para mostrar errores
   */
  private markFormAsTouched(): void {
    Object.values(this.apiKeyForm.controls).forEach(control => {
      control.markAsTouched();
    });
  }

  /**
   * Cancela la operación
   */
  onCancel(): void {
    console.log('Operación cancelada');
    // TODO: Implementar cierre de modal/dialog
  }

  /**
   * Obtiene el label del tipo de API key
   */
  getKeyTypeLabel(keyType: SystemKeyType): string {
    const type = this.keyTypes.find(t => t.value === keyType);
    return type ? type.label : keyType;
  }

  /**
   * Verifica si el formulario es válido
   */
  get isFormValid(): boolean {
    return this.apiKeyForm.valid && this.permissionsArray.length > 0;
  }

  /**
   * Obtiene mensaje de error para un campo
   */
  getFieldError(fieldName: string): string {
    const field = this.apiKeyForm.get(fieldName);
    if (field?.errors && field.touched) {
      if (field.errors['required']) return 'Este campo es requerido';
      if (field.errors['maxlength']) return 'Longitud máxima excedida';
    }
    return '';
  }

  /**
   * Agrupa permisos por recurso
   */
  getPermissionsByResourceObject(): any {
    return this.availablePermissions.reduce((groups, permission) => {
      const resource = permission.resource;
      if (!groups[resource]) {
        groups[resource] = [];
      }
      groups[resource].push(permission);
      return groups;
    }, {});
  }
}
