import { Routes } from '@angular/router';

import { Home } from './home/home';
import { Loggin } from './loggin/loggin';

export const routes: Routes = [
    { path: 'home', component: Home },
    { path: 'loggin', component: Loggin },

    // 3. Una regla "comodín" para redirigir
    { path: '', redirectTo: '/home', pathMatch: 'full' }
];
