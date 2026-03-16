import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SystemKeyListComponent } from './components/system-key-list/system-key-list.component';
import { SystemKeyFormComponent } from './components/system-key-form/system-key-form.component';

@NgModule({
  declarations: [
    SystemKeyListComponent,
    SystemKeyFormComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
    SystemKeyListComponent,
    SystemKeyFormComponent
  ]
})
export class SystemKeysModule { }
