import { Component, inject, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatChipsModule } from '@angular/material/chips';
import { PORTFOLIO_CONFIG } from '../../config/portfolio.config';
import { LanguageService } from '../../services/language.service';

@Component({
  selector: 'app-blog',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatChipsModule,
  ],
  templateUrl: './blog.html',
  styleUrls: ['./blog.scss'],
})
export class Blog {
  protected readonly langService = inject(LanguageService);

  searchTerm = signal('');
  selectedTag = signal('all');

  // Obtém todos os artigos traduzidos dinamicamente
  allArticles = computed(() => {
    this.langService.currentLanguage();
    return PORTFOLIO_CONFIG.blogArticles.map((art) => ({
      title: this.langService.translate(art.title),
      description: this.langService.translate(art.description),
      date: art.date,
      readTime: this.langService.translate(art.readTime),
      tags: art.tags,
      url: art.url,
      coverImage: art.coverImage,
    }));
  });

  // Lista de tags únicas dos artigos
  tags = computed(() => {
    const set = new Set<string>();
    this.allArticles().forEach((art) => {
      art.tags.forEach((tag) => set.add(tag));
    });
    return Array.from(set).sort();
  });

  // Filtra os artigos
  filteredArticles = computed(() => {
    const term = this.searchTerm().toLowerCase().trim();
    const tag = this.selectedTag();
    let list = this.allArticles();

    if (tag !== 'all') {
      list = list.filter((art) => art.tags.includes(tag));
    }

    if (term) {
      list = list.filter(
        (art) =>
          art.title.toLowerCase().includes(term) ||
          art.description.toLowerCase().includes(term) ||
          art.tags.some((t) => t.toLowerCase().includes(term)),
      );
    }

    return list;
  });

  selectTag(tag: string): void {
    this.selectedTag.set(tag);
  }

  clearFilters(): void {
    this.searchTerm.set('');
    this.selectedTag.set('all');
  }

  openArticle(url: string): void {
    window.open(url, '_blank', 'noopener,noreferrer');
  }

  getAnimationDelay(index: number): string {
    return `${index * 0.1}s`;
  }
}
