import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators'
// import { TokenService } from '../token/token.service';
import { UserService } from '../user/user.service';


const API_URL = 'http://localhost:3000'
@Injectable({
  providedIn: 'root'
})

export class AuthService {

  constructor(
    private http: HttpClient,
    private userService: UserService
) { }


  authenticate(userName: string, password: string) {
    return this.http
      .post(
        API_URL + '/user/login',
        { userName: userName, password: password },
        { observe: 'response' }) //vou ter acesso ao cabeçalho a tudo que tem direito da resposta 
      .pipe(tap(res => {
        const authToken = res.headers.get('x-access-token');
        // this.tokenService.setToken(authToken)
        this.userService.setToken(authToken)
        console.log(`User ${userName} authenticated with token ${authToken}`)
      }))

  }
}

//informação de um token de login no retorno da requisição
// x-access-token: ??????????????

// estrair esta informação do access token e validar o usuário