import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

import {
  RouterLink,
  RouterLinkActive,
  RouterOutlet
} from '@angular/router';

import { MenuItem } from 'primeng/api';
import { AvatarModule } from 'primeng/avatar';
import { ButtonModule } from 'primeng/button';
import { DrawerModule } from 'primeng/drawer';
import { MenuModule } from 'primeng/menu';
import { RippleModule } from 'primeng/ripple';
import { TooltipModule } from 'primeng/tooltip';

@Component({
  selector: 'app-layout',
  standalone: true,

  imports: [
    CommonModule,
    RouterOutlet,
    RouterLink,
    RouterLinkActive,

    MenuModule,
    DrawerModule,
    ButtonModule,
    AvatarModule,
    RippleModule,
    TooltipModule
  ],

  templateUrl: './app-layout.component.html',
  styleUrl: './app-layout.component.scss'
})
export class AppLayoutComponent {

  mobileMenuVisible = false;
  sidebarCollapsed = false;

  readonly menuItems: MenuItem[] = [
    {
      label: 'PRINCIPAL',
      items: [
        {
          label: 'Painel de controlo',
          icon: 'pi pi-home',
          routerLink: '/dashboard'
        }
      ]
    },

    {
      label: 'GESTÃO',
      items: [
        {
          label: 'Processos',
          icon: 'pi pi-wallet',
          routerLink: '/processos'
        },
        {
          label: 'Histórico',
          icon: 'pi pi-history',
          routerLink: '/historico'
        }
      ]
    },

  ];

  toggleSidebar(): void {
    this.sidebarCollapsed = !this.sidebarCollapsed;
  }

  openMobileMenu(): void {
    this.mobileMenuVisible = true;
  }

  closeMobileMenu(): void {
    this.mobileMenuVisible = false;
  }

  onMenuItemClick(isMobile: boolean): void {
    if (isMobile) {
      this.closeMobileMenu();
    }
  }
}