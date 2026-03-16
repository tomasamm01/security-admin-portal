export interface Sistema {
  id                ?: number;
  nombre            : string;
  url               ?: string;
  observaciones     ?: string;
  estado            : boolean;
  desktop           : boolean;
  ownPassword       : boolean;
  intranet          : boolean;
  imagen            ?: any;
  fechaCreacion     ?: Date;
  fechaActualizacion?: Date;
}
