import { Component, OnInit } from '@angular/core';
import { Router,RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';

@Component({
  selector: 'app-pagamento-historico',
  standalone: true,
  imports: [
    TableModule,
    RouterModule,
    ButtonModule
  ],
  templateUrl: './pagamento-historico.html',
  styleUrl: './pagamento-historico.scss',
})
export class PagamentoHistorico implements OnInit{

  historico: any;
  loading: any;


  constructor(private router: Router){}


    ngOnInit(): void {
      this.loadHistoricoPagamentosByUser();
    }


  // Navigate back to Home page
  navigateBackHome(){
    this.router.navigate(['/pagamentos']);
  }

  // Carrega lista de historico de pagamentos
  private loadHistoricoPagamentosByUser(){
    console.log("load lista de historico de pagamentos");
  }

}
