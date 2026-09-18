import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { Alerta, DashboardStats, Intervencion } from '../models';

const API_BASE = 'http://localhost:3000';

@Injectable({ providedIn: 'root' })
export class AlertaService {
  constructor(private readonly http: HttpClient) {}

  getAlertas(filtros?: { carrera?: string; grupo?: string; nivel?: string }): Observable<Alerta[]> {
    let params = new HttpParams();
    if (filtros?.carrera) {
      params = params.set('carrera', filtros.carrera);
    }
    if (filtros?.grupo) {
      params = params.set('grupo', filtros.grupo);
    }
    if (filtros?.nivel) {
      params = params.set('nivel', filtros.nivel);
    }

    return this.http
      .get<Alerta[]>(`${API_BASE}/api/alertas`, { params })
      .pipe(catchError(() => of(this.getMockAlertas())));
  }

  registrarIntervencion(data: Omit<Intervencion, 'id'>): Observable<Intervencion> {
    return this.http
      .post<Intervencion>(`${API_BASE}/api/intervenciones`, data)
      .pipe(
        catchError(() =>
          of({
            id: Date.now(),
            ...data,
          })
        )
      );
  }

  getIntervencionesPorEstudiante(estudianteId: number): Observable<Intervencion[]> {
    return this.http
      .get<Intervencion[]>(`${API_BASE}/api/intervenciones`, {
        params: new HttpParams().set('estudianteId', String(estudianteId)),
      })
      .pipe(
        catchError(() =>
          of(
            this.getMockIntervenciones().filter(
              (item) => item.estudianteId === estudianteId
            )
          )
        )
      );
  }

  getDashboardStats(): Observable<DashboardStats> {
    return this.http
      .get<DashboardStats>(`${API_BASE}/api/dashboard`)
      .pipe(catchError(() => of(this.getMockDashboard())));
  }

  private getMockAlertas(): Alerta[] {
    return [
      {
        id: 1,
        estudianteId: 1,
        nombreEstudiante: 'Luis Rivera Martinez',
        motivo: 'Ausencias recurrentes',
        nivel: 'medio',
        fecha: '2026-05-01',
      },
      {
        id: 2,
        estudianteId: 2,
        nombreEstudiante: 'Tamara Torres Trujillo',
        motivo: 'Baja calificacion',
        nivel: 'alto',
        fecha: '2026-05-03',
      },
    ];
  }

  private getMockIntervenciones(): Intervencion[] {
    return [
      {
        id: 10,
        estudianteId: 1,
        tipo: 'Sesion con psicologia',
        fecha: '2026-03-14',
        responsable: 'Ana Perez Ferrer - Psicologa',
        notas: 'Hablamos sobre organizacion y calendario. Se vio receptiva.',
      },
      {
        id: 11,
        estudianteId: 2,
        tipo: 'Tutoria academica',
        fecha: '2026-04-02',
        responsable: 'Dylan Tellez Silva - Tutor',
        notas: 'Se acordaron metas de estudio para las siguientes semanas.',
      },
    ];
  }

  private getMockDashboard(): DashboardStats {
    return {
      totalEstudiantes: 120,
      estudiantesEnRiesgoAlto: 12,
      estudiantesEnRiesgoMedio: 35,
      estudiantesEnRiesgoBajo: 73,
      alertasRecientes: this.getMockAlertas(),
      carrerasConMayorRiesgo: [
        { carrera: 'Ingenieria electrica', nivel: 'Alto' },
        { carrera: 'Medicina', nivel: 'Medio' },
      ],
      tendencia: 'desercion disminuyo 8% este semestre',
    };
  }
}
