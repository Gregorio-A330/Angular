import { NgModule } from "@angular/core";
import { SignInComponent } from "./signin/signin.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { VMessageModule } from "../shared/components/vmessage/vmessage.module";
import { RouterModule } from "@angular/router";
import { SignUpComponent } from "./signup/signup.component";
import { HomeComponent } from "./home.component";
import { HomeRoutingModule } from "./home.routing.module";
import { SignUpService } from "./signup/signup.service";


@NgModule({
    declarations: [
        SignInComponent,
        SignUpComponent,
        HomeComponent
    ],
    imports: [
        ReactiveFormsModule,
        FormsModule,
        VMessageModule,
        CommonModule,
        RouterModule,
        HomeRoutingModule
    ],
    providers: [
        SignUpService
    ]
})

export class HomeModule { }

//só coloca no exports aquilo que quer ter acesso no template de outro componente