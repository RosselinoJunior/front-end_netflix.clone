// Classe para gerenciar o tema
class ThemeManager {
  constructor() {
    this.LIGHT_MODE = 'light-mode';
    this.STORAGE_KEY = 'theme-preference';
    this.themeToggle = document.getElementById('theme-toggle');
    this.body = document.body;
    
    this.init();
  }

  init() {
    // Aplicar tema salvo ou padrão (dark)
    const savedTheme = this.getSavedTheme();
    this.setTheme(savedTheme);
    
    // Sincronizar checkbox com tema
    this.syncCheckbox();
    
    // Adicionar eventos
    this.themeToggle?.addEventListener('change', () => this.toggleTheme());
  }

  getSavedTheme() {
    return localStorage.getItem(this.STORAGE_KEY) || 'dark';
  }

  setTheme(theme) {
    if (theme === 'light') {
      this.body.classList.add(this.LIGHT_MODE);
      localStorage.setItem(this.STORAGE_KEY, 'light');
    } else {
      this.body.classList.remove(this.LIGHT_MODE);
      localStorage.setItem(this.STORAGE_KEY, 'dark');
    }
    this.syncCheckbox();
  }

  syncCheckbox() {
    if (this.themeToggle) {
      this.themeToggle.checked = this.body.classList.contains(this.LIGHT_MODE);
    }
  }

  toggleTheme() {
    const isLightMode = this.body.classList.contains(this.LIGHT_MODE);
    this.setTheme(isLightMode ? 'dark' : 'light');
  }
}

// Inicializar ao carregar a página
document.addEventListener('DOMContentLoaded', () => {
  new ThemeManager();
});
