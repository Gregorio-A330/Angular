import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Photo } from '../photo/photo';
import { PhotoService } from '../photo/photo.service';

@Component({
  selector: 'app-photo-list',
  templateUrl: './photo-list.component.html',
  styleUrls: ['./photo-list.component.css']
})
export class PhotoListComponent implements OnInit {

  photos: Photo[] = [];
  filter: string = '';

  hasMore: boolean = true;
  currentPage: number = 1;
  userName: string = '';

  constructor(
    private activatedRoute: ActivatedRoute,
    private photoservice: PhotoService
  ) { }

  ngOnInit(): void {
    this.userName = this.activatedRoute.snapshot.params.userName;
    this.photos = this.activatedRoute.snapshot.data.photos;
   
  }



  load(){
    this.photoservice.listFromUserPaginated(this.userName, ++this.currentPage).subscribe(photos => {
      this.photos = this.photos.concat(photos); //o Angular só detecta numa inbound property que ela mudou quando há uma nova atribuição a ela por isso utiliza-se o concat ao inves do push
      if(!photos.length){
        this.hasMore = false;
      }
    })
  }

  //utilizando o resolve ele já inicia o componente com os dados necessários vindo pelo activatedRoute trazendo a informação pelo app.routing.module.ts
}


