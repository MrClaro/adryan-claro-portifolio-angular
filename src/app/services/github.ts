import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, forkJoin, of, BehaviorSubject } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';
import { NGXLogger } from 'ngx-logger';

export interface GitHubProject {
  repoName: string;
  username: string;
  description: string;
  stars: number;
  language: string;
  date: string;
  githubUrl: string;
  imageUrl: string;
  topics?: string[];
  forks?: number;
  watchers?: number;
  openIssues?: number;
  updatedAt?: number;
  isPriority?: boolean;
  priorityIndex?: number;
}

@Injectable({
  providedIn: 'root',
})
export class GithubService {
  private readonly githubApiUrl = 'https://api.github.com';
  private readonly priorityUsers = ['MrClaro', 'UniSoftHub'];
  private readonly priorityRepos = [
    { username: 'MrClaro', repo: 'challenge-forum-hub' },
    { username: 'MrClaro', repo: 'desafio-angular-na-pratica' },
    { username: 'MrClaro', repo: 'challenge-literalura' },
    { username: 'MrClaro', repo: 'fliperama-vai-na-web' },
    { username: 'UniSoftHub', repo: 'connecthub-backend' },
    { username: 'UniSoftHub', repo: 'connecthub-frontend' },
  ];

  // Cache de todos os projetos
  private allProjectsCache$ = new BehaviorSubject<GitHubProject[]>([]);
  public allProjects$ = this.allProjectsCache$.asObservable();

  constructor(
    private http: HttpClient,
    private logger: NGXLogger,
  ) {}

  /**
   * Busca APENAS os 3 projetos em destaque (featured)
   */
  /**
   * Projetos de fallback caso a API do GitHub falhe ou atinja o rate limit
   */
  private readonly fallbackProjects: GitHubProject[] = [
    {
      repoName: 'challenge-forum-hub',
      username: 'MrClaro',
      description: 'Quarto e último challenge do programa ONE (Oracle Next Education) - Fórum Hub API REST.',
      stars: 3,
      language: 'Java',
      date: '05 Ago 2025',
      githubUrl: 'https://github.com/MrClaro/challenge-forum-hub',
      imageUrl: 'https://placehold.co/600x350/ED8B00/ffffff?text=challenge-forum-hub',
      topics: ['java', 'spring-boot', 'postgresql', 'rest-api', 'docker'],
      isPriority: true,
      priorityIndex: 0
    },
    {
      repoName: 'desafio-angular-na-pratica',
      username: 'MrClaro',
      description: 'Projeto prático em Angular para desenvolvimento de competências de frontend.',
      stars: 2,
      language: 'TypeScript',
      date: '12 Out 2025',
      githubUrl: 'https://github.com/MrClaro/desafio-angular-na-pratica',
      imageUrl: 'https://placehold.co/600x350/007ACC/ffffff?text=desafio-angular-na-pratica',
      topics: ['angular', 'typescript', 'sass', 'frontend'],
      isPriority: true,
      priorityIndex: 1
    },
    {
      repoName: 'challenge-literalura',
      username: 'MrClaro',
      description: 'Catálogo de livros integrado com API Gutendex, desenvolvido no challenge do Oracle Next Education.',
      stars: 2,
      language: 'Java',
      date: '20 Set 2025',
      githubUrl: 'https://github.com/MrClaro/challenge-literalura',
      imageUrl: 'https://placehold.co/600x350/ED8B00/ffffff?text=challenge-literalura',
      topics: ['java', 'spring-boot', 'jpa', 'hibernate', 'gutendex-api'],
      isPriority: true,
      priorityIndex: 2
    },
    {
      repoName: 'fliperama-vai-na-web',
      username: 'MrClaro',
      description: 'Projeto de jogos retrô desenvolvido em parceria com o programa Vai na Web.',
      stars: 1,
      language: 'JavaScript',
      date: '15 Jul 2025',
      githubUrl: 'https://github.com/MrClaro/fliperama-vai-na-web',
      imageUrl: 'https://placehold.co/600x350/f7df1e/000000?text=fliperama-vai-na-web',
      topics: ['javascript', 'html', 'css', 'games'],
      isPriority: true,
      priorityIndex: 3
    },
    {
      repoName: 'connecthub-backend',
      username: 'UniSoftHub',
      description: 'Backend para a plataforma ConnectHub, construído em microsserviços escaláveis.',
      stars: 4,
      language: 'Java',
      date: '30 Nov 2025',
      githubUrl: 'https://github.com/UniSoftHub/connecthub-backend',
      imageUrl: 'https://placehold.co/600x350/ED8B00/ffffff?text=connecthub-backend',
      topics: ['java', 'spring-boot', 'microservices', 'postgresql', 'docker'],
      isPriority: true,
      priorityIndex: 4
    },
    {
      repoName: 'connecthub-frontend',
      username: 'UniSoftHub',
      description: 'Painel administrativo e interface de usuário para a plataforma ConnectHub.',
      stars: 3,
      language: 'TypeScript',
      date: '28 Nov 2025',
      githubUrl: 'https://github.com/UniSoftHub/connecthub-frontend',
      imageUrl: 'https://placehold.co/600x350/007ACC/ffffff?text=connecthub-frontend',
      topics: ['angular', 'typescript', 'tailwind-css', 'dashboard'],
      isPriority: true,
      priorityIndex: 5
    }
  ];

  /**
   * Busca APENAS os 3 projetos em destaque (featured)
   */
  getFeaturedProjects(): Observable<GitHubProject[]> {
    // 1. Tenta carregar do localStorage primeiro
    let cachedProjects: GitHubProject[] = [];
    const isBrowser = typeof window !== 'undefined' && typeof window.localStorage !== 'undefined';
    if (isBrowser) {
      try {
        const stored = window.localStorage.getItem('github_projects_cache');
        if (stored) {
          cachedProjects = JSON.parse(stored);
        }
      } catch (e) {
        this.logger.warn('⚠️ Erro ao ler cache no getFeaturedProjects:', e);
      }
    }

    // Se temos cache local, extraímos os prioritários em destaque
    if (cachedProjects.length > 0) {
      const featured = cachedProjects.filter(p => p.isPriority).slice(0, 3);
      if (featured.length > 0) {
        this.logger.info('✨ Projetos em destaque carregados do cache local.');
        return of(featured);
      }
    }

    // Se não há cache, chama getAllProjects que resolve tudo com apenas 2 chamadas otimizadas à API do GitHub
    return this.getAllProjects().pipe(
      map((projects) => {
        const featured = projects.filter((p) => p.isPriority).slice(0, 3);
        if (featured.length > 0) {
          return featured;
        }
        return this.fallbackProjects.filter(p => p.isPriority).slice(0, 3);
      }),
      catchError((error) => {
        this.logger.error('❌ Erro ao buscar projetos em destaque:', error);
        return of(this.fallbackProjects.filter(p => p.isPriority).slice(0, 3));
      }),
    );
  }

  /**
   * Busca TODOS os projetos
   */
  getAllProjects(): Observable<GitHubProject[]> {
    // 1. Tenta recuperar do cache em memória do BehaviorSubject primeiro
    if (this.allProjectsCache$.value.length > 0) {
      this.logger.info('📦 Usando cache de projetos (BehaviorSubject)');
      return of(this.allProjectsCache$.value);
    }

    // 2. Tenta recuperar do localStorage (persistente)
    let cachedProjects: GitHubProject[] = [];
    const isBrowser = typeof window !== 'undefined' && typeof window.localStorage !== 'undefined';
    if (isBrowser) {
      try {
        const stored = window.localStorage.getItem('github_projects_cache');
        if (stored) {
          cachedProjects = JSON.parse(stored);
          this.logger.info(`📦 Projetos carregados do localStorage (${cachedProjects.length} itens)`);
          this.allProjectsCache$.next(cachedProjects);
        }
      } catch (e) {
        this.logger.warn('⚠️ Erro ao ler cache do localStorage:', e);
      }
    }

    // 3. Busca todos os repositórios dos usuários (APENAS 2 requisições em vez de 8!)
    const userReposRequests = this.priorityUsers.map((username) =>
      this.getRepositoriesFromUser(username, 100),
    );

    const apiCall$ = forkJoin(userReposRequests).pipe(
      map((otherReposArrays) => {
        const allFetchedRepos = otherReposArrays.flat();

        if (allFetchedRepos.length === 0) {
          // Se a API não retornou nada (rate limit ou offline)
          if (cachedProjects.length > 0) {
            this.logger.info('⚠️ API indisponível (rate limit?), usando cache persistente.');
            return cachedProjects;
          }
          this.logger.info('⚠️ API indisponível e sem cache. Usando dados estáticos de fallback.');
          return this.fallbackProjects;
        }

        // Processa os repositórios retornados para identificar quais são os prioritários
        const processedRepos = allFetchedRepos.map((repo) => {
          const priorityIndex = this.priorityRepos.findIndex(
            (pr) => pr.username.toLowerCase() === repo.username.toLowerCase() &&
                    pr.repo.toLowerCase() === repo.repoName.toLowerCase()
          );

          if (priorityIndex !== -1) {
            return {
              ...repo,
              isPriority: true,
              priorityIndex: priorityIndex,
            };
          }
          return repo;
        });

        // Separa em prioritários e normais
        const priorityRepos = processedRepos.filter((r) => r.isPriority);
        const otherRepos = processedRepos.filter((r) => !r.isPriority);

        // Remove duplicatas (por exemplo se houver algum erro de duplicação entre os arrays)
        const priorityRepoKeys = priorityRepos.map((r) => `${r.username}/${r.repoName}`);
        const uniqueOtherRepos = otherRepos.filter(
          (repo) => !priorityRepoKeys.includes(`${repo.username}/${repo.repoName}`),
        );

        // Ordena outros por estrelas e data de atualização
        const sortedOtherRepos = uniqueOtherRepos.sort((a, b) => {
          if (b.stars !== a.stars) return b.stars - a.stars;
          return (b.updatedAt || 0) - (a.updatedAt || 0);
        });

        // Ordena os prioritários pelo índice definido na lista
        const sortedPriorityRepos = priorityRepos.sort(
          (a, b) => (a.priorityIndex || 0) - (b.priorityIndex || 0),
        );

        // Combina as duas listas
        const allRepos = [...sortedPriorityRepos, ...sortedOtherRepos];

        this.logger.info('✅ Projetos buscados com sucesso da API (otimizado):', allRepos.length);
        this.allProjectsCache$.next(allRepos);

        if (isBrowser) {
          try {
            window.localStorage.setItem('github_projects_cache', JSON.stringify(allRepos));
          } catch (e) {
            this.logger.warn('⚠️ Erro ao salvar cache no localStorage:', e);
          }
        }

        return allRepos;
      }),
      catchError((error) => {
        this.logger.error('❌ Erro na requisição da API de projetos:', error);
        if (cachedProjects.length > 0) {
          return of(cachedProjects);
        }
        return of(this.fallbackProjects);
      })
    );

    // Se temos cache local, retornamos o cache local imediatamente mas iniciamos a revalidação da API.
    if (cachedProjects.length > 0) {
      apiCall$.subscribe({
        next: (projects) => {
          this.logger.info('🔄 Cache de projetos revalidado e atualizado.');
        },
        error: (err) => {
          this.logger.warn('⚠️ Revalidação em background falhou:', err);
        }
      });
      return of(cachedProjects);
    }

    return apiCall$;
  }

  /**
   * Filtra projetos por nome e tecnologia
   */
  filterProjects(
    projects: GitHubProject[],
    searchTerm: string,
    selectedLanguage: string = 'all',
  ): GitHubProject[] {
    let filtered = [...projects];

    // Filtro por linguagem
    if (selectedLanguage && selectedLanguage !== 'all') {
      const targetLang = selectedLanguage.toLowerCase().trim();
      filtered = filtered.filter((project) => {
        const lang = (project.language || '').toLowerCase().trim();
        const hasMatchingLang = lang === targetLang;
        const hasMatchingTopic = project.topics?.some(
          (topic) => (topic || '').toLowerCase().trim() === targetLang
        ) || false;
        return hasMatchingLang || hasMatchingTopic;
      });
    }

    // Filtro por termo de busca
    if (searchTerm && searchTerm.trim()) {
      const term = searchTerm.toLowerCase().trim();
      filtered = filtered.filter((project) => {
        const matchName = (project.repoName || '').toLowerCase().includes(term);
        const matchDescription = (project.description || '').toLowerCase().includes(term);
        const matchLanguage = (project.language || '').toLowerCase().includes(term);
        const matchTopics = project.topics?.some(
          (topic) => (topic || '').toLowerCase().includes(term)
        ) || false;
        const matchUsername = (project.username || '').toLowerCase().includes(term);

        return matchName || matchDescription || matchLanguage || matchTopics || matchUsername;
      });
    }

    return filtered;
  }

  /**
   * Obtém lista de todas as linguagens únicas dos projetos (sem duplicatas case-sensitive)
   */
  getUniqueLanguages(projects: GitHubProject[]): string[] {
    const langSet = new Set<string>();
    const seenLower = new Set<string>();

    projects.forEach((project) => {
      if (project.language) {
        const langTrimmed = project.language.trim();
        const langLower = langTrimmed.toLowerCase();
        if (!seenLower.has(langLower)) {
          seenLower.add(langLower);
          langSet.add(langTrimmed);
        }
      }
    });

    projects.forEach((project) => {
      project.topics?.forEach((topic) => {
        if (topic) {
          const topicTrimmed = topic.trim();
          const topicLower = topicTrimmed.toLowerCase();
          if (!seenLower.has(topicLower)) {
            seenLower.add(topicLower);
            const capitalized = topicTrimmed.charAt(0).toUpperCase() + topicTrimmed.slice(1);
            langSet.add(capitalized);
          }
        }
      });
    });

    return Array.from(langSet).sort();
  }

  /**
   * Limpa o cache de projetos
   */
  clearCache(): void {
    this.allProjectsCache$.next([]);
    if (typeof window !== 'undefined' && typeof window.localStorage !== 'undefined') {
      try {
        window.localStorage.removeItem('github_projects_cache');
      } catch (e) {
        this.logger.warn('⚠️ Erro ao limpar cache do localStorage:', e);
      }
    }
    this.logger.info('🗑️ Cache de projetos limpo');
  }

  /**
   * Busca repositórios de um usuário específico
   */
  private getRepositoriesFromUser(username: string, limit: number): Observable<GitHubProject[]> {
    const url = `${this.githubApiUrl}/users/${username}/repos?sort=updated&per_page=${limit}`;

    return this.http.get<any[]>(url).pipe(
      map((repos) =>
        repos.map((repo) => ({
          repoName: repo.name,
          username: repo.owner.login,
          description: repo.description || 'Nenhuma descrição fornecida.',
          stars: repo.stargazers_count,
          language: repo.language || 'Markdown',
          date: this.formatDate(repo.pushed_at),
          githubUrl: repo.html_url,
          imageUrl: this.getRepoImage(repo),
          topics: repo.topics || [],
          forks: repo.forks_count,
          watchers: repo.watchers_count,
          openIssues: repo.open_issues_count,
          updatedAt: new Date(repo.pushed_at).getTime(),
          isPriority: false,
        })),
      ),
      catchError((error) => {
        this.logger.error(`❌ Erro ao buscar repos de ${username}:`, error);
        return of([]);
      }),
    );
  }

  /**
   * Busca um repositório específico
   */
  getRepository(username: string, repoName: string): Observable<GitHubProject> {
    const url = `${this.githubApiUrl}/repos/${username}/${repoName}`;

    return this.http.get<any>(url).pipe(
      map((repo) => ({
        repoName: repo.name,
        username: repo.owner.login,
        description: repo.description || 'Nenhuma descrição fornecida.',
        stars: repo.stargazers_count,
        language: repo.language || 'Markdown',
        date: this.formatDate(repo.pushed_at),
        githubUrl: repo.html_url,
        imageUrl: this.getRepoImage(repo),
        topics: repo.topics || [],
        forks: repo.forks_count,
        watchers: repo.watchers_count,
        openIssues: repo.open_issues_count,
        updatedAt: new Date(repo.pushed_at).getTime(),
      })),
    );
  }

  /**
   * Formata a data para o padrão brasileiro
   */
  private formatDate(dateString: string): string {
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    });
  }

  /**
   * Obtém imagem do repositório
   */
  private getRepoImage(repo: any): string {
    const customImages: { [key: string]: string } = {
      // Adicione suas imagens personalizadas aqui
    };

    const repoKey = `${repo.owner.login}/${repo.name}`;
    if (customImages[repoKey]) {
      return customImages[repoKey];
    }

    const languageColors: { [key: string]: string } = {
      JavaScript: 'f7df1e',
      TypeScript: '007ACC',
      Python: '3776AB',
      Java: 'ED8B00',
      SCSS: 'F7B2BC',
      HTML: 'E34F26',
      CSS: '1572B6',
      Vue: '4FC08D',
      React: '61DAFB',
      Angular: 'DD0031',
      PHP: '777BB4',
      'C++': '00599C',
      'C#': '239120',
      Ruby: 'CC342D',
      Go: '00ADD8',
      Rust: 'CE422B',
      Kotlin: '7F52FF',
      Swift: 'FA7343',
    };

    const color = languageColors[repo.language] || '1a1a2e';
    const textColor = 'ffffff';

    return `https://placehold.co/600x350/${color}/${textColor}?text=${encodeURIComponent(repo.name)}`;
  }
}
