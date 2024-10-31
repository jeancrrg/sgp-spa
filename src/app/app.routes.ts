import { Routes } from '@angular/router';
import { NotfoundComponent } from './demo/components/notfound/notfound.component';
import { AppLayoutComponent } from "./layout/app.layout.component";

export const AppRotas: Routes = [
    {
        path: '', component: AppLayoutComponent,
        children: [
            { path: '', loadChildren: () => import('./pages/home/home.module').then(module => module.HomeModule) },
        ]
    },
    { path: '**', redirectTo: '/notfound' }
];
