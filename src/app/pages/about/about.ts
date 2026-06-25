import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PORTFOLIO_CONFIG } from '../../config/portfolio.config';
import { LanguageService } from '../../services/language.service';

@Component({
  selector: 'app-about-me',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './about.html',
  styleUrls: ['./about.scss'],
})
export class About {
  protected readonly langService = inject(LanguageService);

  get profile() {
    const raw = PORTFOLIO_CONFIG.profile;
    // Forçar a dependência do signal para reatividade no template
    this.langService.currentLanguage();
    return {
      name: raw.name,
      title: this.langService.translate(raw.title),
      location: raw.location,
      email: raw.email,
      phone: raw.phone,
      bio: this.langService.translate(raw.bio),
      skills: raw.skills,
    };
  }

  get experiences() {
    // Forçar a dependência do signal
    this.langService.currentLanguage();
    return PORTFOLIO_CONFIG.experiences.map((exp) => ({
      company: exp.company,
      period: this.langService.translate(exp.period),
      title: this.langService.translate(exp.title),
      description: this.langService.translate(exp.description),
      highlights: exp.highlights ? exp.highlights.map((h) => this.langService.translate(h)) : [],
      technologies: exp.technologies,
      current: exp.current,
    }));
  }

  get education() {
    this.langService.currentLanguage();
    return PORTFOLIO_CONFIG.education.map((edu) => ({
      institution: edu.institution,
      period: edu.period,
      degree: this.langService.translate(edu.degree),
      description: edu.description ? this.langService.translate(edu.description) : undefined,
    }));
  }

  get certifications() {
    return PORTFOLIO_CONFIG.certifications;
  }

  get courses() {
    this.langService.currentLanguage();
    return PORTFOLIO_CONFIG.courses.map((c) => ({
      name: this.langService.translate(c.name),
      platform: c.platform,
      duration: c.duration,
      completed: c.completed,
    }));
  }

  selectedTab: 'experience' | 'education' | 'courses' = 'experience';

  selectTab(tab: 'experience' | 'education' | 'courses'): void {
    this.selectedTab = tab;
  }

  getInitials(): string {
    return this.profile.name
      .split(' ')
      .map((n) => n[0])
      .join('');
  }

  getCompletedCoursesCount(): number {
    return this.courses.filter((c) => c.completed).length;
  }

  getInProgressCoursesCount(): number {
    return this.courses.filter((c) => !c.completed).length;
  }
}
