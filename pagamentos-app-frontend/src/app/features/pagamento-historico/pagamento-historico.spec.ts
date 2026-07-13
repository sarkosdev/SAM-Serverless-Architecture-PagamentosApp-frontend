import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PagamentoHistorico } from './pagamento-historico';

describe('PagamentoHistorico', () => {
  let component: PagamentoHistorico;
  let fixture: ComponentFixture<PagamentoHistorico>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PagamentoHistorico]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PagamentoHistorico);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
