import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { DividerModule } from 'primeng/divider';
import { InputTextModule } from 'primeng/inputtext';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';

import { PagamentosService } from '../../core/services/pagamentos.service';
import { Pagamento, PagamentoStatus, PagarPagamentosResponse } from '../../core/service-models';
import { Router, RouterModule } from '@angular/router';
import { InputNumberModule } from 'primeng/inputnumber';


@Component({
  selector: 'app-pagamentos-page',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ButtonModule,
    CardModule,
    DividerModule,
    InputTextModule,
    TableModule,
    TagModule,
    ToastModule,
    RouterModule,
    InputNumberModule
  ],
  providers: [MessageService],
  templateUrl: './pagamentos-page.component.html',
  styleUrl: './pagamentos-page.component.scss'
})
export class PagamentosPageComponent implements OnInit {
  pagamentos: Pagamento[] = [];
  loading = false;

  createForm = {
    processNum: '',
    processValue: ''
  };

  payInput = '';
  payResponse?: PagarPagamentosResponse;

  constructor(
    private pagamentosService: PagamentosService,
    private messageService: MessageService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadPagamentos();
  }

  loadPagamentos(): void {
    this.loading = true;

    this.pagamentosService.listPagamentos().subscribe({
      next: (response) => {
        this.pagamentos = response;
        this.loading = false;
      },
      error: () => {
        this.loading = false;
        this.showError('Erro ao carregar pagamentos.');
      }
    });
  }

  loadByStatus(status: PagamentoStatus): void {
    this.loading = true;

    this.pagamentosService.listPagamentosByStatus(status).subscribe({
      next: (response) => {
        this.pagamentos = response;
        this.loading = false;
      },
      error: () => {
        this.loading = false;
        this.showError(`Erro ao carregar pagamentos com status ${status}.`);
      }
    });
  }

  createPagamento(): void {
    if (!this.createForm.processNum || !this.createForm.processValue) {
      this.showWarn('Preenche o número do processo e o valor.');
      return;
    }

    this.pagamentosService.createPagamento(this.createForm).subscribe({
      next: () => {
        this.showSuccess('Pagamento criado com sucesso.');
        this.createForm = {
          processNum: '',
          processValue: ''
        };
        this.loadPagamentos();
      },
      error: () => {
        this.showError('Erro ao criar pagamento.');
      }
    });
  }

  pagarProcessos(): void {
    const listaProcess = this.payInput
      .split(/[\n,]+/)
      .map(value => value.trim())
      .filter(value => value.length > 0);

    if (listaProcess.length === 0) {
      this.showWarn('Indica pelo menos um número de processo.');
      return;
    }

    this.pagamentosService.pagarProcessos({ listaProcess }).subscribe({
      next: (response) => {
        this.payResponse = response;
        this.showSuccess('Operação de pagamento processada.');
        this.loadPagamentos();
      },
      error: () => {
        this.showError('Erro ao pagar processos.');
      }
    });
  }

  deletePagamento(id: string): void {
    this.pagamentosService.deletePagamentoById(id).subscribe({
      next: () => {
        this.showSuccess('Pagamento apagado com sucesso.');
        this.loadPagamentos();
      },
      error: () => {
        this.showError('Erro ao apagar pagamento.');
      }
    });
  }

  statusSeverity(status: PagamentoStatus): 'success' | 'warn' {
    return status === 'PAGO' ? 'success' : 'warn';
  }

  // Navigate to 'Historico Pagamentos' page
  navigateToHistorico(){
    this.router.navigate(['/pagamento-historico']);
  }

  private showSuccess(detail: string): void {
    this.messageService.add({
      severity: 'success',
      summary: 'Sucesso',
      detail
    });
  }

  private showWarn(detail: string): void {
    this.messageService.add({
      severity: 'warn',
      summary: 'Atenção',
      detail
    });
  }

  private showError(detail: string): void {
    this.messageService.add({
      severity: 'error',
      summary: 'Erro',
      detail
    });
  }
}