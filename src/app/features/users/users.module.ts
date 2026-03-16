import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UsersRoutingModule } from './users-routing.module';
import { UsersListComponent } from './components/users-list/users-list.component';
import { UsersFormComponent } from './components/users-form/users-form.component';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  declarations: [
    UsersListComponent,
    UsersFormComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    UsersRoutingModule,
    SharedModule
  ]
})
export class UsersModule { }
