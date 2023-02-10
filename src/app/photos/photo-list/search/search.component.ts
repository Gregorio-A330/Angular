import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from "@angular/core";
import { Subject } from "rxjs";
import { debounceTime } from "rxjs/operators";

@Component({
  selector: 'ap-search',
  templateUrl: './search.component.html'
})

export class SearchComponent implements OnInit, OnDestroy {

  @Output() onTyping: EventEmitter<string>= new EventEmitter<string>();
  @Input() value: string = '';
  debounce: Subject<string> = new Subject<string>();


  ngOnInit(): void {
    this.debounce
      .pipe(debounceTime(300))
      .subscribe(filter => this.onTyping.emit(filter));

    //.pipe() executa algo antes de subscribe aplicando o debounceTime para assim executar o subscribe e assim atribuir o filtro em this.filter 
  }


  ngOnDestroy() {
    this.debounce.unsubscribe(); //tirar o subscribe para evitar memoryleak
  }
}