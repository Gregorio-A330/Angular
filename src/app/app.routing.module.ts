import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Routes } from '@angular/router';
import { NotFoundComponent } from './errors/not-found/not-found.component';

import { PhotoFormComponent } from './photos/photo-form/photo-form.component';
import { PhotoListComponent } from './photos/photo-list/photo-list.component';


const routes: Routes = [
    { path: 'user/:userName', component: PhotoListComponent },
    { path: 'p/add', component: PhotoFormComponent },
    { path: '**', component: NotFoundComponent },

];

@NgModule({
    imports: [
        RouterModule.forRoot(routes),
        CommonModule
    ],
    exports: [RouterModule]
})
export class AppRoutingModule {

}