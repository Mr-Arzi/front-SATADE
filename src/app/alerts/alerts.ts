import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-alerts',
  imports: [RouterLink, NgIf],
  templateUrl: './alerts.html',
  styleUrl: './alerts.css',
})
export class Alerts {
  constructor(private router: Router) {}

  isMenuOpen = true;
  isUserMenuOpen = false;
  isNotificationsOpen = false;
  showAbout = false;

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

  // ====== POPUP INTERVENCIÓN ======
  showIntervention = false;
  selectedStudent: string | null = null;

  abrirIntervencion(nombre: string) {
    this.selectedStudent = nombre;
    this.showIntervention = true;
  }

  cerrarIntervencion() {
    this.showIntervention = false;
    this.selectedStudent = null;
  }

  goToHistory(studentName: string) {
    if (studentName === 'Luis Rivera Martínez') {
      this.router.navigate(['/registro-intervenciones']);
    }
  }

}

