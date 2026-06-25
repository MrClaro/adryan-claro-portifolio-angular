import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { HttpClient } from '@angular/common/http';
import { NGXLogger } from 'ngx-logger';
import { PORTFOLIO_CONFIG } from '../../../config/portfolio.config';
import { LanguageService } from '../../../services/language.service';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatSnackBarModule,
  ],
  templateUrl: './contact.html',
  styleUrls: ['./contact.scss'],
})
export class Contact {
  contactForm: FormGroup;
  isSubmitting = false;

  protected readonly langService = inject(LanguageService);
  private readonly fb = inject(FormBuilder);
  private readonly snackBar = inject(MatSnackBar);
  private readonly logger = inject(NGXLogger);
  private readonly http = inject(HttpClient);

  get contactInfo() {
    this.langService.currentLanguage();
    return PORTFOLIO_CONFIG.contactInfo.map((info) => ({
      icon: info.icon,
      title: this.langService.translate(info.title),
      value: info.value,
      link: info.link,
      type: info.type,
    }));
  }

  get socialLinks() {
    return PORTFOLIO_CONFIG.socialLinks;
  }

  constructor() {
    this.contactForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      subject: ['', [Validators.required, Validators.minLength(5)]],
      message: ['', [Validators.required, Validators.minLength(10)]],
    });
  }

  onSubmit(): void {
    if (this.contactForm.valid && !this.isSubmitting) {
      this.isSubmitting = true;

      const emailRecipient = PORTFOLIO_CONFIG.profile.email;
      const body = {
        name: this.contactForm.value.name,
        email: this.contactForm.value.email,
        _subject: `[Portfólio Contato] ${this.contactForm.value.subject}`,
        message: this.contactForm.value.message,
      };

      this.http.post(`https://formsubmit.co/ajax/${emailRecipient}`, body)
        .subscribe({
          next: () => {
            this.logger.info('Formulário de contato enviado com sucesso via FormSubmit.');

            const successMsg = this.langService.isPt()
              ? 'Mensagem enviada com sucesso! Retornarei em breve.'
              : 'Message sent successfully! I will get back to you soon.';

            this.snackBar.open(successMsg, this.langService.isPt() ? 'Fechar' : 'Close', {
              duration: 5000,
              horizontalPosition: 'center',
              verticalPosition: 'top',
              panelClass: ['success-snackbar'],
            });

            this.contactForm.reset();
            this.isSubmitting = false;
          },
          error: (error) => {
            this.logger.error('Erro ao enviar formulário de contato:', error);

            const errorMsg = this.langService.isPt()
              ? 'Ocorreu um erro ao enviar sua mensagem. Tente novamente mais tarde.'
              : 'An error occurred while sending your message. Please try again later.';

            this.snackBar.open(errorMsg, this.langService.isPt() ? 'Fechar' : 'Close', {
              duration: 5000,
              horizontalPosition: 'center',
              verticalPosition: 'top',
              panelClass: ['error-snackbar'],
            });

            this.isSubmitting = false;
          }
        });
    } else {
      const errorMsg = this.langService.isPt()
        ? 'Por favor, preencha todos os campos corretamente.'
        : 'Please fill in all fields correctly.';

      this.snackBar.open(errorMsg, this.langService.isPt() ? 'Fechar' : 'Close', {
        duration: 3000,
        horizontalPosition: 'center',
        verticalPosition: 'top',
        panelClass: ['error-snackbar'],
      });
    }
  }

  downloadResume(): void {
    const resumePath = '/curriculo_adryan_claro.pdf';
    const link = document.createElement('a');
    link.href = resumePath;
    link.download = 'curriculo_adryan_claro.pdf';
    link.click();

    const resumeMsg = this.langService.isPt()
      ? 'Download do currículo iniciado!'
      : 'Resume download started!';

    this.snackBar.open(resumeMsg, this.langService.isPt() ? 'Fechar' : 'Close', {
      duration: 3000,
      horizontalPosition: 'center',
      verticalPosition: 'top',
      panelClass: ['info-snackbar'],
    });
  }

  openLink(url: string): void {
    window.open(url, '_blank', 'noopener,noreferrer');
  }

  getAnimationDelay(index: number): string {
    return `${index * 0.1}s`;
  }
}
