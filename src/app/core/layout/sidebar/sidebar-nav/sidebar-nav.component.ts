import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-sidebar-nav',
  templateUrl: './sidebar-nav.component.html',
  styleUrls: ['./sidebar-nav.component.scss']
})
export class SidebarNavComponent {
  @Input() navItems: any[] = [];
  
  hasPermission(item: any): boolean {
    return true; // Simplificado para el demo
  }
  
  toggleDropdown(item: any): void {
    item.isOpen = !item.isOpen;
  }
}
