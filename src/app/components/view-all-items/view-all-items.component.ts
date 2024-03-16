import { Component, OnInit } from '@angular/core';
import { Subject, debounceTime } from 'rxjs';
import { ApiService } from 'src/app/services/api.service';
import { Item } from 'src/app/services/models';
import { SharedVariablesService } from 'src/app/services/shared-variables.service';

@Component({
  selector: 'app-view-all-items',
  templateUrl: './view-all-items.component.html',
  styleUrls: ['./view-all-items.component.css']
})
export class ViewAllItemsComponent implements OnInit {
  itemsWithImages: { item: Item, files: File[] }[] = [];
  itemsWithImagesAll: { item: Item, files: File[] }[] = [];

  searchKey = '';

  searchSubject = new Subject<any>();

  constructor(public readonly sharedVariableService: SharedVariablesService, private readonly apiService: ApiService) { }

  ngOnInit(): void {

    this.sharedVariableService.deleteEditSubject.subscribe((res: any) => {
      this.loadItems();
    })
    this.loadItems();

    this.searchSubject.pipe(debounceTime(1000)).subscribe((val: any) => {

      if(val){
        this.itemsWithImages = this.itemsWithImagesAll.filter((element: any) => {
          return this.checkKeyInItem(element.item,val) ;
        })
      }else{
        this.itemsWithImages = this.itemsWithImagesAll;
      }
     
    })

  }

  checkKeyInItem(item:Item,val:string):boolean{
     return (item.name.toLowerCase().includes(val.toLowerCase()) ||
     item.condition.toLowerCase().includes(val.toLowerCase())||
     item.specification.toLowerCase().includes(val.toLowerCase())||
     item.conditionDescription.toLowerCase().includes(val.toLowerCase())||
     item.type.toLowerCase().includes(val.toLowerCase())||
     item.color.toLowerCase().includes(val.toLowerCase())||
     item.description.toLowerCase().includes(val.toLowerCase())||
     item.brand.toLowerCase().includes(val.toLowerCase())||
     item.material.toLowerCase().includes(val.toLowerCase())||
     item.countryManufactured.toLowerCase().includes(val.toLowerCase()))

  }


  loadItems() {
    this.itemsWithImages = [];
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
              this.itemsWithImages.push(itemWithImages);
              this.itemsWithImagesAll = [ ...this.itemsWithImages ];
              console.log('this.itemsWithImagesAll', this.itemsWithImagesAll);

            }
          }).catch((e: any) => {
            console.error(e);
          })
        }





      } else {

      }
    })
  }

  search() {
    this.searchSubject.next(this.searchKey);

  }

}
