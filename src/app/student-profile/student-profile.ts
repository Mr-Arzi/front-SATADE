import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from "@angular/router";

import { EstudianteService } from '../services/estudiante.service';
import { AuthService } from '../services/auth.service';
import { Estudiante } from '../models';

@Component({
  selector: 'app-student-profile',
  imports: [RouterLink, CommonModule],
  templateUrl: './student-profile.html',
  styleUrl: './student-profile.css',
})
export class StudentProfile implements OnInit {
  estudiante: Estudiante | null = null;
  cargando = true;

  isMenuOpen = true;
  isUserMenuOpen = false;
  isNotificationsOpen = false;

  showAbout = false;

  constructor(
    private readonly route: ActivatedRoute,
    private readonly estudianteService: EstudianteService,
    private readonly authService: AuthService
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (!id) {
      this.cargando = false;
      return;
    }

    this.estudianteService.getEstudiantePorId(id).subscribe({
      next: (data) => {
        this.estudiante = data;
        this.cargando = false;
      },
      error: () => {
        this.cargando = false;
      },
    });
  }

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
