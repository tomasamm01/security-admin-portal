export interface Sistema {
  idSistema         ?: number;
  nombre            : string;
  activo            : boolean;
  userLog           ?: string;
  fechaLog          ?: Date;
  fechaAlta         ?: Date;
  observaciones     ?: string;
  intranet          ?: boolean;
  url               ?: string;
  ownPassword       ?: boolean;
  desktop           ?: boolean;
}


/*

    public class Sistema
    {
        [Key]
        [Column("idSistema")]
        public int idSistema { get; set; }

        [Column("nombre")]
        public string nombre { get; set; }

        [Column("activo")]
        [DefaultValue(1)]
        public Boolean activo { get; set; }

        [Column("userLog")]
        public string userLog { get; set; }

        [Column("fechaLog")]
        public DateTime? fechaLog { get; set; }

        [Column("fechaAlta")]
        public DateTime? fechaAlta { get; set; }

        [Column("observaciones")]
        public string observaciones { get; set; }

        [Column("intranet")]
        [DefaultValue(0)]
        public Boolean? intranet { get; set; }

        [Column("url")]
        public string url { get; set; }


        [Column("ownPassword")]
        [DefaultValue(0)]
        public Boolean? ownPassword { get; set; }

        [Column("desktop")]
        [DefaultValue(0)]
        public Boolean? desktop { get; set; }
    }

*/