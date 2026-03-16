export interface SistemaPerfil {
  id: number;
  sistemaId: number;
  sistemaNombre: string;
  perfilId: number;
  perfilNombre: string;
  perfilDescripcion?: string;
  estado: boolean;
  fechaAsignacion: Date;
  asignadoPor?: string;
  fechaActualizacion?: Date;
  actualizadoPor?: string;
}

export interface SistemaPerfilAsignacion {
  sistemaId: number;
  sistemaNombre: string;
  perfilesAsignados: PerfilAsignado[];
}

export interface PerfilAsignado {
  perfilId: number;
  perfilNombre: string;
  perfilDescripcion?: string;
  estado: boolean;
  fechaAsignacion: Date;
}

export interface CreateSistemaPerfilRequest {
  sistemaId: number;
  perfilesIds: number[];
}

export interface UpdateSistemaPerfilRequest {
  sistemaId: number;
  perfilesIds: number[];
  estado?: boolean;
}

export interface Sistema {
  id: number;
  nombre: string;
  descripcion?: string;
  estado: boolean;
  fechaCreacion?: Date;
  fechaActualizacion?: Date;
}

export interface Perfil {
  id: number;
  nombre: string;
  descripcion?: string;
  sistemaId?: number;
  sistemaNombre?: string;
  estado: boolean;
  fechaCreacion?: Date;
  fechaActualizacion?: Date;
}
