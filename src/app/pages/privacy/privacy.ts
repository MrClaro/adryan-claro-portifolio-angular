import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LanguageService } from '../../services/language.service';
import { PORTFOLIO_CONFIG } from '../../config/portfolio.config';

@Component({
  selector: 'app-privacy',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './privacy.html',
  styleUrls: ['./privacy.scss'],
})
export class Privacy {
  protected readonly langService = inject(LanguageService);
  
  get email(): string {
    return PORTFOLIO_CONFIG.profile.email;
  }
  
  get name(): string {
    return PORTFOLIO_CONFIG.profile.name;
  }
}
