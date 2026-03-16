export interface SystemApiKey {
  id: number;
  name: string;
  description?: string;
  keyValue: string;
  keyType: SystemKeyType;
  permissions: SystemKeyPermission[];
  isActive: boolean;
  expiresAt?: Date;
  lastUsedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

export enum SystemKeyType {
  API_ACCESS = 'API_ACCESS',
  WEBHOOK = 'WEBHOOK',
  INTEGRATION = 'INTEGRATION',
  MOBILE_APP = 'MOBILE_APP',
  THIRD_PARTY = 'THIRD_PARTY'
}

export interface SystemKeyPermission {
  id: string;
  name: string;
  description: string;
  resource: string;
  actions: string[];
}

export interface CreateSystemApiKeyRequest {
  name: string;
  description?: string;
  keyType: SystemKeyType;
  permissions: string[];
  expiresAt?: Date;
}

export interface UpdateSystemApiKeyRequest {
  name?: string;
  description?: string;
  permissions?: string[];
  isActive?: boolean;
  expiresAt?: Date;
}

export interface SystemApiKeyUsage {
  id: number;
  apiKeyId: number;
  endpoint: string;
  method: string;
  ipAddress: string;
  userAgent?: string;
  timestamp: Date;
  success: boolean;
  errorMessage?: string;
}
