import { Component, HostListener, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Navbar } from './navbar/navbar';
import { Footer } from './footer/footer';
import { TerminalComponent } from '../../features/terminal/terminal';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-layout',
  imports: [RouterOutlet, Navbar, Footer, TerminalComponent, MatButtonModule, MatIconModule],
  templateUrl: './layout.html',
  styleUrl: './layout.scss',
})
export class Layout {
  isTerminalOpen = signal(false);

  toggleTerminal(): void {
    this.isTerminalOpen.update((v) => !v);
  }

  closeTerminal(): void {
    this.isTerminalOpen.set(false);
  }

  @HostListener('window:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent): void {
    // Atalho: Ctrl + Alt + T ou Ctrl + ` para abrir o terminal
    if ((event.ctrlKey && event.altKey && event.key.toLowerCase() === 't') || (event.ctrlKey && event.key === '`')) {
      event.preventDefault();
      this.toggleTerminal();
    }
  }
}
