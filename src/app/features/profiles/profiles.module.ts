import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProfilesRoutingModule } from './profiles-routing.module';
import { ProfileListComponent } from './components/profile-list/profile-list.component';
import { ProfileFormComponent } from './components/profile-form/profile-form.component';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  declarations: [
    ProfileListComponent,
    ProfileFormComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ProfilesRoutingModule,
    SharedModule
  ]
})
export class ProfilesModule { }
