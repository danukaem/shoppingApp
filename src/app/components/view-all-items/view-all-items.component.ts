import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { Item } from 'src/app/services/models';
import { SharedVariablesService } from 'src/app/services/shared-variables.service';

@Component({
  selector: 'app-view-all-items',
  templateUrl: './view-all-items.component.html',
  styleUrls: ['./view-all-items.component.css']
})
export class ViewAllItemsComponent implements OnInit {
  itemsWithImages: { item: Item, files: File[] }[] = []

  constructor(public readonly sharedVariableService: SharedVariablesService, private readonly apiService: ApiService) { }

  ngOnInit(): void {

    this.sharedVariableService.deleteEditSubject.subscribe((res:any)=>{
      this.loadItems();
    })
   this.loadItems();

  }


  loadItems(){
    this.itemsWithImages =[];
    this.apiService.getAllItem().then((items: any) => {
      let addedItems = [];
      if (items.exists()) {
        const keys = Object.keys(items.val());
        for (let key of keys) {
          addedItems.push(items.val()[key])
        }

        for (let item of addedItems) {
          let itemWithImages: any = { item: {}, files: [] };
          this.apiService.getItem(item.itemId).then((item: any) => {

            if (item.exists()) {
              this.sharedVariableService.allItems.push(item.val());
              itemWithImages['item'] = item.val()

              for (let fileId of item.val().fileIds) {
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
            }
          }).catch((e: any) => {
            console.error(e);
          })
        }




      } else {

      }
    })
  }

}
