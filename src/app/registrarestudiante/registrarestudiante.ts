import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from "@angular/router";
import { NgIf } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

import { EstudianteService } from '../services/estudiante.service';
import { AuthService } from '../services/auth.service';
import { Estudiante } from '../models';

@Component({
  selector: 'app-registrarestudiante',
  imports: [RouterLink, NgIf, ReactiveFormsModule],
  templateUrl: './registrarestudiante.html',
  styleUrl: './registrarestudiante.css',
})
export class Registrarestudiante implements OnInit {
  isMenuOpen = true;
  isUserMenuOpen = false;
  isNotificationsOpen = false;

  showAbout = false;

  registroForm: FormGroup;
  guardando = false;
  cargandoEstudiante = false;
  errorGuardado = '';
  exitoGuardado = false;

  modoEdicion = false;
  estudianteId: number | null = null;

  constructor(
    private readonly fb: FormBuilder,
    private readonly estudianteService: EstudianteService,
    private readonly router: Router,
    private readonly route: ActivatedRoute,
    private readonly authService: AuthService
  ) {
    this.registroForm = this.fb.group({
      nombre: ['', [Validators.required, Validators.minLength(3)]],
      matricula: ['', Validators.required],
      carrera: ['', Validators.required],
      grupo: ['', Validators.required],
      tutor: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    const param = this.route.snapshot.paramMap.get('id');
    if (!param) {
      return;
    }

    this.modoEdicion = true;
    this.estudianteId = Number(param);
    this.cargandoEstudiante = true;

    this.estudianteService.getEstudiantePorId(this.estudianteId).subscribe({
      next: (estudiante) => {
        this.registroForm.patchValue({
          nombre: estudiante.nombre,
          matricula: estudiante.matricula,
          carrera: estudiante.carrera,
          grupo: estudiante.grupo,
          tutor: estudiante.tutor,
        });
        this.cargandoEstudiante = false;
      },
      error: () => {
        this.errorGuardado = 'No se pudo cargar el estudiante a editar.';
        this.cargandoEstudiante = false;
      },
    });
  }

  campoInvalido(campo: string): boolean {
    const control = this.registroForm.get(campo);
    return !!control && control.invalid && (control.dirty || control.touched);
  }

  guardar(): void {
    if (this.guardando || this.cargandoEstudiante) {
      return;
    }

    if (this.registroForm.invalid) {
      this.registroForm.markAllAsTouched();
      return;
    }

    this.guardando = true;
    this.errorGuardado = '';
    this.exitoGuardado = false;

    const data: Partial<Estudiante> = this.registroForm.value;

    const peticion = this.modoEdicion && this.estudianteId
      ? this.estudianteService.actualizarEstudiante(this.estudianteId, data)
      : this.estudianteService.crearEstudiante(data);

    peticion.subscribe({
      next: () => {
        this.guardando = false;
        this.exitoGuardado = true;
        setTimeout(() => this.router.navigate(['/estudiantes']), 900);
      },
      error: () => {
        this.guardando = false;
        this.errorGuardado = this.modoEdicion
          ? 'No se pudo actualizar el estudiante. Intenta nuevamente.'
          : 'No se pudo registrar el estudiante. Intenta nuevamente.';
      },
    });
  }

  cancelar(): void {
    this.router.navigate(['/estudiantes']);
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
