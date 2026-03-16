export interface Sistema {
  id: number;
  nombre: string;
  descripcion?: string;
  estado: boolean;
  fechaCreacion?: Date;
  fechaActualizacion?: Date;
}
