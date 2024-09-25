import { Routes } from '@angular/router';
import { NotfoundComponent } from './demo/components/notfound/notfound.component';
import { AppLayoutComponent } from "./layout/app.layout.component";

export const AppRotas: Routes = [
    {
        path: '', component: AppLayoutComponent,
        children: [
            { path: '', loadChildren: () => import('./view/sobre/sobre.module').then(module => module.SobreModule) },
            { path: 'produto', loadChildren: () => import('./view/produto/resumo-produto/resumo-produto.module')
                .then(module => module.ResumoProdutoModule) },
            { path: 'produto/detalhe', loadChildren: () => import('./view/produto/detalhe-produto/detalhe-produto.module')
                .then(module => module.DetalheProdutoModule) },
            { path: 'marca', loadChildren: () => import('./view/marca/marca.module').then(module => module.MarcaModule) },
            { path: 'departamento', loadChildren: () => import('./view/departamento/departamento.module').then(module => module.DepartamentoModule) },
            { path: 'categoria', loadChildren: () => import('./view/categoria/categoria.module').then(module => module.CategoriaModule) },
            { path: 'sobre', loadChildren: () => import('./view/sobre/sobre.module').then(module => module.SobreModule) },

            /*
            { path: 'uikit', loadChildren: () => import('./demo/components/uikit/uikit.module').then(m => m.UIkitModule) },
            { path: 'utilities', loadChildren: () => import('./demo/components/utilities/utilities.module').then(m => m.UtilitiesModule) },
            { path: 'documentation', loadChildren: () => import('./demo/components/documentation/documentation.module').then(m => m.DocumentationModule) },
            { path: 'blocks', loadChildren: () => import('./demo/components/primeblocks/primeblocks.module').then(m => m.PrimeBlocksModule) },
            { path: 'pages', loadChildren: () => import('./demo/components/pages/pages.module').then(m => m.PagesModule) },
             */
        ]
    },
    /*
    { path: 'auth', loadChildren: () => import('./demo/components/auth/auth.module').then(m => m.AuthModule) },
    { path: 'landing', loadChildren: () => import('./demo/components/landing/landing.module').then(m => m.LandingModule) },
    { path: 'notfound', component: NotfoundComponent },
     */
    { path: '**', redirectTo: '/notfound' }
];
