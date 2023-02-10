import { Component, OnInit } from "@angular/core";
import { Validators } from "@angular/forms";
import { FormBuilder } from "@angular/forms";
import { FormGroup } from "@angular/forms";
import { AuthService } from "src/app/core/auth.service";


@Component({
    //selector: 'ap-signin', //omitir o selector caso seja um componente de pagina e não será utilizado em outro componente, carregado pelo sistema de modulos do angular
    templateUrl: './signin.component.html'
})
export class SignInComponent implements OnInit{ 


    loginForm: FormGroup;

    constructor(
        private formBuilder: FormBuilder,
        private auth: AuthService,
    ) {

    }
    ngOnInit(): void {
        this.loginForm = this.formBuilder.group({
            userName: ['', Validators.required ],
            password: ['', Validators.required ],
        })

    }

    login() {
        const userName = this.loginForm.get('userName').value;
        const password = this.loginForm.get('password').value;

        //retorno de um post retorna um observable e podemos executar da forma abaixo
        this.auth.authenticate(userName, password).subscribe(
            () => console.log('autenticado'), 
            err => {
                console.log(err, userName, password);
                this.loginForm.reset();
                alert("Invalid user name or password");
            }
        )


    }


}