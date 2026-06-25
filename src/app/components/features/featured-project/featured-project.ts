import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';
import { IFeaturedProject } from '../../../interfaces/featured-project';

@Component({
  selector: 'app-featured-project',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatIconModule],
  templateUrl: './featured-project.html',
  styleUrls: ['./featured-project.scss'],
})
export class FeaturedProject {
  @Input() project!: IFeaturedProject;
  @Input() index: number = 0;

  constructor(private router: Router) {}

  openUrl(url: string): void {
    window.open(url, '_blank');
  }

  navigateToAllProjects(): void {
    this.router.navigate(['/projetos']);
  }

  getAnimationDelay(): string {
    return `${this.index * 0.15}s`;
  }

  getGradient(): string {
    const languageColors: { [key: string]: [string, string] } = {
      javascript: ['#e5a50a', '#9e7204'],
      typescript: ['#007ACC', '#004f82'],
      python: ['#3776AB', '#1e3c5a'],
      java: ['#ED8B00', '#8c5200'],
      html: ['#E34F26', '#b02a05'],
      css: ['#1572B6', '#0a426e'],
      react: ['#23a1a1', '#115252'],
      angular: ['#DD0031', '#9e0020'],
      scss: ['#c45a67', '#80343e'],
      vue: ['#4FC08D', '#2d8a5e'],
      node: ['#339933', '#1e5c1e'],
      php: ['#777BB4', '#474c7c'],
      'c++': ['#00599C', '#00335e'],
      'c#': ['#239120', '#104d10'],
      ruby: ['#CC342D', '#7d1e19'],
      go: ['#00ADD8', '#007094'],
      rust: ['#CE422B', '#832818'],
      kotlin: ['#7F52FF', '#4c26b8'],
      swift: ['#FA7343', '#b83b14'],
      markdown: ['#1a1a2e', '#16213e'],
    };

    const lang = (this.project?.language || '').toLowerCase().trim();
    const colors = languageColors[lang] || ['#1e1e2f', '#0f0f1b'];
    return `linear-gradient(135deg, ${colors[0]} 0%, ${colors[1]} 100%)`;
  }

  getTechnologyIcon(techName: string): string {
    const normalizedTech = techName.toLowerCase().trim().replace(/\s+/g, '');

    const icons: { [key: string]: string } = {
      // Linguagens
      javascript: 'devicon-javascript-plain',
      typescript: 'devicon-typescript-plain',
      python: 'devicon-python-plain',
      java: 'devicon-java-plain',
      lua: 'devicon-lua-plain',
      dart: 'devicon-dart-plain',
      bash: 'devicon-bash-plain',
      shell: 'devicon-bash-plain',
      sh: 'devicon-bash-plain',
      c: 'devicon-c-plain',
      sqlite: 'devicon-sqlite-plain',

      // Frameworks Frontend
      angular: 'devicon-angular-plain',
      react: 'devicon-react-original',
      vue: 'devicon-vuejs-plain',
      vuejs: 'devicon-vuejs-plain',
      nextjs: 'devicon-nextjs-plain',

      // Frameworks Backend
      nodejs: 'devicon-nodejs-plain',
      node: 'devicon-nodejs-plain',
      express: 'devicon-express-original',
      nestjs: 'devicon-nestjs-original',
      springboot: 'devicon-spring-original',
      quarkus: 'devicon-quarkus-plain',
      hibernate: 'devicon-hibernate-plain',

      // CSS/Styling
      html: 'devicon-html5-plain',
      html5: 'devicon-html5-plain',
      css: 'devicon-css3-plain',
      css3: 'devicon-css3-plain',
      sass: 'devicon-sass-original',
      tailwind: 'devicon-tailwindcss-original',
      tailwindcss: 'devicon-tailwindcss-original',
      bootstrap: 'devicon-bootstrap-plain',
      material: 'devicon-angularmaterial-plain',

      // Databases
      postgresql: 'devicon-postgresql-plain',
      postgres: 'devicon-postgresql-plain',
      mysql: 'devicon-mysql-original',
      mongodb: 'devicon-mongodb-plain',
      redis: 'devicon-redis-plain',
      mariadb: 'devicon-mariadb-original',
      prisma: 'devicon-prisma-original',

      // DevOps/Tools
      docker: 'devicon-docker-plain',
      git: 'devicon-git-plain',
      github: 'devicon-github-original',
      githubactions: 'devicon-githubactions-plain',
      nginx: 'devicon-nginx-original',
      vercel: 'devicon-vercel-original',
      maven: 'devicon-maven-plain',
      npm: 'devicon-npm-original-wordmark',

      // IDEs
      vscode: 'devicon-vscode-plain',
      intellij: 'devicon-intellij-plain',
      eclipse: 'devicon-eclipse-plain',
      neovim: 'devicon-neovim-plain',

      // Testing
      jest: 'devicon-jest-plain',

      // Linux
      linux: 'devicon-linux-plain',
      debian: 'devicon-debian-plain',
      archlinux: 'devicon-archlinux-plain',
      gentoo: 'devicon-gentoo-plain',
    };

    return icons[normalizedTech] || 'devicon-devicon-plain';
  }
}
