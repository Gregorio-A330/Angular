import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Observable } from "rxjs";
import { User } from "../user/user";
import { UserService } from "../user/user.service";

@Component({
    selector: 'ap-header',
    templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit {
    //boas praticas: sempre que for utilizar um observable adicionar um DOLAR $ na frente para indicar que aquela variavel é um observable 
    user$: Observable<User>;
    // user: User;

    constructor(
        private userService: UserService,
        private router: Router
    ) {
        this.user$ = userService.getUser()
        // this.user$.subscribe(user => this.user = user);
    }

    ngOnInit(): void {

    }

    logout() {
        this.userService.logout();
        this.router.navigate(['']);
    }


    // <div *ngIf="(user$ | async) as user; else login"> (user$ | async) -> executa um processo assincrono e aguarda o observable para injetar diretamente no front
}