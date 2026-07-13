import { Routes } from '@angular/router';
import { HomePageComponent } from './features/home/home-page.component';
import { authGuard, guestGuard } from './auth/auth.guard';

export const routes: Routes = [
  {
    path: '',
    component: HomePageComponent,
    canActivate: [guestGuard]
  },
  {
    path: 'pagamentos',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./features/pagamentos/pagamentos-page.component')
        .then(m => m.PagamentosPageComponent)
  },
  {
    path:'pagamento-historico',
    canActivate: [authGuard],
    loadComponent: () => 
      import('./features/pagamento-historico/pagamento-historico')
    .then(m => m.PagamentoHistorico)
  },
  {
    path: '**',
    redirectTo: ''
  }
];