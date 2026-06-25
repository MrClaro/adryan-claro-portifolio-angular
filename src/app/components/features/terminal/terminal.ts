import { Component, ElementRef, HostListener, ViewChild, inject, signal, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { LanguageService } from '../../../services/language.service';
import { PORTFOLIO_CONFIG } from '../../../config/portfolio.config';

interface TerminalLine {
  text: string;
  type: 'input' | 'output' | 'error' | 'success' | 'ascii';
}

@Component({
  selector: 'app-terminal',
  standalone: true,
  imports: [CommonModule, FormsModule, MatIconModule],
  templateUrl: './terminal.html',
  styleUrls: ['./terminal.scss'],
})
export class TerminalComponent {
  protected readonly langService = inject(LanguageService);
  
  close = output<void>();

  @ViewChild('historyContainer') private historyContainer!: ElementRef;
  @ViewChild('cmdInput') private cmdInput!: ElementRef;

  inputValue = '';
  history = signal<TerminalLine[]>([
    { text: '🎩 O Dev de Chapéu OS [Version 1.0.0]', type: 'success' },
    { text: 'Copyright (c) 2026 Adryan Claro. All rights reserved.', type: 'output' },
    { text: '', type: 'output' },
    { text: 'Type "help" to see available commands.', type: 'success' },
    { text: '', type: 'output' },
  ]);

  commandList = [
    { name: 'help', desc: { pt: 'Mostra todos os comandos disponíveis', en: 'Show all available commands' } },
    { name: 'about', desc: { pt: 'Sobre o desenvolvedor', en: 'About the developer' } },
    { name: 'skills', desc: { pt: 'Lista as principais tecnologias dominadas', en: 'List core mastered technologies' } },
    { name: 'projects', desc: { pt: 'Mostra os projetos em destaque', en: 'Show featured projects' } },
    { name: 'neovim', desc: { pt: 'Abre o melhor editor de texto do universo', en: 'Open the best text editor in the universe' } },
    { name: 'clear', desc: { pt: 'Limpa a tela do terminal', en: 'Clear the terminal screen' } },
    { name: 'exit', desc: { pt: 'Fecha o terminal', en: 'Close the terminal window' } },
  ];

  @HostListener('click')
  focusInput(): void {
    if (this.cmdInput) {
      this.cmdInput.nativeElement.focus();
    }
  }

  handleCommand(event: Event): void {
    event.preventDefault();
    const cmd = this.inputValue.trim().toLowerCase();
    if (!cmd) return;

    // Adiciona o comando digitado ao histórico
    this.history.update((prev) => [...prev, { text: `guest@hat-os:~$ ${this.inputValue}`, type: 'input' }]);
    this.inputValue = '';

    // Processa a resposta
    setTimeout(() => {
      this.executeCommand(cmd);
      this.scrollToBottom();
    }, 50);
  }

  private executeCommand(cmd: string): void {
    switch (cmd) {
      case 'help':
        this.printHelp();
        break;
      case 'about':
        this.printAbout();
        break;
      case 'skills':
        this.printSkills();
        break;
      case 'projects':
        this.printProjects();
        break;
      case 'neovim':
        this.printNeovim();
        break;
      case 'clear':
        this.history.set([]);
        break;
      case 'exit':
        this.close.emit();
        break;
      default:
        this.history.update((prev) => [
          ...prev,
          {
            text: this.langService.isPt()
              ? `Comando não reconhecido: "${cmd}". Digite "help" para ver a lista de comandos.`
              : `Command not found: "${cmd}". Type "help" for a list of commands.`,
            type: 'error',
          },
        ]);
    }
  }

  private printHelp(): void {
    this.history.update((prev) => {
      const lines = [...prev];
      lines.push({ text: this.langService.isPt() ? 'Comandos Disponíveis:' : 'Available Commands:', type: 'success' });
      this.commandList.forEach((c) => {
        lines.push({
          text: `  ${c.name.padEnd(10)} - ${this.langService.translate(c.desc)}`,
          type: 'output',
        });
      });
      return lines;
    });
  }

  private printAbout(): void {
    this.history.update((prev) => [
      ...prev,
      { text: `Adryan Claro - ${this.langService.translate(PORTFOLIO_CONFIG.profile.title)}`, type: 'success' },
      { text: `Location: ${PORTFOLIO_CONFIG.profile.location}`, type: 'output' },
      { text: `Email: ${PORTFOLIO_CONFIG.profile.email}`, type: 'output' },
      { text: `Phone: ${PORTFOLIO_CONFIG.profile.phone}`, type: 'output' },
      { text: '', type: 'output' },
      { text: this.langService.translate(PORTFOLIO_CONFIG.profile.bio), type: 'output' },
    ]);
  }

  private printSkills(): void {
    this.history.update((prev) => [
      ...prev,
      { text: this.langService.isPt() ? 'Habilidades Técnicas:' : 'Core Tech Stack:', type: 'success' },
      { text: PORTFOLIO_CONFIG.profile.skills.join('  |  '), type: 'output' },
    ]);
  }

  private printProjects(): void {
    this.history.update((prev) => {
      const lines = [...prev];
      lines.push({
        text: this.langService.isPt() ? 'Projetos em Destaque:' : 'Featured Projects:',
        type: 'success',
      });
      PORTFOLIO_CONFIG.featuredProjects.forEach((p) => {
        lines.push({
          text: `• ${this.langService.translate(p.title)}`,
          type: 'success',
        });
        lines.push({
          text: `  ${this.langService.translate(p.description)}`,
          type: 'output',
        });
        lines.push({
          text: `  Repo: ${p.githubUrl}`,
          type: 'output',
        });
      });
      return lines;
    });
  }

  private printNeovim(): void {
    const nvimAscii = [
      '   _   _                    _          ',
      '  | \\ | | ___  _____   _(_)_ __ ___  ',
      '  |  \\| |/ _ \\/ _ \\ \\ / / | \'_ ` _ \\ ',
      '  | |\\  |  __/ (_) \\ V /| | | | | | |',
      '  |_| \\_|\\___|\\___/ \\_/ |_|_| |_| |_|',
      '                                       ',
      '  Neovim loaded successfully! 🚀       ',
      '  Modo Vim ativado em sua mente.       ',
      '  Digite :q ou "exit" para sair.       ',
    ];
    this.history.update((prev) => {
      const lines = [...prev];
      nvimAscii.forEach((l) => lines.push({ text: l, type: 'ascii' }));
      return lines;
    });
  }

  private scrollToBottom(): void {
    try {
      setTimeout(() => {
        this.historyContainer.nativeElement.scrollTop = this.historyContainer.nativeElement.scrollHeight;
      }, 20);
    } catch (err) {}
  }
}
