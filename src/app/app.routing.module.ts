import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Routes } from '@angular/router';
import { AuthGuard } from './core/auth/auth.guard';
import { NotFoundComponent } from './errors/not-found/not-found.component';
import { HomeComponent } from './home/home.component';
import { SignInComponent } from './home/signin/signin.component';
import { SignUpComponent } from './home/signup/signup.component';

import { PhotoFormComponent } from './photos/photo-form/photo-form.component';
import { PhotoListComponent } from './photos/photo-list/photo-list.component';
import { PhotoListResolver } from './photos/photo-list/photo-list.resolver';


const routes: Routes = [

    //versões mais novas do Angular --> https://angular.io/guide/lazy-loading-ngmodules
    // {
    //     path: 'home',
    //     loadChildren: () => import('./home/home.module').then(m => m.HomeModule)
    //   },

    //versões mais antigas do Angular
    { 
        path: '', 
        component: HomeComponent,
        canActivate: [ AuthGuard ],
        children: [
            { 
                path: '', 
                component: SignInComponent,
            },
            { 
                path: 'signup', 
                component: SignUpComponent,
            },
        ]
    },

    {
        path: 'user/:userName', 
        component: PhotoListComponent,
        resolve: {
            photos: PhotoListResolver
        }
    },
    { path: 'p/add', component: PhotoFormComponent },
    { path: '**', component: NotFoundComponent },

];

@NgModule({
    imports: [
        RouterModule.forRoot(routes, {useHash: true}),
        CommonModule
    ],
    exports: [RouterModule]
})
export class AppRoutingModule {

}

//Angular tem restrição de deixar apenas as duas ultimas versões de navegadores de forma compativel, abaixo disso, não garante o devido funcionamento da aplicação

//useHash: true -> força a alteração de rotas sem realizar requisição para o back-end, alguns tipos de servidores de hosteamento não estão preparados para o roteamento do Angular e incluindo esta linha habilita o /#/ nas rotas