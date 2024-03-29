import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { PlatformDetecService } from "src/app/core/platform-detector/platform-detector.service";
import { lowerCaseValidator } from "src/app/shared/validators/lower-case.validator";
import { NewUser } from "./new-user";
import { SignUpService } from "./signup.service";
import { UserNotTakenValidatorService } from "./user-not-taken.validator.service";


@Component({
    templateUrl: './signup.component.html',
    providers: [UserNotTakenValidatorService] //quando alguem pedir pra injetar este item, o signup component vai providenciar o USERNOTTAKEN...SERVICE
})
export class SignUpComponent implements OnInit {

    @ViewChild("emailInput") emailInput: ElementRef<HTMLInputElement>
    signupForm: FormGroup;

    constructor(
        private formBuilder: FormBuilder,
        private userNotTakenValidatorService: UserNotTakenValidatorService,
        private signupService: SignUpService,
        private router: Router,
        private platformDetectorService: PlatformDetecService
        ) {

    }

    ngOnInit(): void {
        this.signupForm = this.formBuilder.group({
            email: ['',
                [
                    Validators.required,
                    Validators.email
                ]
            ],
            fullName: ['',
                [
                    Validators.required,
                    Validators.minLength(2),
                    Validators.maxLength(40)
                ]
            ],
            // primeiro parametro - valor padrão | Segundo parametro validador sincrono | terceiro parametro - validador assincrono
            userName: ['',
                [
                    Validators.required,
                    // Validators.pattern(/^[a-z0-9_\-]+$/),
                    lowerCaseValidator,
                    Validators.minLength(2),
                    Validators.maxLength(30)
                ],
                this.userNotTakenValidatorService.checkUserNameTaken()
            ],
            password: ['',
                [
                    Validators.required,
                    Validators.minLength(8),
                    Validators.maxLength(14)
                ]
            ],

        })

        this.platformDetectorService.isPlatformBrowser() && this.emailInput.nativeElement.focus();
        
    }


    signup() {
        const newUser = this.signupForm.getRawValue() as NewUser;
        this.signupService
            .signup(newUser)
            .subscribe(
                () => this.router.navigate(['']),
                err => console.log(err)
            );
    }
}