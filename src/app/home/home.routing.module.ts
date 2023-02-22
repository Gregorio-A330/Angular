import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../core/auth/auth.guard';
import { HomeComponent } from './home.component';
import { SignInComponent } from './signin/signin.component';
import { SignUpComponent } from './signup/signup.component';


const routes: Routes = [

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

];

@NgModule({
    imports: [
        RouterModule.forChild(routes), // declaração de rotas de um sub router -> forChild | o unico modulo de rotas que pode utilizar o forRoot é o roteador principal
    ],
    exports: [RouterModule]
})
export class HomeRoutingModule {

}

