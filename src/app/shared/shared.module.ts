import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { LoadingComponent } from './components/loading/loading.component';
import { EmptyStateComponent } from './components/empty-state/empty-state.component';
import { BackButtonComponent } from './components/back-button/back-button.component';
import { ToastComponent } from './components/toast/toast.component';
import { MenuListadoComponent } from './components/menu-listado/menu-listado.component';
import { BannerComponent } from './components/banner/banner.component';
import { TableComponent } from './components/table/table.component';
import { FormContainerComponent } from './components/form-container/form-container.component';
import { ToastService } from './services/toast.service';

@NgModule({
  declarations: [
    LoadingComponent,
    EmptyStateComponent,
    BackButtonComponent,
    ToastComponent,
    MenuListadoComponent,
    BannerComponent,
    TableComponent,
    FormContainerComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    NgbModule
  ],
  exports: [
    LoadingComponent,
    EmptyStateComponent,
    BackButtonComponent,
    ToastComponent,
    MenuListadoComponent,
    BannerComponent,
    TableComponent,
    FormContainerComponent,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    NgbModule
  ],
  providers: [
    ToastService
  ]
})
export class SharedModule { }
