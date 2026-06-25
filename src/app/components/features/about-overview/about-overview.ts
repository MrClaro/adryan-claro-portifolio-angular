import { Component, inject, computed } from '@angular/core';
import { RouterLink } from '@angular/router';
import { LanguageService } from '../../../services/language.service';
import { PORTFOLIO_CONFIG } from '../../../config/portfolio.config';

@Component({
  selector: 'app-about-overview',
  imports: [RouterLink],
  templateUrl: './about-overview.html',
  styleUrl: './about-overview.scss',
})
export class AboutOverview {
  protected readonly langService = inject(LanguageService);

  // Bio traduzida para exibição rápida
  bio = computed(() => {
    return this.langService.translate(PORTFOLIO_CONFIG.profile.bio);
  });
}
