export interface Perfil {
  id: number;
  nombre: string;
  descripcion?: string;
  sistemaId: number;
  sistemaNombre?: string;
  estado: boolean;
  fechaCreacion?: Date;
  fechaActualizacion?: Date;
}

export interface PerfilAsignado {
  perfilId: number;
  perfilNombre: string;
  sistemaId: number;
  sistemaNombre: string;
}
