import { NgModule } from "@angular/core";
import { SignInComponent } from "./signin/signin.component";
import { ReactiveFormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { VMessageModule } from "../shared/components/vmessage/vmessage.module";


@NgModule({
    declarations: [
        SignInComponent
    ],
    imports: [
        ReactiveFormsModule,
        VMessageModule,
        CommonModule,
    ]
})

export class HomeModule { }

//só coloca no exports aquilo que quer ter acesso no template de outro componente