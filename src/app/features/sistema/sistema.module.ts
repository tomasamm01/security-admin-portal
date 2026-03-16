import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SistemaRoutingModule } from './sistema-routing.module';
import { SistemaListComponent } from './components/sistema-list/sistema-list.component';
import { SistemaFormComponent } from './components/sistema-form/sistema-form.component';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  declarations: [
    SistemaListComponent,
    SistemaFormComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SistemaRoutingModule,
    SharedModule
  ]
})
export class SistemaModule { }
