import { Component, OnInit, inject, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';
import { forkJoin, of } from 'rxjs';
import { catchError, take } from 'rxjs/operators';
import { FeaturedProject } from '../featured-project/featured-project';
import { PORTFOLIO_CONFIG } from '../../../config/portfolio.config';
import { LanguageService } from '../../../services/language.service';
import { IFeaturedProject } from '../../../interfaces/featured-project';
import { GithubService } from '../../../services/github';

@Component({
  selector: 'app-projects-list',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatIconModule, FeaturedProject],
  templateUrl: './projects-list.html',
  styleUrls: ['./projects-list.scss'],
})
export class ProjectsList implements OnInit {
  protected readonly langService = inject(LanguageService);
  private readonly router = inject(Router);
  private readonly githubService = inject(GithubService);

  // Sinal para armazenar as estatísticas dinâmicas indexadas por username/repoName
  private dynamicStats = signal<{ [key: string]: { stars: number; date: string } }>({});

  // Computed que mescla as traduções da configuração com as estatísticas em tempo real
  featuredProjects = computed<IFeaturedProject[]>(() => {
    this.langService.currentLanguage(); // Aciona reatividade com a mudança de idioma
    const stats = this.dynamicStats();

    return PORTFOLIO_CONFIG.featuredProjects.map((p) => {
      const key = `${p.username}/${p.repoName}`;
      return {
        title: this.langService.translate(p.title),
        content: this.langService.translate(p.content),
        resourcesTitle: this.langService.translate(p.resourcesTitle),
        resources: p.resources.map((r) => ({
          label: this.langService.translate(r.label),
          url: r.url,
        })),
        technologies: p.technologies,
        repoName: p.repoName,
        username: p.username,
        description: this.langService.translate(p.description),
        stars: stats[key]?.stars || 0,
        language: p.language,
        date: stats[key]?.date || p.date,
        githubUrl: p.githubUrl,
        imageUrl: p.imageUrl,
      };
    });
  });

  ngOnInit(): void {
    this.fetchRealStats();
  }

  private fetchRealStats(): void {
    const requests = PORTFOLIO_CONFIG.featuredProjects.map((p) =>
      this.githubService.getRepository(p.username, p.repoName).pipe(
        catchError(() => of(null))
      )
    );

    forkJoin(requests)
      .pipe(take(1))
      .subscribe((repos) => {
        const statsMap: { [key: string]: { stars: number; date: string } } = {};
        
        PORTFOLIO_CONFIG.featuredProjects.forEach((p, idx) => {
          const key = `${p.username}/${p.repoName}`;
          const realRepo = repos[idx];
          if (realRepo) {
            statsMap[key] = {
              stars: realRepo.stars,
              date: realRepo.date,
            };
          }
        });

        this.dynamicStats.set(statsMap);
      });
  }

  navigateToAllProjects(): void {
    this.router.navigate(['/projetos']);
  }
}
