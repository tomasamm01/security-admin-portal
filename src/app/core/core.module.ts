import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HeaderComponent } from './layout/header/header.component';
import { SidebarComponent } from './layout/sidebar/sidebar.component';
import { NavbarComponent } from './layout/navbar/navbar.component';
import { FooterComponent } from './layout/footer/footer.component';
import { ConfirmModalComponent } from './components/modals/confirm-modal/confirm-modal.component';
import { ErrorModalComponent } from './components/modals/error-modal/error-modal.component';
import { SessionExpiredModalComponent } from './components/modals/session-expired-modal/session-expired-modal.component';
import { ModalComponent } from './components/modal/modal.component';
import { ThemeToggleComponent } from './components/theme-toggle/theme-toggle.component';
import { SidebarNavModule } from './layout/sidebar/sidebar-nav/sidebar-nav.module';

@NgModule({
  declarations: [
    HeaderComponent,
    SidebarComponent,
    NavbarComponent,
    FooterComponent,
    ConfirmModalComponent,
    ErrorModalComponent,
    SessionExpiredModalComponent,
    ModalComponent,
    ThemeToggleComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    SidebarNavModule
  ],
  exports: [
    HeaderComponent,
    SidebarComponent,
    NavbarComponent,
    FooterComponent,
    ConfirmModalComponent,
    ErrorModalComponent,
    SessionExpiredModalComponent,
    ModalComponent,
    ThemeToggleComponent,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule
  ],
  providers: []
})
export class CoreModule {
  constructor() {}
}
