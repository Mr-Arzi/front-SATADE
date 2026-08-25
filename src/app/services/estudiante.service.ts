import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { AuthService } from './auth.service';
import { Estudiante } from '../models';

const API_BASE = 'http://localhost:3000';

@Injectable({ providedIn: 'root' })
export class EstudianteService {
  constructor(
    private readonly http: HttpClient,
    private readonly auth: AuthService
  ) {}

  // Estado en memoria usado únicamente como fallback mientras no exista backend.
  // Vive mientras dure la sesión del navegador (se pierde al recargar), lo que
  // permite probar crear/editar/eliminar de forma coherente entre navegaciones.
  private mockEstudiantes: Estudiante[] = [
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

  getEstudiantes(): Observable<Estudiante[]> {
    return this.http
      .get<Estudiante[]>(`${API_BASE}/api/estudiantes`, {
        headers: this.buildHeaders(),
      })
      .pipe(catchError(() => of([...this.mockEstudiantes])));
  }

  getEstudiantePorId(id: number): Observable<Estudiante> {
    return this.http
      .get<Estudiante>(`${API_BASE}/api/estudiantes/${id}`, {
        headers: this.buildHeaders(),
      })
      .pipe(
        catchError(() => {
          const mock = this.mockEstudiantes.find((estudiante) => estudiante.id === id);
          return mock ? of(mock) : throwError(() => new Error('Estudiante no encontrado'));
        })
      );
  }

  crearEstudiante(data: Partial<Estudiante>): Observable<Estudiante> {
    return this.http
      .post<Estudiante>(`${API_BASE}/api/estudiantes`, data, {
        headers: this.buildHeaders(),
      })
      .pipe(
        catchError(() => {
          const nuevoId = this.mockEstudiantes.length
            ? Math.max(...this.mockEstudiantes.map((estudiante) => estudiante.id)) + 1
            : 1;
          const nuevo: Estudiante = {
            id: nuevoId,
            nombre: '',
            matricula: '',
            carrera: '',
            grupo: '',
            tutor: '',
            promedio: 0,
            asistencia: 0,
            nivelRiesgo: 'bajo',
            fotoUrl: '',
            ...data,
          };
          this.mockEstudiantes.push(nuevo);
          return of(nuevo);
        })
      );
  }

  // PATCH (no PUT): el formulario reutilizado de registro/edición solo administra
  // un subconjunto de los campos de Estudiante (nombre, matricula, carrera, grupo,
  // tutor). PATCH expresa correctamente una actualización parcial del recurso; PUT
  // implicaría reemplazar toda la representación y dejaría indefinidos campos como
  // promedio, asistencia, nivelRiesgo o fotoUrl que este formulario no gestiona.
  actualizarEstudiante(id: number, data: Partial<Estudiante>): Observable<Estudiante> {
    return this.http
      .patch<Estudiante>(`${API_BASE}/api/estudiantes/${id}`, data, {
        headers: this.buildHeaders(),
      })
      .pipe(
        catchError(() => {
          const index = this.mockEstudiantes.findIndex((estudiante) => estudiante.id === id);
          if (index === -1) {
            return throwError(() => new Error('Estudiante no encontrado'));
          }

          const actualizado: Estudiante = { ...this.mockEstudiantes[index], ...data, id };
          this.mockEstudiantes[index] = actualizado;
          return of(actualizado);
        })
      );
  }

  eliminarEstudiante(id: number): Observable<void> {
    return this.http
      .delete<void>(`${API_BASE}/api/estudiantes/${id}`, {
        headers: this.buildHeaders(),
      })
      .pipe(
        catchError(() => {
          const index = this.mockEstudiantes.findIndex((estudiante) => estudiante.id === id);
          if (index === -1) {
            return throwError(() => new Error('Estudiante no encontrado'));
          }

          this.mockEstudiantes.splice(index, 1);
          return of(undefined);
        })
      );
  }

  private buildHeaders(): HttpHeaders {
    const token = this.auth.getToken();
    return new HttpHeaders({
      Authorization: token ? `Bearer ${token}` : '',
    });
  }
}
