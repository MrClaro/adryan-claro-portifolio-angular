import { Component, HostListener, inject, computed } from '@angular/core';
import { NgxTypedJsModule } from 'ngx-typed-js';
import { SkillsMarquee } from '../skills-marquee/skills-marquee';
import { TypewriterDirective } from '../../../directives/typewriter';
import { LanguageService } from '../../../services/language.service';
import { PORTFOLIO_CONFIG } from '../../../config/portfolio.config';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-hero-section',
  imports: [SkillsMarquee, NgxTypedJsModule, TypewriterDirective, RouterLink],
  templateUrl: './hero-section.html',
  styleUrl: './hero-section.scss',
})
export class HeroSection {
  scrollIndicatorOpacity = 1;
  private ticking = false;

  protected readonly langService = inject(LanguageService);

  // Typewriter para o título principal (Nome / Assinatura)
  nameTypewriter = computed(() => [
    'Adryan Claro',
    this.langService.isPt() ? 'O Dev de Chapéu 🎩' : 'The Hat Dev 🎩',
  ]);

  // Typewriter para os subtítulos profissionais
  subtitlesTypewriter = computed(() => {
    const raw = PORTFOLIO_CONFIG.profile.subtitles;
    return this.langService.translateArray(raw);
  });

  @HostListener('window:scroll', [])
  onWindowScroll(): void {
    if (!this.ticking) {
      window.requestAnimationFrame(() => {
        this.handleScrollIndicator();
        this.ticking = false;
      });
      this.ticking = true;
    }
  }

  private handleScrollIndicator(): void {
    const currentScroll = window.pageYOffset || document.documentElement.scrollTop;
    const fadeStart = 0;
    const fadeEnd = 300;

    if (currentScroll <= fadeStart) {
      this.scrollIndicatorOpacity = 1;
    } else if (currentScroll >= fadeEnd) {
      this.scrollIndicatorOpacity = 0;
    } else {
      this.scrollIndicatorOpacity = 1 - (currentScroll - fadeStart) / (fadeEnd - fadeStart);
    }
  }

  scrollToNextSection(): void {
    const heroHeight = window.innerHeight;

    window.scrollTo({
      top: heroHeight,
      behavior: 'smooth',
    });
  }
}
