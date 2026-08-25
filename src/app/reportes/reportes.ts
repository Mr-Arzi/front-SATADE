import { Component } from '@angular/core';
import { RouterLink } from "@angular/router";
import { NgIf } from '@angular/common';

import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-reportes',
  imports: [RouterLink, NgIf],
  templateUrl: './reportes.html',
  styleUrl: './reportes.css',
})
export class Reportes {
  isMenuOpen = true;
  isUserMenuOpen = false;
  isNotificationsOpen = false;

  showAbout = false;

  constructor(private readonly authService: AuthService) {}

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  toggleUserMenu() {
    this.isUserMenuOpen = !this.isUserMenuOpen;
    if (this.isUserMenuOpen) {
      this.isNotificationsOpen = false;
    }
  }

  closeUserMenu() {
    this.isUserMenuOpen = false;
  }

  cerrarSesion() {
    this.closeUserMenu();
    this.authService.logout();
  }

  toggleNotifications() {
    this.isNotificationsOpen = !this.isNotificationsOpen;
    if (this.isNotificationsOpen) {
      this.isUserMenuOpen = false;
    }
  }

  closeNotifications() {
    this.isNotificationsOpen = false;
  }

  openAbout() {
    this.showAbout = true;
  }

  closeAbout() {
    this.showAbout = false;
  }


}
