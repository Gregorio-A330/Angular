import { Injectable, PLATFORM_ID, Inject } from "@angular/core";
import { isPlatformBrowser } from "@angular/common";

@Injectable({providedIn: 'root'})

export class PlatformDetecService {

    constructor( @Inject(PLATFORM_ID) private platformId: string ) { }

    isPlatformBrowser() {
        return isPlatformBrowser(this.platformId) //retorna true ou false dependendo se roda no navegador ou não
    }
}
