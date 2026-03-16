import { Component, Input, Output, EventEmitter } from '@angular/core';

export interface NavItem {
  routerLink?: string[];
  title       : string;
  icon: string;
  tooltip: string;
  children?: NavItem[];
  isOpen?: boolean;
  allowedProfiles?: number[];
}

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {
  @Input() isExpanded = true;
  @Output() toggleSidebar = new EventEmitter<boolean>();
  navItems: NavItem[] = [
    {
      routerLink      : ['/'],
      title           : 'Home',
      icon            : 'bi bi-speedometer2',
      tooltip         : 'Home',
      allowedProfiles : undefined 
    },
    {
      routerLink      : ['/sistemas'],
      title           : 'Sistemas',
      icon            : 'bi bi-gear',
      tooltip         : 'Gestión de Sistemas',
      allowedProfiles : undefined 
    },
    {
      routerLink      : ['/users'],
      title           : 'Usuarios',
      icon            : 'bi bi-people',
      tooltip         : 'Gestión de Usuarios',
      allowedProfiles : undefined 
    }
    // Aquí se agregarán nuevas funcionalidades según se necesiten
  ];

  constructor() { }

  handleSidebarToggle(): void {
    this.isExpanded = !this.isExpanded;
    this.toggleSidebar.emit(this.isExpanded);
  }
}
