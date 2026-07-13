import { Component, inject } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [ButtonModule],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss'
})
export class HomePageComponent {
  private readonly authService = inject(AuthService);

  signIn(): void {
    this.authService.login();
  }
}