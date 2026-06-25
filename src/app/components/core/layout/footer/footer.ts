import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { PORTFOLIO_CONFIG } from '../../../../config/portfolio.config';
import { LanguageService } from '../../../../services/language.service';

interface FooterLink {
  label: string;
  url: string;
  external?: boolean;
}

interface FooterSection {
  title: string;
  links: FooterLink[];
}

import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule, MatIconModule, MatButtonModule, RouterLink],
  templateUrl: './footer.html',
  styleUrls: ['./footer.scss'],
})
export class Footer {
  protected readonly langService = inject(LanguageService);

  currentYear = new Date().getFullYear();

  get brandDescription(): string {
    return this.langService.isPt()
      ? 'Desenvolvedor Full Stack apaixonado por criar soluções digitais inovadoras e funcionais. Transformando ideias em realidade através de código limpo e eficiente.'
      : 'Full Stack Developer passionate about creating innovative and functional digital solutions. Turning ideas into reality through clean and efficient code.';
  }

  get footerSections(): FooterSection[] {
    this.langService.currentLanguage();
    
    return [
      {
        title: this.langService.isPt() ? 'Navegação' : 'Navigation',
        links: [
          { label: this.langService.isPt() ? 'Início' : 'Home', url: '#hero' },
          { label: this.langService.isPt() ? 'Sobre' : 'About', url: '#about' },
          { label: this.langService.isPt() ? 'Expertise' : 'Expertise', url: '#expertise' },
          { label: this.langService.isPt() ? 'Projetos' : 'Projects', url: '#projects' },
          { label: this.langService.isPt() ? 'Contato' : 'Contact', url: '#contact' },
        ],
      },
      {
        title: this.langService.isPt() ? 'Projetos' : 'Projects',
        links: [
          { label: 'Open Source', url: PORTFOLIO_CONFIG.socialLinks[0].url, external: true },
          { label: 'Blog', url: '#blog' },
        ],
      },
      {
        title: this.langService.isPt() ? 'Recursos' : 'Resources',
        links: [
          { label: this.langService.isPt() ? 'Currículo' : 'Resume', url: '#resume' },
          { label: this.langService.isPt() ? 'Artigos' : 'Articles', url: PORTFOLIO_CONFIG.socialLinks[1].url, external: true },
        ],
      },
    ];
  }

  get socialLinks() {
    return PORTFOLIO_CONFIG.socialLinks;
  }

  get quickContact() {
    return {
      email: PORTFOLIO_CONFIG.profile.email,
      phone: PORTFOLIO_CONFIG.profile.phone,
      location: PORTFOLIO_CONFIG.profile.location,
    };
  }

  openLink(url: string, external?: boolean): void {
    if (external) {
      window.open(url, '_blank', 'noopener,noreferrer');
    } else {
      const element = document.querySelector(url);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  }

  sendEmail(): void {
    window.location.href = `mailto:${this.quickContact.email}`;
  }

  scrollToTop(): void {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}
