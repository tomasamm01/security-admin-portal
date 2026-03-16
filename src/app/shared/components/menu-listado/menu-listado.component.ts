import { Component, OnInit, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { ToastService } from '../../services/toast.service';

@Component({
  selector: 'app-menu-listado',
  templateUrl: './menu-listado.component.html',
  styleUrls: ['./menu-listado.component.scss']
})
export class MenuListadoComponent implements OnInit, OnChanges {
  
  @Input("opciones") opciones : any;
  @Input("datos")    datos    : any;
  @Input("cargando") cargando : boolean = false;
  @Input("isLoading") isLoading : boolean = false;
  @Input() loading: boolean = false;
  @Input() error: string | null = null;
  @Input() columnasExtras: Array<{ titulo: string; campo: string | string[]; tipo?: 'texto' | 'fecha'; formato?: string; fallback?: string; }> = [];

  page                                         = 1;
  pageSize                                     = 5;
  collectionSize                               = 0;
  // Informacion
  informacion                : any;
  @Input()  refresh          : boolean         = false;
  @Output() refrescar                          = new  EventEmitter<boolean>();
  form: FormGroup = new FormGroup({
    filtrar: new FormControl('')
  });
  @Output("nuevo") nuevo                       = new EventEmitter<any>();
  @Output("editar") editar                     = new EventEmitter<any>();
  @Output("actualizarEstado") actualizarEstado = new EventEmitter<any>();
  @Output("visualizar") visualizar             = new EventEmitter<any>();
  @Input() botonesAccion: Array<{ nombre: string; titulo: string; icono: string; clase?: string }> = [];
  @Output("accionBoton") accionBoton             = new EventEmitter<{ accion: string; item: any }>();

  constructor(
    private formBuilder : FormBuilder, public toast : ToastService
  ) {
    
  }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      filtrar : [this.opciones.valorAbuscar]
    })

    this.collectionSize = this.datos ? this.datos.length : 0;
    this.RefrescarCambio();
    this.refreshTable();
    // this.ObtenerInfo();
  }

  // MANEJO DEL FILTRO Y SU ELIMINACION
  Filtrar(buscar =""){
    if (!this.datos) return;
    
    var busqueda = (buscar == "") ? this.form.value.filtrar : buscar;
    var filtros = this.datos.filter( ( item: any ) => (item.nombre.toLowerCase()).startsWith(busqueda.toLowerCase()) == true);
    this.informacion = filtros.map((country :any, i: number) => ({ id: i + 1, ...country })).slice(
      (this.page - 1) * this.pageSize,
      (this.page - 1) * this.pageSize + this.pageSize,
    );
    this.collectionSize = (filtros).length
  }

  BorrarFiltro(){
    this.form.patchValue({
      filtrar : ""
    });
    this.collectionSize = this.datos ? this.datos.length : 0;
    this.RefrescarCambio();
    this.refreshTable();
  }

  refreshTable() {
    if (!this.datos) {
      this.informacion = [];
      return;
    }
    
    var busqueda = this.form.value.filtrar;
    if(busqueda == ""){
      this.informacion = this.datos.map((country :any, i: number) => ({ id: i + 1, ...country })).slice(
        (this.page - 1) * this.pageSize,
        (this.page - 1) * this.pageSize + this.pageSize,
      );
    }else{
      this.Filtrar(busqueda);
    }
  	
  }
  
  ngOnChanges(changes: SimpleChanges): void {
    // Detectar cuando los datos cambian y actualizar la tabla
    if (changes['datos'] && !changes['datos'].firstChange) {
      this.collectionSize = this.datos ? this.datos.length : 0;
      this.refreshTable();
    }
  }
  
  RefrescarCambio(){
    if(!this.refresh){
      this.refrescar.emit(true)
    }else{
      this.refresh = false;
    }
  }
  
  // OPERACIONES DEL COMPONENTE
  Insertar(){
    var valorAvalidar : string = this.form.value.filtrar.trim();
    
    // Permitir crear aunque el campo esté vacío
    // if(!valorAvalidar){
    //   return;
    // }
    
    // Si el campo está vacío, crear con valor vacío
    if(!valorAvalidar){
      this.nuevo.emit("");
      this.form.patchValue({
        filtrar : ""
      });
      this.BorrarFiltro();
      return;
    }
    
    // Verificar si el elemento ya existe (solo si hay texto)
    var valido = this.ValidarInformacion(valorAvalidar);
    
    if(valido){
      // El elemento no existe, se puede crear uno nuevo
      this.nuevo.emit(valorAvalidar);
      
      // Limpiar el campo después de crear
      this.form.patchValue({
        filtrar : ""
      });
      
      // Refrescar la tabla para mostrar el nuevo elemento
      this.BorrarFiltro();
    }else{
      // El elemento ya existe, mostrar mensaje
      this.toast.show("El elemento ya existe en la lista",{classname: "bg-warning text-light fixed-bottom d-flex fixed-bottom justify-content-center w-100"});
    }
  }
  Editar(datos : any){
    this.editar.emit(datos);
  }
  ActualizarEstado(item : any){
    // console.log(item)
    this.actualizarEstado.emit(item)
  }
  Visualizar(id: any){
    this.visualizar.emit(id);
  }
  EjecutarAccion(nombre: string, item: any): void {
    this.accionBoton.emit({ accion: nombre, item });
  }
  get mostrarVisualizarLegacy(): boolean {
    return this.opciones?.habilitarVisualizacion && !this.botonesAccion.some(b => b.nombre === 'visualizar');
  }
  // VALIDACIONES
  ValidarInformacion(valorAbuscar: any){
    var respuesta : Boolean = false; // Cambiado a false, significa que NO existe
    var filtro = this.datos.filter((item : any) => {
      return item.nombre.trim().toLowerCase() === valorAbuscar.toLowerCase();
    });
    if(filtro.length > 0){
      respuesta = true; // Si encuentra coincidencias, significa que SÍ existe
    }
    return !respuesta; // Devuelve true si NO existe (puede crear), false si SÍ existe
  }

  obtenerValorColumna(item: any, columna: { campo: string | string[]; tipo?: 'texto' | 'fecha'; formato?: string; fallback?: string; }): string {
    if (!item || !columna?.campo) {
      return columna?.fallback ?? '-';
    }

    const valor = this.obtenerPrimeraCoincidencia(item, columna.campo);
    if (valor === undefined || valor === null || valor === '') {
      return columna?.fallback ?? '-';
    }

    if (columna.tipo === 'fecha') {
      return this.formatearFecha(valor, columna.formato);
    }

    return valor;
  }

  private extraerValor(item: any, campo: string): any {
    return campo.split('.').reduce((acc: any, key: string) => (acc ? acc[key] : undefined), item);
  }

  private obtenerPrimeraCoincidencia(item: any, campo: string | string[]): any {
    const campos = Array.isArray(campo) ? campo : [campo];

    for (const ruta of campos) {
      const valor = this.extraerValor(item, ruta);
      if (valor !== undefined && valor !== null && valor !== '') {
        return valor;
      }
    }

    return undefined;
  }

  private formatearFecha(valor: any, formato = 'yyyy-MM-dd'): string {
    if (!valor) {
      return '-';
    }

    const fecha = new Date(valor);
    if (!isNaN(fecha.getTime())) {
      return fecha.toISOString().substring(0, 10);
    }

    if (typeof valor === 'string' && valor.includes('T')) {
      return valor.split('T')[0];
    }

    return valor;
  }
}
