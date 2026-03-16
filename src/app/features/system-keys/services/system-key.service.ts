import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { delay, map } from 'rxjs/operators';
import { 
  SystemApiKey, 
  SystemKeyType, 
  SystemKeyPermission, 
  SystemApiKeyUsage,
  CreateSystemApiKeyRequest,
  UpdateSystemApiKeyRequest 
} from '../models/system-api-key.model';

@Injectable({
  providedIn: 'root'
})
export class SystemKeyService {
  
  private mockApiKeys: SystemApiKey[] = [
    {
      id: 1,
      name: 'API Principal Sistema',
      description: 'API key para acceso principal al sistema',
      keyValue: 'sk_live_51H2j3K...abc123',
      keyType: SystemKeyType.API_ACCESS,
      permissions: [
        {
          id: 'read_all',
          name: 'Leer todos los recursos',
          description: 'Acceso de lectura a todos los endpoints',
          resource: '*',
          actions: ['GET']
        },
        {
          id: 'write_users',
          name: 'Gestionar usuarios',
          description: 'Crear y actualizar usuarios',
          resource: '/users',
          actions: ['POST', 'PUT']
        }
      ],
      isActive: true,
      lastUsedAt: new Date('2024-03-15T10:30:00'),
      createdAt: new Date('2024-01-10'),
      updatedAt: new Date('2024-03-15')
    },
    {
      id: 2,
      name: 'Webhook External Service',
      description: 'Key para webhook de servicio externo',
      keyValue: 'wh_sec_1a2b3c...def456',
      keyType: SystemKeyType.WEBHOOK,
      permissions: [
        {
          id: 'webhook_access',
          name: 'Acceso Webhook',
          description: 'Acceso exclusivo para endpoints de webhook',
          resource: '/webhooks',
          actions: ['POST']
        }
      ],
      isActive: true,
      lastUsedAt: new Date('2024-03-16T14:22:00'),
      createdAt: new Date('2024-02-15'),
      updatedAt: new Date('2024-03-16')
    },
    {
      id: 3,
      name: 'Mobile App Integration',
      description: 'API key para aplicación móvil',
      keyValue: 'mob_app_789xyz...ghi789',
      keyType: SystemKeyType.MOBILE_APP,
      permissions: [
        {
          id: 'mobile_read',
          name: 'Lectura Móvil',
          description: 'Acceso de lectura para app móvil',
          resource: '/mobile/*',
          actions: ['GET']
        },
        {
          id: 'mobile_profile',
          name: 'Gestión Perfil Móvil',
          description: 'Actualizar perfil desde app móvil',
          resource: '/mobile/profile',
          actions: ['PUT']
        }
      ],
      isActive: true,
      expiresAt: new Date('2024-12-31'),
      lastUsedAt: new Date('2024-03-16T09:15:00'),
      createdAt: new Date('2024-03-01'),
      updatedAt: new Date('2024-03-16')
    }
  ];

  private mockPermissions: SystemKeyPermission[] = [
    {
      id: 'read_all',
      name: 'Leer todos los recursos',
      description: 'Acceso de lectura a todos los endpoints',
      resource: '*',
      actions: ['GET']
    },
    {
      id: 'write_all',
      name: 'Escribir todos los recursos',
      description: 'Acceso de escritura a todos los endpoints',
      resource: '*',
      actions: ['POST', 'PUT', 'DELETE']
    },
    {
      id: 'write_users',
      name: 'Gestionar usuarios',
      description: 'Crear y actualizar usuarios',
      resource: '/users',
      actions: ['POST', 'PUT']
    },
    {
      id: 'read_users',
      name: 'Leer usuarios',
      description: 'Acceso de lectura a usuarios',
      resource: '/users',
      actions: ['GET']
    },
    {
      id: 'webhook_access',
      name: 'Acceso Webhook',
      description: 'Acceso exclusivo para endpoints de webhook',
      resource: '/webhooks',
      actions: ['POST']
    },
    {
      id: 'mobile_read',
      name: 'Lectura Móvil',
      description: 'Acceso de lectura para app móvil',
      resource: '/mobile/*',
      actions: ['GET']
    },
    {
      id: 'mobile_profile',
      name: 'Gestión Perfil Móvil',
      description: 'Actualizar perfil desde app móvil',
      resource: '/mobile/profile',
      actions: ['PUT']
    },
    {
      id: 'admin_full',
      name: 'Acceso Administrativo Completo',
      description: 'Acceso completo a todas las funciones administrativas',
      resource: '/admin/*',
      actions: ['GET', 'POST', 'PUT', 'DELETE']
    }
  ];

  constructor() { }

  /**
   * Obtiene todas las API keys del sistema
   * ENDPOINT FUTURO: GET /api/system-keys
   */
  getSystemApiKeys(): Observable<SystemApiKey[]> {
    return of(this.mockApiKeys).pipe(
      delay(300),
      map(keys => {
        console.log('API Keys del sistema cargadas:', keys);
        return keys;
      })
    );
  }

  /**
   * Obtiene una API key por ID
   * ENDPOINT FUTURO: GET /api/system-keys/:id
   */
  getSystemApiKeyById(id: number): Observable<SystemApiKey> {
    const apiKey = this.mockApiKeys.find(k => k.id === id);
    
    if (apiKey) {
      return of(apiKey).pipe(delay(200));
    } else {
      return throwError(() => new Error('API Key no encontrada'));
    }
  }

  /**
   * Crea una nueva API key del sistema
   * ENDPOINT FUTURO: POST /api/system-keys
   */
  createSystemApiKey(request: CreateSystemApiKeyRequest): Observable<SystemApiKey> {
    const newApiKey: SystemApiKey = {
      id: Math.max(...this.mockApiKeys.map(k => k.id)) + 1,
      name: request.name,
      description: request.description,
      keyValue: this.generateApiKey(request.keyType),
      keyType: request.keyType,
      permissions: this.mockPermissions.filter(p => request.permissions.includes(p.id)),
      isActive: true,
      expiresAt: request.expiresAt,
      createdAt: new Date(),
      updatedAt: new Date()
    };
    
    this.mockApiKeys.push(newApiKey);
    return of(newApiKey).pipe(delay(300));
  }

  /**
   * Actualiza una API key existente
   * ENDPOINT FUTURO: PUT /api/system-keys/:id
   */
  updateSystemApiKey(id: number, request: UpdateSystemApiKeyRequest): Observable<SystemApiKey> {
    const index = this.mockApiKeys.findIndex(k => k.id === id);
    
    if (index === -1) {
      return throwError(() => new Error('API Key no encontrada'));
    }
    
    const updatedKey: SystemApiKey = {
      ...this.mockApiKeys[index],
      ...request,
      permissions: request.permissions 
        ? this.mockPermissions.filter(p => request.permissions!.includes(p.id))
        : this.mockApiKeys[index].permissions,
      updatedAt: new Date()
    };
    
    this.mockApiKeys[index] = updatedKey;
    return of(updatedKey).pipe(delay(300));
  }

  /**
   * Elimina una API key (desactivación)
   * ENDPOINT FUTURO: DELETE /api/system-keys/:id
   */
  deleteSystemApiKey(id: number): Observable<void> {
    const index = this.mockApiKeys.findIndex(k => k.id === id);
    
    if (index === -1) {
      return throwError(() => new Error('API Key no encontrada'));
    }
    
    this.mockApiKeys[index].isActive = false;
    this.mockApiKeys[index].updatedAt = new Date();
    
    return of(void 0).pipe(delay(300));
  }

  /**
   * Revoca una API key (eliminación permanente)
   * ENDPOINT FUTURO: DELETE /api/system-keys/:id/revoke
   */
  revokeSystemApiKey(id: number): Observable<void> {
    const index = this.mockApiKeys.findIndex(k => k.id === id);
    
    if (index === -1) {
      return throwError(() => new Error('API Key no encontrada'));
    }
    
    this.mockApiKeys.splice(index, 1);
    return of(void 0).pipe(delay(300));
  }

  /**
   * Regenera el valor de una API key
   * ENDPOINT FUTURO: POST /api/system-keys/:id/regenerate
   */
  regenerateSystemApiKey(id: number): Observable<{ keyValue: string }> {
    const apiKey = this.mockApiKeys.find(k => k.id === id);
    
    if (!apiKey) {
      return throwError(() => new Error('API Key no encontrada'));
    }
    
    const newKeyValue = this.generateApiKey(apiKey.keyType);
    apiKey.keyValue = newKeyValue;
    apiKey.updatedAt = new Date();
    
    return of({ keyValue: newKeyValue }).pipe(delay(300));
  }

  /**
   * Obtiene los permisos disponibles
   * ENDPOINT FUTURO: GET /api/system-keys/permissions
   */
  getAvailablePermissions(): Observable<SystemKeyPermission[]> {
    return of(this.mockPermissions).pipe(delay(200));
  }

  /**
   * Obtiene el uso de una API key
   * ENDPOINT FUTURO: GET /api/system-keys/:id/usage
   */
  getSystemApiKeyUsage(id: number): Observable<SystemApiKeyUsage[]> {
    const mockUsage: SystemApiKeyUsage[] = [
      {
        id: 1,
        apiKeyId: id,
        endpoint: '/api/users',
        method: 'GET',
        ipAddress: '192.168.1.100',
        userAgent: 'Mozilla/5.0...',
        timestamp: new Date('2024-03-16T10:30:00'),
        success: true
      },
      {
        id: 2,
        apiKeyId: id,
        endpoint: '/api/users/123',
        method: 'PUT',
        ipAddress: '192.168.1.100',
        userAgent: 'axios/0.21.1',
        timestamp: new Date('2024-03-16T10:32:00'),
        success: true
      }
    ];
    
    return of(mockUsage).pipe(delay(200));
  }

  /**
   * Genera una API key según el tipo
   */
  generateApiKey(keyType: SystemKeyType): string {
    const prefixes = {
      [SystemKeyType.API_ACCESS]: 'sk_live_',
      [SystemKeyType.WEBHOOK]: 'wh_sec_',
      [SystemKeyType.INTEGRATION]: 'int_',
      [SystemKeyType.MOBILE_APP]: 'mob_app_',
      [SystemKeyType.THIRD_PARTY]: 'tp_'
    };
    
    const prefix = prefixes[keyType];
    const randomPart = Math.random().toString(36).substring(2, 15) + 
                      Math.random().toString(36).substring(2, 15);
    
    return prefix + randomPart;
  }

  /**
   * Obtiene los tipos de API keys disponibles
   */
  getSystemKeyTypes(): { value: SystemKeyType; label: string }[] {
    return [
      { value: SystemKeyType.API_ACCESS, label: 'Acceso API' },
      { value: SystemKeyType.WEBHOOK, label: 'Webhook' },
      { value: SystemKeyType.INTEGRATION, label: 'Integración' },
      { value: SystemKeyType.MOBILE_APP, label: 'App Móvil' },
      { value: SystemKeyType.THIRD_PARTY, label: 'Terceros' }
    ];
  }
}
