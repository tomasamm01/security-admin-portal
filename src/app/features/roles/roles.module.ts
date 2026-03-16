import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RoleSelectorComponent } from './components/role-selector/role-selector.component';

@NgModule({
  declarations: [
    RoleSelectorComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
    RoleSelectorComponent
  ]
})
export class RolesModule { }
