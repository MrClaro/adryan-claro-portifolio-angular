import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { PORTFOLIO_CONFIG } from '../../../config/portfolio.config';
import { LanguageService } from '../../../services/language.service';

@Component({
  selector: 'app-expertise',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatCardModule, MatIconModule],
  templateUrl: './expertise.html',
  styleUrls: ['./expertise.scss'],
})
export class Expertise {
  protected readonly langService = inject(LanguageService);

  get expertiseItems() {
    this.langService.currentLanguage();
    return PORTFOLIO_CONFIG.expertise.map((item) => ({
      icon: item.icon,
      title: this.langService.translate(item.title),
      description: this.langService.translate(item.description),
      skills: item.skills,
      highlighted: item.highlighted,
    }));
  }

  getAnimationDelay(index: number): string {
    return `${index * 0.1}s`;
  }

  sendEmail(): void {
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    } else {
      window.location.href = `mailto:${PORTFOLIO_CONFIG.profile.email}`;
    }
  }
}
