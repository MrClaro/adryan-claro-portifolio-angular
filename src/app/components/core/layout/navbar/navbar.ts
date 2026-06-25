import { Component, HostListener, inject } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { MatToolbar } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { NGXLogger } from 'ngx-logger';
import { LanguageService, Language } from '../../../../services/language.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.html',
  styleUrls: ['./navbar.scss'],
  imports: [MatToolbar, MatIcon, MatButtonModule, RouterLink, RouterLinkActive],
})
export class Navbar {
  protected readonly langService = inject(LanguageService);
  private readonly logger = inject(NGXLogger);

  isNavbarVisible = true;
  isMenuOpen = false;
  isScrolled = false;
  
  private lastScrollTop = 0;
  private scrollThreshold = 50;

  get currentLang(): Language {
    return this.langService.currentLanguage();
  }

  @HostListener('window:scroll', [])
  onWindowScroll(): void {
    const currentScroll = window.pageYOffset || document.documentElement.scrollTop;

    this.isScrolled = currentScroll > 20;

    if (currentScroll > this.lastScrollTop && currentScroll > this.scrollThreshold) {
      this.isNavbarVisible = false;
      this.closeMenu();
    } else {
      this.isNavbarVisible = true;
    }

    this.lastScrollTop = currentScroll <= 0 ? 0 : currentScroll;
  }

  toggleMenu(): void {
    this.isMenuOpen = !this.isMenuOpen;

    if (this.isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }

  closeMenu(): void {
    this.isMenuOpen = false;
    document.body.style.overflow = '';
  }

  changeLanguage(lang: Language): void {
    this.langService.setLanguage(lang);
    this.logger.info(`Idioma alterado para: ${lang}`);
  }
}
