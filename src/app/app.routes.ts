import { Routes } from '@angular/router';

import { Home } from './home/home';
import { Loggin } from './loggin/loggin';
import { Registrarestudiante } from './registrarestudiante/registrarestudiante';
import { Student } from './student/student';
import { StudentProfile } from './student-profile/student-profile';
import { Alerts} from './alerts/alerts';
import { RegistroIntervenciones } from './registro-intervenciones/registro-intervenciones';
import { Reportes } from './reportes/reportes';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
    { path: 'login', component: Loggin },

    // rutas protegidas: requieren sesión iniciada
    { path: 'home', component: Home, canActivate: [authGuard] },
    { path: 'registrar', component: Registrarestudiante, canActivate: [authGuard] },
    { path: 'registrar/:id', component: Registrarestudiante, canActivate: [authGuard] },
    { path: 'estudiantes', component: Student, canActivate: [authGuard] },
    { path: 'perfil-estudiante/:id', component: StudentProfile, canActivate: [authGuard] },
    { path: 'alertas', component: Alerts, canActivate: [authGuard] },
    { path: 'registro-intervenciones', component: RegistroIntervenciones, canActivate: [authGuard] },
    { path: 'reportes', component: Reportes, canActivate: [authGuard] },

    //para redirigir
    { path: '', redirectTo: '/login', pathMatch: 'full' }
];
