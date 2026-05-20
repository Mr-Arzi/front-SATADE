export interface Estudiante {
  id: number;
  nombre: string;
  matricula: string;
  carrera: string;
  grupo: string;
  tutor: string;
  promedio: number;
  asistencia: number;
  nivelRiesgo: 'bajo' | 'medio' | 'alto';
  fotoUrl?: string;
}

export interface Alerta {
  id: number;
  estudianteId: number;
  nombreEstudiante: string;
  motivo: string;
  nivel: 'bajo' | 'medio' | 'alto';
  fecha: string;
}

export interface Intervencion {
  id: number;
  estudianteId: number;
  tipo: string;
  fecha: string;
  responsable: string;
  notas: string;
}

export interface DashboardStats {
  totalEstudiantes: number;
  estudiantesEnRiesgoAlto: number;
  estudiantesEnRiesgoMedio: number;
  estudiantesEnRiesgoBajo: number;
  alertasRecientes: Alerta[];
  carrerasConMayorRiesgo: { carrera: string; nivel: string }[];
  tendencia: string;
}

export interface LoginResponse {
  token: string;
  usuario: {
    id: number;
    nombre: string;
    rol: string;
    iniciales: string;
  };
}
