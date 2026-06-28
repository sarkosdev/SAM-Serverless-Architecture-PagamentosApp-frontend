export type PagamentoStatus = 'PENDING' | 'PAGO';

export interface Pagamento {
  id: string;
  processNum: string;
  processValue: string;
  status: PagamentoStatus;
  createdAt: string;
}

export interface CreatePagamentoRequest {
  processNum: string;
  processValue: string;
}

export interface PagarPagamentosRequest {
  listaProcess: string[];
}

export interface PagamentoPago {
  processNum: string;
  processValue: string;
}

export interface PagarPagamentosResponse {
  total: string;
  pagamentosPagos: PagamentoPago[];
  alreadyPaid: string[];
  notFound: string[];
}