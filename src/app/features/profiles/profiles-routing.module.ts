import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProfileListComponent } from './components/profile-list/profile-list.component';
import { ProfileFormComponent } from './components/profile-form/profile-form.component';

const routes: Routes = [
  {
    path: '',
    component: ProfileListComponent
  },
  {
    path: 'formulario',
    component: ProfileFormComponent
  },
  {
    path: 'formulario/:id',
    component: ProfileFormComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProfilesRoutingModule { }
