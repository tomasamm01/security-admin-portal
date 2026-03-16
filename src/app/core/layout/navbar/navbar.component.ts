import { Component } from '@angular/core';
import { environment } from 'src/environments/environment';

export interface Usuario {
  Nombre: string;
}

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  usuario: Usuario = { Nombre: 'Usuario Demo' };
  esProduccion = environment.production;

  constructor() {}

  ngOnInit(): void {
    
  }

  CambiarPerfil(perfil: string){
    console.log('Cambiando perfil a:', perfil);
  }

  CerrarSesion() {
    if(environment.production){
      location.href = '/login';
    }else{
      localStorage.removeItem("currentUser");
      location.reload()
    }
  }
}
