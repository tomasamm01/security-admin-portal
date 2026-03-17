import { Component, OnInit } from '@angular/core';
import { ThemeService, Theme } from '../../services/theme.service';

@Component({
  selector: 'app-theme-toggle',
  templateUrl: './theme-toggle.component.html',
  styleUrls: ['./theme-toggle.component.scss']
})
export class ThemeToggleComponent implements OnInit {
  currentTheme: Theme = 'light';
  isDarkMode = false;

  constructor(private themeService: ThemeService) {}

  ngOnInit(): void {
    this.themeService.watchSystemTheme();
    this.updateTheme();
  }

  /**
   * Alterna entre temas claro y oscuro
   */
  toggleTheme(): void {
    this.themeService.toggleTheme();
    this.updateTheme();
  }

  /**
   * Actualiza el estado local del tema
   */
  private updateTheme(): void {
    this.currentTheme = this.themeService.getCurrentTheme();
    this.isDarkMode = this.themeService.isDarkTheme();
  }

  /**
   * Obtiene el ícono según el tema actual
   */
  getThemeIcon(): string {
    return this.isDarkMode ? 'bi-sun-fill' : 'bi-moon-fill';
  }

  /**
   * Obtiene el tooltip según el tema actual
   */
  getThemeTooltip(): string {
    return this.isDarkMode ? 'Cambiar a tema claro' : 'Cambiar a tema oscuro';
  }
}
