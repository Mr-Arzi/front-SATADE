import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from "@angular/router";
import { NgFor, NgIf } from '@angular/common';

import { EstudianteService } from '../services/estudiante.service';
import { Estudiante } from '../models';

@Component({
  selector: 'app-student',
  imports: [RouterLink, NgFor, NgIf],
  templateUrl: './student.html',
  styleUrl: './student.css',
})
export class Student implements OnInit {
  estudiantes: Estudiante[] = [];
  cargando = true;

  constructor(private router: Router, private estudianteService: EstudianteService) {}

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

  goToProfile(studentName: string) {
    if (studentName === 'Tamara Torres Trujillo') {
      this.router.navigate(['/perfil-estudiante']);
    }
  }
}
