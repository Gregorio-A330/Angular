import { HttpHandler, HttpHeaderResponse, HttpInterceptor, HttpProgressEvent, HttpRequest, HttpResponse, HttpSentEvent, HttpUserEvent } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { TokenService } from "../token/token.service";

@Injectable()
export class RequestInterceptor implements HttpInterceptor {

    constructor(private tokenService: TokenService){}
    
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpSentEvent | HttpHeaderResponse | HttpProgressEvent | HttpResponse<any> | HttpUserEvent<any> >{
        if(this.tokenService.hasToken()) {
            const token = this.tokenService.getToken();

            // voce é obrigado a clonar essa requisição e injetar o token no cabeçalho da requisição e incluirá dentro de req
            req = req.clone({
                setHeaders: {
                    'x-access-token': token
                }
            })
        }    

        
        return next.handle(req); // modo normal, qualquer requisição feita pro back-end não vai fazer nada e vai deixar passar
    }
}