import { Component, inject } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [ButtonModule],
  template: `
    <main class="home-page">
      <section class="hero-card">
        <p class="eyebrow">Serverless Payments</p>

        <h1>Pagamentos App</h1>

        <p class="subtitle">
          Plataforma empresarial para gestão de pagamentos, protegida por Amazon Cognito.
        </p>

        <button
          pButton
          type="button"
          label="Sign In"
          icon="pi pi-sign-in"
          (click)="signIn()">
        </button>
      </section>
    </main>
  `,
  styles: [`
    .home-page {
      min-height: 100vh;
      display: grid;
      place-items: center;
      padding: 2rem;
      background:
        radial-gradient(circle at top left, rgba(59, 130, 246, 0.18), transparent 32rem),
        linear-gradient(135deg, #0f172a, #111827);
    }

    .hero-card {
      width: min(720px, 100%);
      padding: 3rem;
      border-radius: 28px;
      background: rgba(255, 255, 255, 0.96);
      box-shadow: 0 24px 80px rgba(15, 23, 42, 0.35);
      text-align: center;
    }

    .eyebrow {
      margin: 0 0 1rem;
      font-weight: 700;
      letter-spacing: 0.12em;
      text-transform: uppercase;
      color: #2563eb;
    }

    h1 {
      margin: 0;
      font-size: clamp(2.5rem, 7vw, 4.5rem);
      color: #0f172a;
    }

    .subtitle {
      margin: 1.25rem auto 2rem;
      max-width: 520px;
      color: #475569;
      font-size: 1.1rem;
      line-height: 1.7;
    }
  `]
})
export class HomePageComponent {
  private readonly authService = inject(AuthService);

  signIn(): void {
    this.authService.login();
  }
}