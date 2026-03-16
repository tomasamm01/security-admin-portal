import { Component, OnInit } from '@angular/core';
import { SystemApiKey, SystemKeyType } from '../../models/system-api-key.model';
import { SystemKeyService } from '../../services/system-key.service';

@Component({
  selector: 'app-system-key-list',
  templateUrl: './system-key-list.component.html',
  styleUrls: ['./system-key-list.component.scss']
})
export class SystemKeyListComponent implements OnInit {
  apiKeys: SystemApiKey[] = [];
  loading = false;
  displayedColumns: string[] = [
    'name',
    'keyType', 
    'permissions',
    'isActive',
    'lastUsedAt',
    'expiresAt',
    'actions'
  ];

  constructor(
    private systemKeyService: SystemKeyService
  ) {}

  ngOnInit(): void {
    this.loadApiKeys();
  }

  /**
   * Carga todas las API keys del sistema
   */
  loadApiKeys(): void {
    this.loading = true;
    this.systemKeyService.getSystemApiKeys().subscribe({
      next: (keys) => {
        this.apiKeys = keys;
        this.loading = false;
      },
      error: (err) => {
        console.error('Error al cargar API keys:', err);
        this.loading = false;
      }
    });
  }

  /**
   * Abre el diálogo para crear una nueva API key
   */
  createApiKey(): void {
    console.log('Función de crear API key - por implementar');
  }

  /**
   * Abre el diálogo para editar una API key existente
   */
  editApiKey(apiKey: SystemApiKey): void {
    console.log('Editar API key:', apiKey);
  }

  /**
   * Muestra los detalles de una API key
   */
  viewApiKey(apiKey: SystemApiKey): void {
    console.log('Ver detalles de API key:', apiKey);
    alert(`Detalles de ${apiKey.name}:\n${apiKey.description || 'Sin descripción'}\nTipo: ${this.getKeyTypeLabel(apiKey.keyType)}\nPermisos: ${this.getPermissionsNames(apiKey)}`);
  }

  /**
   * Desactiva una API key
   */
  deactivateApiKey(apiKey: SystemApiKey): void {
    if (confirm(`¿Está seguro de desactivar la API Key "${apiKey.name}"?`)) {
      this.systemKeyService.updateSystemApiKey(apiKey.id, { isActive: false }).subscribe({
        next: () => {
          this.loadApiKeys();
          console.log('API Key desactivada');
          alert('API Key desactivada');
        },
        error: (err) => {
          console.error('Error al desactivar API key:', err);
          alert('Error al desactivar la API Key');
        }
      });
    }
  }

  /**
   * Reactiva una API key
   */
  activateApiKey(apiKey: SystemApiKey): void {
    this.systemKeyService.updateSystemApiKey(apiKey.id, { isActive: true }).subscribe({
      next: () => {
        this.loadApiKeys();
        console.log('API Key reactivada');
        alert('API Key reactivada');
      },
      error: (err) => {
        console.error('Error al reactivar API key:', err);
        alert('Error al reactivar la API Key');
      }
    });
  }

  /**
   * Revoca completamente una API key
   */
  revokeApiKey(apiKey: SystemApiKey): void {
    if (confirm(`¿Está seguro de revocar permanentemente la API Key "${apiKey.name}"? Esta acción no se puede deshacer.`)) {
      this.systemKeyService.revokeSystemApiKey(apiKey.id).subscribe({
        next: () => {
          this.loadApiKeys();
          console.log('API Key revocada');
          alert('API Key revocada permanentemente');
        },
        error: (err) => {
          console.error('Error al revocar API key:', err);
          alert('Error al revocar la API Key');
        }
      });
    }
  }

  /**
   * Regenera el valor de una API key
   */
  regenerateApiKey(apiKey: SystemApiKey): void {
    if (confirm(`¿Está seguro de regenerar la API Key "${apiKey.name}"? La key actual dejará de funcionar.`)) {
      this.systemKeyService.regenerateSystemApiKey(apiKey.id).subscribe({
        next: (result) => {
          console.log('API Key regenerada:', result.keyValue);
          alert('API Key regenerada. Nueva key: ' + result.keyValue);
          this.loadApiKeys();
        },
        error: (err) => {
          console.error('Error al regenerar API key:', err);
          alert('Error al regenerar la API Key');
        }
      });
    }
  }

  /**
   * Obtiene el label del tipo de API key
   */
  getKeyTypeLabel(keyType: SystemKeyType): string {
    const types = this.systemKeyService.getSystemKeyTypes();
    const type = types.find(t => t.value === keyType);
    return type ? type.label : keyType;
  }

  /**
   * Verifica si una API key está expirada
   */
  isExpired(apiKey: SystemApiKey): boolean {
    if (!apiKey.expiresAt) return false;
    return new Date() > apiKey.expiresAt;
  }

  /**
   * Formatea la fecha de último uso
   */
  formatLastUsed(date?: Date): string {
    if (!date) return 'Nunca';
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const hours = Math.floor(diff / (1000 * 60 * 60));
    
    if (hours < 1) return 'Hace menos de 1 hora';
    if (hours < 24) return `Hace ${hours} horas`;
    
    const days = Math.floor(hours / 24);
    if (days < 30) return `Hace ${days} días`;
    
    return date.toLocaleDateString();
  }

  /**
   * Formatea una fecha
   */
  formatDate(date: Date): string {
    return date.toLocaleDateString();
  }

  /**
   * Copia la API key al portapapeles
   */
  copyToClipboard(apiKey: SystemApiKey): void {
    navigator.clipboard.writeText(apiKey.keyValue).then(() => {
      console.log('API Key copiada');
      alert('API Key copiada al portapapeles');
    }).catch(err => {
      console.error('Error al copiar:', err);
      alert('Error al copiar la API Key');
    });
  }

  /**
   * Obtiene los nombres de permisos formateados
   */
  getPermissionsNames(apiKey: SystemApiKey): string {
    return apiKey.permissions.map(p => p.name).join(', ');
  }

  /**
   * Verifica si una API key puede ser regenerada
   */
  canRegenerate(apiKey: SystemApiKey): boolean {
    return apiKey.isActive && !this.isExpired(apiKey);
  }
}
