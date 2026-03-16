import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  sidebarExpanded = true;
  isValid = true; // Simulación de autenticación
  perfil = 'ADMINISTRADOR'; // Perfil por defecto
}
