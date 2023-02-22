import { CommonModule } from "@angular/common";
import { HTTP_INTERCEPTORS } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { RequestInterceptor } from "./auth/request.interceptor";
import { HeaderComponent } from "./header/header.component";

@NgModule({
    declarations: [HeaderComponent],
    exports: [HeaderComponent],
    imports: [
        CommonModule,
        RouterModule
    ],
    //providenciando a modificação do headers vindo pelo request.interceptors -> serve para sempre que estiver autenticado ele enviar o token pelo header
    providers: [
        {
            provide: HTTP_INTERCEPTORS,
            useClass: RequestInterceptor,
            multi: true
        }
    ]
})
export class CoreModule {}