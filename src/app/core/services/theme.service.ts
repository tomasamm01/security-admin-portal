import { Injectable } from '@angular/core';

export type Theme = 'light' | 'dark';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private currentTheme: Theme = 'light';
  private readonly THEME_KEY = 'app-theme';

  constructor() {
    this.initTheme();
  }

  /**
   * Inicializa el tema desde localStorage o sistema
   */
  private initTheme(): void {
    const savedTheme = localStorage.getItem(this.THEME_KEY) as Theme;
    
    if (savedTheme && this.isValidTheme(savedTheme)) {
      this.currentTheme = savedTheme;
    } else {
      // Detectar preferencia del sistema
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      this.currentTheme = prefersDark ? 'dark' : 'light';
    }
    
    this.applyTheme();
  }

  /**
   * Cambia al tema especificado
   */
  setTheme(theme: Theme): void {
    if (!this.isValidTheme(theme)) return;
    
    this.currentTheme = theme;
    this.applyTheme();
    this.saveTheme();
  }

  /**
   * Alterna entre temas
   */
  toggleTheme(): void {
    const newTheme = this.currentTheme === 'light' ? 'dark' : 'light';
    this.setTheme(newTheme);
  }

  /**
   * Obtiene el tema actual
   */
  getCurrentTheme(): Theme {
    return this.currentTheme;
  }

  /**
   * Verifica si el tema actual es oscuro
   */
  isDarkTheme(): boolean {
    return this.currentTheme === 'dark';
  }

  /**
   * Aplica el tema al DOM
   */
  private applyTheme(): void {
    const root = document.documentElement;
    
    // Remover clases de tema existentes
    root.classList.remove('theme-light', 'theme-dark');
    
    // Agregar clase del tema actual
    root.classList.add(`theme-${this.currentTheme}`);
    
    // Actualizar variables CSS
    this.updateCSSVariables();
  }

  /**
   * Actualiza las variables CSS según el tema
   */
  private updateCSSVariables(): void {
    const root = document.documentElement;
    
    if (this.currentTheme === 'dark') {
      root.style.setProperty('--bg-primary', '#1a1a1a');
      root.style.setProperty('--bg-secondary', '#2d2d2d');
      root.style.setProperty('--bg-tertiary', '#404040');
      root.style.setProperty('--text-primary', '#ffffff');
      root.style.setProperty('--text-secondary', '#b0b0b0');
      root.style.setProperty('--text-muted', '#808080');
      root.style.setProperty('--border-color', '#404040');
      root.style.setProperty('--card-bg', '#2d2d2d');
      root.style.setProperty('--input-bg', '#404040');
      root.style.setProperty('--hover-bg', '#4a4a4a');
    } else {
      root.style.setProperty('--bg-primary', '#fcfcfc');
      root.style.setProperty('--bg-secondary', '#ffffff');
      root.style.setProperty('--bg-tertiary', '#f8f9fa');
      root.style.setProperty('--text-primary', '#1B432C');
      root.style.setProperty('--text-secondary', '#575757');
      root.style.setProperty('--text-muted', '#6c757d');
      root.style.setProperty('--border-color', '#dee2e6');
      root.style.setProperty('--card-bg', '#ffffff');
      root.style.setProperty('--input-bg', '#ffffff');
      root.style.setProperty('--hover-bg', '#f8f9fa');
    }
  }

  /**
   * Guarda el tema en localStorage
   */
  private saveTheme(): void {
    localStorage.setItem(this.THEME_KEY, this.currentTheme);
  }

  /**
   * Valida que el tema sea válido
   */
  private isValidTheme(theme: string): theme is Theme {
    return theme === 'light' || theme === 'dark';
  }

  /**
   * Escucha cambios en la preferencia del sistema
   */
  watchSystemTheme(): void {
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
      // Solo cambiar si no hay tema guardado
      if (!localStorage.getItem(this.THEME_KEY)) {
        this.currentTheme = e.matches ? 'dark' : 'light';
        this.applyTheme();
      }
    });
  }
}
