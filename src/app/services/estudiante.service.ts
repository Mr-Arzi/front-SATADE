import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { AuthService } from './auth.service';
import { Estudiante } from '../models';

const API_BASE = 'http://localhost:3000';

@Injectable({ providedIn: 'root' })
export class EstudianteService {
  constructor(private http: HttpClient, private auth: AuthService) {}

  getEstudiantes(): Observable<Estudiante[]> {
    return this.http
      .get<Estudiante[]>(`${API_BASE}/api/estudiantes`, {
        headers: this.buildHeaders(),
      })
      .pipe(catchError(() => of(this.getMockEstudiantes())));
  }

  getEstudiantePorId(id: number): Observable<Estudiante> {
    return this.http
      .get<Estudiante>(`${API_BASE}/api/estudiantes/${id}`, {
        headers: this.buildHeaders(),
      })
      .pipe(catchError(() => of(this.getMockEstudiantes()[0])));
  }

  crearEstudiante(data: Partial<Estudiante>): Observable<Estudiante> {
    return this.http
      .post<Estudiante>(`${API_BASE}/api/estudiantes`, data, {
        headers: this.buildHeaders(),
      })
      .pipe(catchError(() => of({ ...this.getMockEstudiantes()[0], ...data })));
  }

  private buildHeaders(): HttpHeaders {
    const token = this.auth.getToken();
    return new HttpHeaders({
      Authorization: token ? `Bearer ${token}` : '',
    });
  }

  private getMockEstudiantes(): Estudiante[] {
    return [
      {
        id: 1,
        nombre: 'Luis Rivera Martinez',
        matricula: '20213456',
        carrera: 'Ingenieria electrica',
        grupo: '101',
        tutor: 'Dr. Rodrigo Suarez',
        promedio: 8.9,
        asistencia: 92,
        nivelRiesgo: 'bajo',
        fotoUrl: '',
      },
      {
        id: 2,
        nombre: 'Tamara Torres Trujillo',
        matricula: '20213547',
        carrera: 'Medicina',
        grupo: '101',
        tutor: 'Dr. Rodrigo Suarez',
        promedio: 7.2,
        asistencia: 68,
        nivelRiesgo: 'medio',
        fotoUrl: '',
      },
      {
        id: 3,
        nombre: 'Juan Perez Dominguez',
        matricula: '20213321',
        carrera: 'Ingenieria Quimica',
        grupo: '101',
        tutor: 'Dra. Monica Ruiz',
        promedio: 6,
        asistencia: 45,
        nivelRiesgo: 'alto',
        fotoUrl: '',
      },
    ];
  }
}
