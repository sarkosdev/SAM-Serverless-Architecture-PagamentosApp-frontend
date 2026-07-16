import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { DialogModule } from 'primeng/dialog';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import { TextareaModule } from 'primeng/textarea';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { ToastModule } from 'primeng/toast';
import { TooltipModule } from 'primeng/tooltip';
import {ConfirmationService, MessageService} from 'primeng/api';
import { HttpErrorResponse } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { ConfirmDialogModule } from 'primeng/confirmdialog';

import { PagamentosService } from '../../core/services/pagamentos.service';
import { CreatePagamentoRequest, Pagamento, PagamentoStatus } from '../../core/service-models';



@Component({
  selector: 'app-pagamentos-page',
  standalone: true,

  imports: [
    CardModule,
    ButtonModule,
    ReactiveFormsModule,
    DialogModule,
    InputTextModule,
    InputNumberModule,
    TextareaModule,
    CommonModule,
    TableModule,
    TagModule,
    TooltipModule,
    ConfirmDialogModule,
    ToastModule,
  ],
  providers: [
    ConfirmationService, MessageService
  ],
  templateUrl: './processos-page.component.html',
  styleUrl: './processos-page.component.scss'
})


export class ProcessosPageComponent implements OnInit{

  novoProcessoVisible = false;
  aCriarProcesso = false;

  aCarregar = false;

  pagamentos: Pagamento[] = [];

  processoAEliminarId: string | null = null;

  loading = false;

  readonly processoForm: FormGroup;

  constructor(private readonly formBuilder: FormBuilder, private pagamentoService: PagamentosService, private messageService: MessageService) {
    this.processoForm = this.formBuilder.group({
      numeroProcesso: this.formBuilder.nonNullable.control('',[Validators.required,Validators.maxLength(50)]),
      valorProcesso: this.formBuilder.control<number | null>(null,[Validators.required,Validators.min(0.01)]),
    });
  }


  ngOnInit(): void {
    this.loadPagamentos();
  }


  // Load every 'Processos' by userName
  loadPagamentos(): void {
    this.loading = true;

    // LOAD ALL LIST PROCESSOS POR USERNAME
    this.pagamentoService.listPagamentos().subscribe({
      next: (response) => {
        this.pagamentos = response;
      },
      error: () => {
        this.loading = false;
        this.showError('Error', 'Erro ao carregar processos.');
      },
      complete: () => {
        this.loading = false;
      }
    });


  }


  abrirNovoProcesso(): void {
    this.processoForm.reset({
      numeroProcesso: '',
      valorProcesso: null,
    });

    this.novoProcessoVisible = true;
  }

  cancelarNovoProcesso(): void {
    this.novoProcessoVisible = false;

    this.processoForm.reset({
      numeroProcesso: '',
      valorProcesso: null,
    });
  }

  criarProcesso(): void {
    if (this.processoForm.invalid) {
      this.processoForm.markAllAsTouched();
      return;
    }

    const formValue = this.processoForm.getRawValue();

    if (formValue.valorProcesso === null) {
      return;
    }

    const novoProcesso: CreatePagamentoRequest = {
      processNum: formValue.numeroProcesso.trim(),
      processValue: formValue.valorProcesso
    };

    this.aCriarProcesso = true;

    console.log('Processo a criar:', novoProcesso);

    // Temporário, enquanto não estiver ligado ao backend.
    setTimeout(() => {
      this.aCriarProcesso = false;
      this.cancelarNovoProcesso();
    }, 500);
  }

  campoInvalido(nomeCampo: 'numeroProcesso' | 'valorProcesso'): boolean {
    const campo = this.processoForm.get(nomeCampo);

    return Boolean(
      campo &&
      campo.invalid &&
      (campo.dirty || campo.touched)
    );
  }

  obterMensagemErro(nomeCampo: 'numeroProcesso' | 'valorProcesso'): string {
    const campo = this.processoForm.get(nomeCampo);

    if (!campo?.errors) {
      return '';
    }

    if (campo.errors['required']) {
      return 'Este campo é obrigatório.';
    }

    if (campo.errors['min']) {
      return 'O valor deve ser superior a zero.';
    }

    return 'O valor introduzido não é válido.';
  }

  statusSeverity(status: PagamentoStatus): 'success' | 'warn' {
    return status === 'PAGO' ? 'success' : 'warn';
  }



  // SECCAO DA TABELA

  carregarProcessos(): void {}

  obterEstadoApresentado(estado: string): string { return ""}

  obterEstadoSeverity(estado: string): 'success' | 'warn' | 'danger' | 'info' | 'secondary' {return 'success'}

  confirmarEliminacao(pagamento: Pagamento): void {}

  private eliminarProcesso(): void {}


  deletePagamento(): void {}



  // SECCAO DAS MENSAGENS
  // MENSAGEM NO TOPO DE ERRO
  private showError(sumary: string, detail: string): void {
    this.messageService.add({
      severity: 'error',
      summary: sumary,
      detail,
      life: 4000
    });
  }

  // MENSAGEM NO TOPO DE SUCESSO
  private showSuccess(sumary: string, detail: string): void {
    this.messageService.add({
      severity: 'success',
      summary: sumary,
      detail,
      life: 4000
    });
  }


}