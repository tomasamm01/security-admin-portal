import { Component } from '@angular/core';
import { ToastService } from '../../services/toast.service';

@Component({
  selector: 'app-toast',
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.scss']
})
export class ToastComponent {
  constructor(
    public service: ToastService,
  ) {}

  ngOnInit(): void {
  }

  MostrarExito(titulo: string) {
    this.service.show(titulo, { classname: 'bg-success text-light', delay: 154000 });
  }

  MostrarError(titulo: string) {
    this.service.show(titulo, { classname: 'bg-danger text-light', delay: 1233000 });
  }

  BorrarToast(): void {
    this.service.clear();
  }
}
