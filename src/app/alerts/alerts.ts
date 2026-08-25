import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { AlertaService } from '../services/alerta.service';
import { AuthService } from '../services/auth.service';
import { Alerta } from '../models';

@Component({
  selector: 'app-alerts',
  imports: [RouterLink, CommonModule, FormsModule],
  templateUrl: './alerts.html',
  styleUrl: './alerts.css',
})
export class Alerts implements OnInit {
  constructor(
    private readonly router: Router,
    private readonly alertaService: AlertaService,
    private readonly authService: AuthService
  ) {}

  alertas: Alerta[] = [];
  cargando = true;

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

  // ====== POPUP INTERVENCIÓN ======
  showIntervention = false;
  selectedStudent: string | null = null;
  selectedStudentId: number | null = null;
  tipoIntervencion = '';
  fechaIntervencion = '';
  responsableIntervencion = '';
  guardandoIntervencion = false;
  errorIntervencion = '';

  ngOnInit(): void {
    this.alertaService.getAlertas().subscribe({
      next: (data) => {
        this.alertas = data;
        this.cargando = false;
      },
      error: () => {
        this.cargando = false;
      },
    });
  }

  abrirIntervencion(nombre: string, estudianteId?: number) {
    this.selectedStudent = nombre;
    this.selectedStudentId = estudianteId ?? null;
    this.errorIntervencion = '';
    this.showIntervention = true;
  }

  cerrarIntervencion() {
    this.showIntervention = false;
    this.selectedStudent = null;
    this.selectedStudentId = null;
    this.tipoIntervencion = '';
    this.fechaIntervencion = '';
    this.responsableIntervencion = '';
    this.guardandoIntervencion = false;
    this.errorIntervencion = '';
  }

  guardarIntervencion() {
    if (this.guardandoIntervencion) {
      return;
    }

    if (!this.selectedStudentId || !this.tipoIntervencion || !this.fechaIntervencion || !this.responsableIntervencion) {
      this.errorIntervencion = 'Completa todos los campos para guardar la intervencion.';
      return;
    }

    this.guardandoIntervencion = true;
    this.errorIntervencion = '';

    this.alertaService
      .registrarIntervencion({
        estudianteId: this.selectedStudentId,
        tipo: this.tipoIntervencion,
        fecha: this.fechaIntervencion,
        responsable: this.responsableIntervencion,
        notas: '',
      })
      .subscribe({
        next: () => {
          this.guardandoIntervencion = false;
          this.cerrarIntervencion();
        },
        error: () => {
          this.guardandoIntervencion = false;
          this.errorIntervencion = 'No se pudo guardar la intervencion.';
        },
      });
  }

  goToHistory(alerta: Alerta) {
    if (!alerta?.estudianteId) {
      return;
    }

    this.router.navigate(['/registro-intervenciones'], {
      queryParams: { estudianteId: alerta.estudianteId },
    });
  }

}

