import { AbstractControl } from "@angular/forms";

export function lowerCaseValidator(control: AbstractControl) {


    if(control.value.trim() && !/^[a-z0-9_\-]+$/.test(control.value)) {   //se não tiver em branco e o que tiver lá dentro não seguir a expressão regular é porque ta com algum problema
        return { lowerCase: true} //nome que eu dou aqui é o nome que uso para acessar ao recuperar o validator no HTML -> signupForm.get('password').errors?.lowerCase (exemplo)
    }
    return null;

}