import { Injectable } from "@angular/core";
import { AbstractControl } from "@angular/forms";
import { SignUpService } from "./signup.service";

import { debounceTime, switchMap, map, first } from 'rxjs/operators'

// @Injectable({ providedIn: 'root' }) removo daqui e injeto o provider este cara aonde ele vai ser utilizado que é o signup component
@Injectable()
export class UserNotTakenValidatorService {

    constructor(private signUpService: SignUpService) { }


    checkUserNameTaken() {
        return (control: AbstractControl) => {
            return control
            .valueChanges
            .pipe(debounceTime(300)) //executo o debounce vindo do valor anterior
            .pipe(switchMap(userName => { // switchMap -> paro de escutar o que estava antes e passo a executar daqui pra frente
                return this.signUpService.checkUserNameTaken(userName)
            }))
            .pipe(map(isTaken => isTaken ? {userNameTaken: true} : null )) // Validador
            .pipe(first()); //pega apenas a primeira execução do debounce até que ele seja alterado posteriormente, serve para dar trigger, assim o observable é escutado e executado.
        }
    }

}

// Validador assincrono retorna um observable, diferente do sincrono que pode ser true ou null

// OBSERVABLE consigo encadear um pipe para aplicar o debounce


// Utilizamos o switchMap() pois primeiro pegamos a emissão do Observable, após o qual temos que retornar a emissão do Observable de checkUserNameTaken(). Para não obtermos as duas emissões concomitantemente, exigiremos que o fluxo anterior seja pausado e trocado para o fluxo de verificação do username. Este processo é repetido toda vez que é feita uma nova digitação no campo de input.

// O resultado disso será "verdadeiro" ou "falso", que precisarão se tornar "nulo" ou objeto JavaScript, havendo a falha da validação. Então, pediremos ajuda a outro operador do rxjs, o map. Pode-se notar que estes retornos se assemelham aos do nosso lowerCase, acessado no template.

// No entanto, não poderemos deixar o código da maneira em que está, pois quando há o retorno do Observable com o sistema de validação assíncrona do Angular, este fará o subscribe mas, para acessar o valor para tal, o processo todo precisa indicar quando for concluído, o que não ocorre em momento algum.

// Assim, é necessário importarmos o operador first, com que será informada a sua conclusão logo após o primeiro valor emitido, forçando um complete, considerando que cada emissão tenha 300ms de duração.