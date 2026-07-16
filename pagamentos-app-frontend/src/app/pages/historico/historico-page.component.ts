import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';

@Component({
  selector: 'app-historico-page',
  standalone: true,

  imports: [
    CardModule,
    ButtonModule
  ],

  templateUrl: './historico-page.component.html',
  styleUrl: './historico-page.component.scss' 
})
export class HistoricoPageComponent {}