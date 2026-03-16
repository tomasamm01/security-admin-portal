import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SystemProfileListComponent } from './components/system-profile-list/system-profile-list.component';
import { SystemProfileAssignComponent } from './components/system-profile-assign/system-profile-assign.component';

@NgModule({
  declarations: [
    SystemProfileListComponent,
    SystemProfileAssignComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
    SystemProfileListComponent,
    SystemProfileAssignComponent
  ]
})
export class SystemProfilesModule { }
