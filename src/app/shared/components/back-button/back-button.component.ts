import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-back-button',
  templateUrl: './back-button.component.html',
  styleUrls: ['./back-button.component.scss']
})
export class BackButtonComponent {
  @Input() perfil: string | null = null;
  @Input() ruta: string = 'home';

  constructor() { }
}
