import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-form-container',
  templateUrl: './form-container.component.html',
  styleUrls: ['./form-container.component.scss']
})
export class FormContainerComponent {
  @Input() title: string = '';
  @Input() isEdit: boolean = false;
  @Input() cargando: boolean = false;
  @Input() form: any;
  @Input() backRoute: string = '';
  @Input() submitText?: string;
  @Input() ocultarBoton: boolean = false;

  @Output() submit = new EventEmitter<void>();

  getSubmitText(): string {
    if (this.submitText) {
      return this.submitText;
    }
    return this.isEdit ? 'Actualizar' : 'Guardar';
  }

  getTitle(): string {
    if (this.title) {
      return this.title;
    }
    return this.isEdit ? 'Editar' : 'Nuevo';
  }

  onConfirm() {
    this.submit.emit();
  }
}
