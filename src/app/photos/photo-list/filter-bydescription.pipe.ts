import { Pipe, PipeTransform } from "@angular/core";
import { Photo } from "../photo/photo";

@Pipe({ name: 'filterByDescription' })

export class FilterByDescription implements PipeTransform {
    //primeiro parametro sempre quem voce quer aplicar a transformação
    // segundo parametro são todos os parametros que voce vai passar
    //ou se tiver um unico parametro depois do primeiro pode implementar diretamente
    // transform(photos: Photo[], ...args: any[]) {
    //     throw new Error("Method not implemented.");
    // }

    transform(photos: Photo[], descriptionQuery: string) {
        descriptionQuery = descriptionQuery.trim().toLowerCase();
        
        if(descriptionQuery){
            return photos.filter(photo => 
                photo.description.toLowerCase().includes(descriptionQuery)
            );
        } else {
            return photos;
        }
    }



}