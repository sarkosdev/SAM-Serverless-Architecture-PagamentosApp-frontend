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
  },
];


/*
export const routes: Routes = [
   {
    path: 'login',
    component: HomePageComponent,
    canActivate: [guestGuard]
  },
  {
    path: '',
    canActivate: [authGuard],
    canActivateChild: [authGuard],
    loadComponent: () =>
      import('./layout/app-layout.component').then(
        component => component.AppLayoutComponent
      ),

    children: [
      {
        path: 'dashboard',
        title: 'Painel de controlo',
        loadComponent: () =>
          import('./pages/dashboard/dashboard-page.component').then(
            component => component.DashboardPageComponent
          )
      },

      {
        path: 'processos',
        title: 'Processos',
        loadComponent: () =>
          import('./pages/processos/processos-page.component').then(
            component => component.ProcessosPageComponent
          )
      },

      {
        path: 'historico',
        title: 'Histórico',
        loadComponent: () =>
          import('./pages/historico/historico-page.component').then(
            component => component.HistoricoPageComponent
          )
      },

      // Rota invalida
      {
        path: '**',
        redirectTo: 'login'
      }
    ]
  }
];
*/