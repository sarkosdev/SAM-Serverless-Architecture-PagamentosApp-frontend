import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { CreatePagamentoRequest, Pagamento, PagamentoStatus, PagarPagamentosRequest, PagarPagamentosResponse } from '../service-models';



@Injectable({
  providedIn: 'root'
})
export class PagamentosService {
    
  private readonly apiUrl = `${environment.apiBaseUrl}/pagamentos`;

  constructor(private http: HttpClient) {}

  listPagamentos(): Observable<Pagamento[]> {
    return this.http.get<Pagamento[]>(this.apiUrl);
  }

  getPagamentoById(id: string): Observable<Pagamento> {
    return this.http.get<Pagamento>(`${this.apiUrl}/${id}`);
  }

  listPagamentosByStatus(status: PagamentoStatus): Observable<Pagamento[]> {
    return this.http.get<Pagamento[]>(`${this.apiUrl}/status/${status}`);
  }

  createPagamento(request: CreatePagamentoRequest): Observable<Pagamento> {
    return this.http.post<Pagamento>(this.apiUrl, request);
  }

  pagarProcessos(request: PagarPagamentosRequest): Observable<PagarPagamentosResponse> {
    return this.http.post<PagarPagamentosResponse>(`${this.apiUrl}/pagar`, request);
  }

  deletePagamentoById(id: string): Observable<{ message: string; id: string }> {
    return this.http.delete<{ message: string; id: string }>(`${this.apiUrl}/${id}`);
  }

  deletePagamentoByProcessNum(processNum: string): Observable<{ message: string; processNum: string }> {
    return this.http.delete<{ message: string; processNum: string }>(
      `${this.apiUrl}/process/${encodeURIComponent(processNum)}`
    );
  }
}