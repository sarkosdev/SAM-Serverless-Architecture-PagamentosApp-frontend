import { Component } from '@angular/core';
import { CardModule } from 'primeng/card';

@Component({
  selector: 'app-dashboard-page',
  standalone: true,
  imports: [CardModule],

  template: `
    <section class="page">
      <header class="page-header">
        <div>
          <span class="page-eyebrow">
            PRINCIPAL
          </span>

          <h1>Página Principal</h1>

          <p>
            Visão geral da aplicação de pagamentos.
          </p>
        </div>
      </header>

      <p-card header="Bem-vindo">
        <p>
          Esta é a página principal da aplicação.
        </p>

        <p>
          O menu lateral continua presente porque esta página
          está configurada como rota filha do AppLayoutComponent.
        </p>
      </p-card>
    </section>
  `
})
export class DashboardPageComponent {}