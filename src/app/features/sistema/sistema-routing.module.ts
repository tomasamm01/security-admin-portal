import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SistemaListComponent } from './components/sistema-list/sistema-list.component';
import { SistemaFormComponent } from './components/sistema-form/sistema-form.component';

const routes: Routes = [
  {
    path: '',
    component: SistemaListComponent
  },
  {
    path: 'formulario',
    component: SistemaFormComponent
  },
  {
    path: 'formulario/:id',
    component: SistemaFormComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SistemaRoutingModule { }
