import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from "@angular/router";
import { CommonModule } from '@angular/common';

import { EstudianteService } from '../services/estudiante.service';
import { AuthService } from '../services/auth.service';
import { Estudiante } from '../models';

@Component({
  selector: 'app-student',
  imports: [RouterLink, CommonModule],
  templateUrl: './student.html',
  styleUrl: './student.css',
})
export class Student implements OnInit {
  estudiantes: Estudiante[] = [];
  cargando = true;
  eliminandoId: number | null = null;
  errorEliminar = '';

  constructor(
    private readonly router: Router,
    private readonly estudianteService: EstudianteService,
    private readonly authService: AuthService
  ) {}

  isMenuOpen = true;
  isUserMenuOpen = false;
  isNotificationsOpen = false;
  openActionMenu: number | null = null;

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

  toggleActionMenu(rowId: number) {
    this.openActionMenu = this.openActionMenu === rowId ? null : rowId;
  }

  closeActionMenu() {
    this.openActionMenu = null;
  }

  openAbout() {
    this.showAbout = true;
  }

  closeAbout() {
    this.showAbout = false;
  }

  ngOnInit(): void {
    this.estudianteService.getEstudiantes().subscribe({
      next: (data) => {
        this.estudiantes = data;
        this.cargando = false;
      },
      error: () => {
        this.cargando = false;
      },
    });
  }

  goToProfile(studentId: number) {
    this.router.navigate(['/perfil-estudiante', studentId]);
  }

  editarEstudiante(id: number) {
    this.closeActionMenu();
    this.router.navigate(['/registrar', id]);
  }

  eliminarEstudiante(id: number) {
    this.closeActionMenu();

    const confirmado = confirm('¿Deseas eliminar este estudiante? Esta acción no se puede deshacer.');
    if (!confirmado) {
      return;
    }

    this.eliminandoId = id;
    this.errorEliminar = '';

    this.estudianteService.eliminarEstudiante(id).subscribe({
      next: () => {
        this.eliminandoId = null;
        this.estudiantes = this.estudiantes.filter((estudiante) => estudiante.id !== id);
      },
      error: () => {
        this.eliminandoId = null;
        this.errorEliminar = 'No se pudo eliminar el estudiante. Intenta nuevamente.';
      },
    });
  }
}
