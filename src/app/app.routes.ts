import { Routes } from '@angular/router';

import { Home } from './home/home';
import { Loggin } from './loggin/loggin';

export const routes: Routes = [
    { path: 'home', component: Home },
    { path: 'loggin', component: Loggin },

    //para redirigir
    { path: '', redirectTo: '/loggin', pathMatch: 'full' }
];
