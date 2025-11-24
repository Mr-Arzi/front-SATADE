import { Routes } from '@angular/router';

import { Home } from './home/home';
import { Loggin } from './loggin/loggin';
import { Registrarestudiante } from './registrarestudiante/registrarestudiante';
import { Student } from './student/student';
import { StudentProfile } from './student-profile/student-profile';
import { Alerts} from './alerts/alerts';
import { RegistroIntervenciones } from './registro-intervenciones/registro-intervenciones';
import { Reportes } from './reportes/reportes';

export const routes: Routes = [
    { path: 'home', component: Home },
    { path: 'login', component: Loggin },
    { path: 'registrar', component: Registrarestudiante},
    { path: 'estudiantes', component: Student },
    { path: 'perfil-estudiante', component: StudentProfile},
    { path: 'alertas', component: Alerts},
    { path: 'registro-intervenciones',component: RegistroIntervenciones},
    { path: 'reportes', component:Reportes },

    //para redirigir
    { path: '', redirectTo: '/login', pathMatch: 'full' }
];
