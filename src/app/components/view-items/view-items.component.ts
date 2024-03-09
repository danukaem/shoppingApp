import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { Item,File } from 'src/app/services/models';
import { SharedVariablesService } from 'src/app/services/shared-variables.service';

@Component({
  selector: 'app-view-items',
  templateUrl: './view-items.component.html',
  styleUrls: ['./view-items.component.css']
})
export class ViewItemsComponent implements OnInit {

  itemsWithImages: {item:Item,files:File[]}[]=[]

  constructor(public readonly sharedVariableService: SharedVariablesService, private readonly apiService: ApiService) { }
  ngOnInit(): void {


    // console.log('this.sharedVariableService.user in view items', this.sharedVariableService.user);

    let addedItems  = this.sharedVariableService.user?.addedItems!;


    for(let addedItem of addedItems){
      let itemWithImages:any={item:{},files:[]};
      this.apiService.getItem(addedItem.itemId).then((item: any) => {
    debugger
        
        if (item.exists()) {
          this.sharedVariableService.items.push(item.val());
          itemWithImages['item']=item.val()

          // this.itemsWithImages.pu
          ////////////////////////////////
          for(let fileId of item.val().fileIds){
            this.apiService.getImage(fileId).then((val: any) => {
              if (val.exists()) {
                this.sharedVariableService.files.push(val.val());
                itemWithImages['files'].push(val.val())
              }
            }).catch((e: any) => {
              console.error(e);
            })
          }

          this.itemsWithImages.push(itemWithImages)
          

          console.log('this.itemsWithImages,,,,,,,,,,,,',this.itemsWithImages);
          
          ////////////////////////////////
          // console.log('this.sharedVariableService.items::::::::::',this.sharedVariableService.items);
          
        }
      }).catch((e: any) => {
        console.error(e);
      })
    }


    // this.apiService.getImages();
    this.apiService.getImage('I87wpzfe32P2MCyZWW8l').then((val: any) => {
      if (val.exists()) {
        this.sharedVariableService.files.push(val.val());
      }
    }).catch((e: any) => {
      console.error(e);
    })


  }


  // slideImages(action:string){
  //   if(action==='-'){

  //   }else if(action==='+'){

  //   }

  // }

}
