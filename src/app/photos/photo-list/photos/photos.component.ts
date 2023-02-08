import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Photo } from '../../photo/photo';

@Component({
  selector: 'ap-photos',
  templateUrl: './photos.component.html',
  styleUrls: ['./photos.component.css']
})
export class PhotosComponent implements OnChanges {

  @Input() photos: Photo[] = [];
  rows: any[] = [];
  
  constructor() { }


  //onChanges -> recebe de parametro todas as possiveis mudanças das inbound properties do meu componente
  //existe simpleChange neste caso abaixo é plural
  ngOnChanges(changes: SimpleChanges) {
    //changes.photos //se houve uma mudança vai ser adicionada dinamicamente uma propriedade com o mesmo nome da inbound propertie, se não houve mudança nada acontece
  if (changes.photos){
    this.rows = this.groupColumns(this.photos)
  }
  
  }


  groupColumns(photos: Photo[]){
    const newRows = []

    for(let index = 0; index < photos.length; index+=3){
      newRows.push(photos.slice(index, index + 3));
    }

    return newRows;
  }
}


// slice -> posição inicial que quer considerar e a posição final não inclusiva e fatiar o array
// A logica acima é para iniciar em zero e pegar até o index 2 e dar um push com os itens selecionados para dentro de newRows
//  na segunda passada ele vai pegar a partir do index 3 até o 5 [3,4,5] e dar um push
//  com isso fazendo que o array vire uma matriz [[0,1,2],[3,4,5][6,7,8],[...],... caso tenham mais valores]

// caso tenha uma mudança