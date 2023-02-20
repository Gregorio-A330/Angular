import { Injectable } from "@angular/core";
import { BehaviorSubject, Subject } from "rxjs";
import { TokenService } from "../token/token.service";
import { User } from "./user";
import * as jwt_decode from 'jwt-decode';

@Injectable({providedIn: 'root'})
export class UserService {

    private userSubject = new BehaviorSubject<User>(null); // no construtor ele obrigatoriamente espera um valor inicial
    // private userSubject = new Subject<User>(); //subject emite quando quiser via .next()

    private userName: string;

    constructor(private tokenService: TokenService,){
        this.tokenService.hasToken() && this.decodeAndNotify() //tem token? se for falso ele executa a segunda função
    }

    setToken(token: string){
        this.tokenService.setToken(token) //seta o token
        this.decodeAndNotify()
    }

    getUser() {
        return this.userSubject.asObservable(); //quem chamar o getUser recebe um observable e pode executar um subscribe
    }

    private decodeAndNotify() {
        const token = this.tokenService.getToken(); //pega o token salvo e decodifico ele e pego o valor do payload e emito atraves do userSubject
        const user = jwt_decode(token) as User; //casting -> tipando como as User
        this.userName = user.name;
        this.userSubject.next(user)

    }

    logout() {
        this.tokenService.removeToken();
        this.userSubject.next(null);
    }

    isLogged() {
        return this.tokenService.hasToken(); //tem token ta logado, não tem? redireciona.
    }

    getUserName() {
        return this.userName;
    }
}