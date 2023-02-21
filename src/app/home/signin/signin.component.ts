import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import { Validators } from "@angular/forms";
import { FormBuilder } from "@angular/forms";
import { FormGroup } from "@angular/forms";
import { Router } from "@angular/router";
import { AuthService } from "src/app/core/auth/auth.service";
import { PlatformDetecService } from "src/app/core/platform-detector/platform-detector.service";


@Component({
    //selector: 'ap-signin', //omitir o selector caso seja um componente de pagina e não será utilizado em outro componente, carregado pelo sistema de modulos do angular
    templateUrl: './signin.component.html'
})
export class SignInComponent implements OnInit{ 

    @ViewChild('userNameInput') userNameInput: ElementRef<HTMLInputElement>;
    loginForm: FormGroup;

    constructor(
        private formBuilder: FormBuilder,
        private auth: AuthService,
        private router: Router,
        private platformDetectorService: PlatformDetecService,
    ) {

    }
    ngOnInit(): void {
        this.loginForm = this.formBuilder.group({
            userName: ['', Validators.required ],
            password: ['', Validators.required ],
        })
        this.platformDetectorService.isPlatformBrowser() && this.userNameInput.nativeElement.focus();


    }

    login() {
        const userName = this.loginForm.get('userName').value;
        const password = this.loginForm.get('password').value;

        //retorno de um post retorna um observable e podemos executar da forma abaixo
        this.auth.authenticate(userName, password).subscribe(
            () => {
                console.log('autenticado');
                // this.router.navigateByUrl('user/' + userName)
                this.router.navigate(['user', userName])
            }, 
            err => {
                console.log(err, userName, password);
                this.loginForm.reset();
                // truque em JS para executar o item após o && caso seja true ele valida o segundo parametro
                this.platformDetectorService.isPlatformBrowser() && this.userNameInput.nativeElement.focus();
                alert("Invalid user name or password");
            }
        )


    }


}