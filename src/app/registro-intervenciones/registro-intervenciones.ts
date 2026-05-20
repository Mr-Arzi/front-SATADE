import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from "@angular/router";
import { NgFor, NgIf } from '@angular/common';

import { AlertaService } from '../services/alerta.service';
import { Intervencion } from '../models';

@Component({
  selector: 'app-registro-intervenciones',
  imports: [RouterLink, NgFor, NgIf],
  templateUrl: './registro-intervenciones.html',
  styleUrl: './registro-intervenciones.css',
})
export class RegistroIntervenciones implements OnInit {
  intervenciones: Intervencion[] = [];
  cargando = true;
  estudianteId: number | null = null;
  isMenuOpen = true;
  isUserMenuOpen = false;
  isNotificationsOpen = false;

  showAbout = false;

  constructor(private route: ActivatedRoute, private alertaService: AlertaService) {}

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

  ngOnInit(): void {
    const param = this.route.snapshot.queryParamMap.get('estudianteId');
    this.estudianteId = param ? Number(param) : null;
    if (!this.estudianteId) {
      this.cargando = false;
      return;
    }

    this.alertaService.getIntervencionesPorEstudiante(this.estudianteId).subscribe({
      next: (data) => {
        this.intervenciones = data;
        this.cargando = false;
      },
      error: () => {
        this.cargando = false;
      },
    });
  }

}
