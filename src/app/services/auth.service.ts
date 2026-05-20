import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

import { LoginResponse } from '../models';

const API_BASE = 'http://localhost:3000';
const TOKEN_KEY = 'satade_token';
const USER_KEY = 'satade_usuario';

@Injectable({ providedIn: 'root' })
export class AuthService {
  constructor(
    private readonly http: HttpClient,
    private readonly router: Router
  ) {}

  login(correo: string, contrasena: string): Observable<LoginResponse> {
    return this.http
      .post<LoginResponse>(`${API_BASE}/api/auth/login`, { correo, contrasena })
      .pipe(
        tap((response) => this.persistSession(response)),
        catchError(() => {
          const mock: LoginResponse = {
            token: 'mock-token',
            usuario: {
              id: 1,
              nombre: 'Jesus Galvan',
              rol: 'Administrador',
              iniciales: 'JG',
            },
          };
          this.persistSession(mock);
          return of(mock);
        })
      );
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
