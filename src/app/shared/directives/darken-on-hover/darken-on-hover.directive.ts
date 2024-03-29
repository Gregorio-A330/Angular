import { Directive, ElementRef, HostListener, Input, Renderer } from "@angular/core";

@Directive({
    selector: '[apDarkenOnHover]',
})
export class DarkenOnHoverDirective {

    @Input() brightness = '70%';

    constructor(
        private el: ElementRef,
        private render: Renderer
        ){}

    @HostListener('mouseover')
    darkenOn() {
        console.log("darkenOn");
        this.render.setElementStyle(this.el.nativeElement, 'filter', `brightness(${this.brightness})`);
    }

    @HostListener('mouseleave')
    darkenOff(){
        console.log("darkenOff");
        this.render.setElementStyle(this.el.nativeElement, 'filter', 'brightness(100%)');

    }
}

// <a apDarkOnHover></a> utiliza-se a diretiva como se fosse um atributo

// manipular o DOM do render - bom para utilizar atraves do serve side rendering
