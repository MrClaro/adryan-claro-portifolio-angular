import { Injectable, signal, computed } from '@angular/core';

export type Language = 'pt' | 'en';

@Injectable({
  providedIn: 'root',
})
export class LanguageService {
  private readonly langKey = 'portfolio-lang';
  
  // Signal para o idioma atual, inicializando do localStorage ou padrão 'pt'
  private currentLanguageSignal = signal<Language>(this.getInitialLanguage());
  
  public currentLanguage = this.currentLanguageSignal.asReadonly();

  // Computed signals para conveniência
  public isPt = computed(() => this.currentLanguageSignal() === 'pt');
  public isEn = computed(() => this.currentLanguageSignal() === 'en');

  constructor() {}

  /**
   * Altera o idioma atual e salva no localStorage
   */
  setLanguage(lang: Language): void {
    this.currentLanguageSignal.set(lang);
    localStorage.setItem(this.langKey, lang);
    document.documentElement.lang = lang;
  }

  /**
   * Chaveia entre os idiomas disponíveis
   */
  toggleLanguage(): void {
    const nextLang = this.currentLanguageSignal() === 'pt' ? 'en' : 'pt';
    this.setLanguage(nextLang);
  }

  /**
   * Helper para traduzir chaves com formato { pt: string, en: string }
   */
  translate<T>(transl: { pt: T; en: T }): T {
    return transl[this.currentLanguageSignal()];
  }

  /**
   * Helper para traduzir arrays de strings
   */
  translateArray<T>(transl: { pt: T[]; en: T[] }): T[] {
    return transl[this.currentLanguageSignal()];
  }

  private getInitialLanguage(): Language {
    const saved = localStorage.getItem(this.langKey) as Language;
    if (saved === 'pt' || saved === 'en') {
      document.documentElement.lang = saved;
      return saved;
    }
    
    // Fallback para o idioma do navegador
    const browserLang = navigator.language.toLowerCase();
    const resolved: Language = browserLang.startsWith('pt') ? 'pt' : 'en';
    document.documentElement.lang = resolved;
    return resolved;
  }
}
