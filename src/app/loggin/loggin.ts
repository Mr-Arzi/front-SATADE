import { Component } from '@angular/core';
import { Router } from "@angular/router";
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-loggin',
  imports: [CommonModule, FormsModule],
  templateUrl: './loggin.html',
  styleUrl: './loggin.css',
})
export class Loggin {
  correo = '';
  contrasena = '';
  cargando = false;
  error = '';

  constructor(
    private readonly authService: AuthService,
    private readonly router: Router
  ) {}

  iniciarSesion() {
    if (this.cargando) {
      return;
    }

    this.cargando = true;
    this.error = '';

    this.authService.login(this.correo, this.contrasena).subscribe({
      next: () => {
        this.cargando = false;
        this.router.navigate(['/home']);
      },
      error: () => {
        this.cargando = false;
        this.error = 'No se pudo iniciar sesion. Verifica tus datos.';
      },
    });
  }

}
