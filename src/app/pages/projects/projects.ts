import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatChipsModule } from '@angular/material/chips';
import { Subject } from 'rxjs';
import { takeUntil, debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { GitHubCard } from '../../components/features/github-card/github-card';
import { GitHubProject, GithubService } from '../../services/github';
import { NGXLogger } from 'ngx-logger';
import { LanguageService } from '../../services/language.service';

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatProgressSpinnerModule,
    MatChipsModule,
    GitHubCard,
  ],
  templateUrl: './projects.html',
  styleUrls: ['./projects.scss'],
})
export class Projects implements OnInit, OnDestroy {
  allProjects: GitHubProject[] = [];
  filteredProjects: GitHubProject[] = [];
  displayedProjects: GitHubProject[] = [];
  languages: string[] = [];

  searchTerm: string = '';
  selectedLanguage: string = 'all';

  isLoading: boolean = true;
  hasError: boolean = false;
  errorMessage: string = '';

  // Paginação
  currentPage: number = 1;
  itemsPerPage: number = 9;
  totalPages: number = 1;

  // Estatísticas
  totalStars: number = 0;
  totalProjects: number = 0;

  private destroy$ = new Subject<void>();
  private searchSubject = new Subject<string>();

  constructor(
    private githubService: GithubService,
    private logger: NGXLogger,
    public langService: LanguageService,
  ) {}

  ngOnInit(): void {
    this.loadProjects();
    this.setupSearch();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private setupSearch(): void {
    this.searchSubject
      .pipe(debounceTime(300), distinctUntilChanged(), takeUntil(this.destroy$))
      .subscribe((searchTerm) => {
        this.searchTerm = searchTerm;
        this.applyFilters();
      });
  }

  private loadProjects(): void {
    this.isLoading = true;
    this.hasError = false;

    this.githubService
      .getAllProjects()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (projects) => {
          this.allProjects = projects;
          this.filteredProjects = projects;
          this.languages = this.githubService.getUniqueLanguages(projects);
          this.calculateStats();
          this.updatePagination();
          this.isLoading = false;

          this.logger.info('✅ Projetos carregados:', projects.length);
        },
        error: (error) => {
          this.logger.error('❌ Erro ao carregar projetos:', error);
          this.hasError = true;
          this.errorMessage = 'Não foi possível carregar os projetos. Tente novamente mais tarde.';
          this.isLoading = false;
        },
      });
  }

  onSearchChange(searchTerm: string): void {
    this.searchSubject.next(searchTerm);
  }

  onLanguageChange(language: string): void {
    this.selectedLanguage = language;
    this.currentPage = 1;
    this.applyFilters();
  }

  private applyFilters(): void {
    this.filteredProjects = this.githubService.filterProjects(
      this.allProjects,
      this.searchTerm,
      this.selectedLanguage,
    );

    this.updatePagination();
  }

  private updatePagination(): void {
    this.totalProjects = this.filteredProjects.length;
    this.totalPages = Math.ceil(this.filteredProjects.length / this.itemsPerPage);
    this.updateDisplayedProjects();
  }

  private updateDisplayedProjects(): void {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.displayedProjects = this.filteredProjects.slice(startIndex, endIndex);

    // Scroll suave para o topo
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.updateDisplayedProjects();
    }
  }

  previousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.updateDisplayedProjects();
    }
  }

  goToPage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.updateDisplayedProjects();
    }
  }

  clearFilters(): void {
    this.searchTerm = '';
    this.selectedLanguage = 'all';
    this.currentPage = 1;
    this.applyFilters();
  }

  retryLoad(): void {
    this.loadProjects();
  }

  private calculateStats(): void {
    this.totalStars = this.allProjects.reduce((sum, project) => sum + project.stars, 0);
    this.totalProjects = this.allProjects.length;
  }

  get hasFiltersApplied(): boolean {
    return this.searchTerm !== '' || this.selectedLanguage !== 'all';
  }

  get pageNumbers(): number[] {
    const pages: number[] = [];
    const maxVisible = 5;

    if (this.totalPages <= maxVisible) {
      for (let i = 1; i <= this.totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (this.currentPage <= 3) {
        pages.push(1, 2, 3, 4, -1, this.totalPages);
      } else if (this.currentPage >= this.totalPages - 2) {
        pages.push(
          1,
          -1,
          this.totalPages - 3,
          this.totalPages - 2,
          this.totalPages - 1,
          this.totalPages,
        );
      } else {
        pages.push(
          1,
          -1,
          this.currentPage - 1,
          this.currentPage,
          this.currentPage + 1,
          -1,
          this.totalPages,
        );
      }
    }

    return pages;
  }

  getAnimationDelay(index: number): string {
    return `${index * 0.1}s`;
  }
}
