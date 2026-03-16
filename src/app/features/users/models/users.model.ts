export interface Users {
  id                ?: number;
  nombre            : string;
  email             : string;
  username          : string;
  password          ?: string;
  rol               : string;
  departamento      ?: string;
  telefono          ?: string;
  observaciones     ?: string;
  estado            : boolean;
  imagen            ?: any;
  fechaCreacion     ?: Date;
  fechaActualizacion?: Date;
  ultimoLogin       ?: Date;
}
