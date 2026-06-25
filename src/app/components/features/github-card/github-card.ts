import { Component, Input, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-github-card',
  standalone: true,
  imports: [MatIconModule, MatButtonModule, MatSnackBarModule, CommonModule],
  templateUrl: './github-card.html',
  styleUrls: ['./github-card.scss'],
})
export class GitHubCard implements OnInit {
  @Input() repoName: string = 'Nome do Repositório';
  @Input() username: string = 'MrClaro';
  @Input() language: string = 'TypeScript';
  @Input() stars: number = 0;
  @Input() description: string = 'Uma breve descrição do projeto.';
  @Input() date: string = 'Out 24';
  @Input() imageUrl: string = '';
  @Input() githubUrl: string = '';
  @Input() topics: string[] = [];

  public deviconClass: string = '';
  public isStarred: boolean = false;

  constructor(private snackBar: MatSnackBar) {}

  ngOnInit(): void {
    this.setDeviconClass();
  }

  private setDeviconClass(): void {
    const languageMap: { [key: string]: string } = {
      javascript: 'devicon-javascript-plain colored',
      typescript: 'devicon-typescript-plain colored',
      python: 'devicon-python-plain colored',
      java: 'devicon-java-plain colored',
      lua: 'devicon-lua-plain colored',
      dart: 'devicon-dart-plain colored',
      bash: 'devicon-bash-plain colored',
      shell: 'devicon-bash-plain colored',
      sh: 'devicon-bash-plain colored',
      c: 'devicon-c-plain colored',
      'c++': 'devicon-cplusplus-plain colored',
      'c#': 'devicon-csharp-plain colored',
      ruby: 'devicon-ruby-plain colored',
      go: 'devicon-go-original-wordmark colored',
      rust: 'devicon-rust-plain colored',
      kotlin: 'devicon-kotlin-plain colored',
      swift: 'devicon-swift-plain colored',
      php: 'devicon-php-plain colored',
      html: 'devicon-html5-plain colored',
      css: 'devicon-css3-plain colored',
      scss: 'devicon-sass-original colored',
      sass: 'devicon-sass-original colored',
      react: 'devicon-react-original colored',
      angular: 'devicon-angularjs-plain colored',
      vue: 'devicon-vuejs-plain colored',
      node: 'devicon-nodejs-plain colored',
      docker: 'devicon-docker-plain colored',
      git: 'devicon-git-plain colored',
      sqlite: 'devicon-sqlite-plain colored',
      markdown: 'devicon-markdown-original colored',
    };

    const lang = this.language.toLowerCase().trim();
    this.deviconClass = languageMap[lang] || 'devicon-github-original colored';
  }

  getGradient(): string {
    const languageColors: { [key: string]: [string, string] } = {
      javascript: ['#e5a50a', '#9e7204'],
      typescript: ['#007ACC', '#004f82'],
      python: ['#3776AB', '#1e3c5a'],
      java: ['#ED8B00', '#8c5200'],
      lua: ['#000080', '#000033'],
      dart: ['#00B4AB', '#005f5a'],
      bash: ['#4EAA25', '#245210'],
      shell: ['#4EAA25', '#245210'],
      sh: ['#4EAA25', '#245210'],
      c: ['#A8B9CC', '#4a5968'],
      'c++': ['#00599C', '#00335e'],
      'c#': ['#239120', '#104d10'],
      ruby: ['#CC342D', '#7d1e19'],
      go: ['#00ADD8', '#007094'],
      rust: ['#CE422B', '#832818'],
      kotlin: ['#7F52FF', '#4c26b8'],
      swift: ['#FA7343', '#b83b14'],
      php: ['#777BB4', '#474c7c'],
      html: ['#E34F26', '#b02a05'],
      css: ['#1572B6', '#0a426e'],
      scss: ['#c45a67', '#80343e'],
      sass: ['#c45a67', '#80343e'],
      react: ['#23a1a1', '#115252'],
      angular: ['#DD0031', '#9e0020'],
      vue: ['#4FC08D', '#2d8a5e'],
      node: ['#339933', '#1e5c1e'],
      docker: ['#2496ED', '#0f5282'],
      git: ['#F05032', '#7a2211'],
      sqlite: ['#003B57', '#001a26'],
      markdown: ['#1a1a2e', '#16213e'],
    };

    const lang = this.language.toLowerCase().trim();
    const colors = languageColors[lang] || ['#1e1e2f', '#0f0f1b'];
    return `linear-gradient(135deg, ${colors[0]} 0%, ${colors[1]} 100%)`;
  }

  copyToClipboard(): void {
    const url = this.githubUrl || `https://github.com/${this.username}/${this.repoName}`;

    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard
        .writeText(url)
        .then(() => {
          this.showSnackBar('Link copiado! 📋');
        })
        .catch(() => {
          this.fallbackCopy(url);
        });
    } else {
      this.fallbackCopy(url);
    }
  }

  private fallbackCopy(text: string): void {
    const textArea = document.createElement('textarea');
    textArea.value = text;
    textArea.style.position = 'fixed';
    textArea.style.left = '-999999px';
    document.body.appendChild(textArea);
    textArea.select();

    try {
      document.execCommand('copy');
      this.showSnackBar('Link copiado! 📋');
    } catch (err) {
      this.showSnackBar('Erro ao copiar link');
    }

    document.body.removeChild(textArea);
  }

  toggleStar(): void {
    this.isStarred = !this.isStarred;
    const message = this.isStarred ? 'Adicionado aos favoritos! ⭐' : 'Removido dos favoritos';
    this.showSnackBar(message);
  }

  share(): void {
    const url = this.githubUrl || `https://github.com/${this.username}/${this.repoName}`;

    if (navigator.share) {
      navigator
        .share({
          title: this.repoName,
          text: this.description,
          url: url,
        })
        .then(() => {
          this.showSnackBar('Compartilhado com sucesso! 🚀');
        })
        .catch(() => {
          this.copyToClipboard();
        });
    } else {
      this.copyToClipboard();
    }
  }

  openGithub(): void {
    const url = this.githubUrl || `https://github.com/${this.username}/${this.repoName}`;
    window.open(url, '_blank');
  }

  private showSnackBar(message: string): void {
    this.snackBar.open(message, 'Fechar', {
      duration: 3000,
      horizontalPosition: 'center',
      verticalPosition: 'bottom',
    });
  }
}
