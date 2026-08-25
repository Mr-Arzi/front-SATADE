import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, of, throwError } from 'rxjs';
import { tap } from 'rxjs/operators';

import { LoginResponse } from '../models';

const API_BASE = 'http://localhost:3000';
const TOKEN_KEY = 'satade_token';
const USER_KEY = 'satade_usuario';

// SATADE todavía no tiene backend. Mientras tanto, este flag decide explícitamente
// si login() usa el usuario mock o realiza la petición HTTP real — nunca se elige
// implícitamente a partir de si la petición falla. Cambiar a `false` en cuanto
// exista un backend real que responder en API_BASE (más adelante esto debería
// migrar a un archivo de environment de Angular en vez de esta constante).
const USE_MOCK_AUTH = true;

// Credenciales que acepta el modo mock. No existían credenciales mock previas en
// el código (el mock anterior ignoraba correo/contrasena y siempre autenticaba),
// así que estas son nuevas — pensadas solo para desarrollo local sin backend.
const MOCK_CREDENTIALS = {
  correo: 'admin@satade.mx',
  contrasena: 'admin123',
};

const MOCK_LOGIN_RESPONSE: LoginResponse = {
  token: 'mock-token',
  usuario: {
    id: 1,
    nombre: 'Jesus Galvan',
    rol: 'Administrador',
    iniciales: 'JG',
  },
};

@Injectable({ providedIn: 'root' })
export class AuthService {
  constructor(
    private readonly http: HttpClient,
    private readonly router: Router
  ) {}

  login(correo: string, contrasena: string): Observable<LoginResponse> {
    if (USE_MOCK_AUTH) {
      return this.loginMock(correo, contrasena);
    }

    return this.http
      .post<LoginResponse>(`${API_BASE}/api/auth/login`, { correo, contrasena })
      .pipe(tap((response) => this.persistSession(response)));
  }

  private loginMock(correo: string, contrasena: string): Observable<LoginResponse> {
    const credencialesValidas =
      correo === MOCK_CREDENTIALS.correo && contrasena === MOCK_CREDENTIALS.contrasena;

    if (!credencialesValidas) {
      return throwError(() => new Error('Credenciales invalidas'));
    }

    this.persistSession(MOCK_LOGIN_RESPONSE);
    return of(MOCK_LOGIN_RESPONSE);
  }

  logout(): void {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
    this.router.navigate(['/login']);
  }

  getUsuario(): LoginResponse['usuario'] | null {
    const raw = localStorage.getItem(USER_KEY);
    if (!raw) {
      return null;
    }

    try {
      return JSON.parse(raw) as LoginResponse['usuario'];
    } catch {
      return null;
    }
  }

  getToken(): string | null {
    return localStorage.getItem(TOKEN_KEY);
  }

  isAuthenticated(): boolean {
    return !!this.getToken();
  }

  private persistSession(response: LoginResponse): void {
    localStorage.setItem(TOKEN_KEY, response.token);
    localStorage.setItem(USER_KEY, JSON.stringify(response.usuario));
  }
}
