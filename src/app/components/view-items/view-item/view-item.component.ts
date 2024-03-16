import { Component, OnInit } from '@angular/core';
import { Item } from 'src/app/services/models';
import { SharedVariablesService } from 'src/app/services/shared-variables.service';

@Component({
  selector: 'app-view-item',
  templateUrl: './view-item.component.html',
  styleUrls: ['./view-item.component.css']
})
export class ViewItemComponent  implements OnInit{
  initialItem = {
    itemId: '',
    fileIds: [],
    name: '',
    condition: '',
    saleEnd: '',
    quantity: '',
    price: '',
    postage: '',
    delivery: '',
    return: '',
    coverage: '',
    specification: '',
    conditionDescription: '',
    type: '',
    color: '',
    gender: '',
    description: '',
    brand: '',
    size: '',
    style: '',
    material: '',
    countryManufactured: '',
    itemOwnerUserId: ''
  }
  item: Item |any= { ...this.initialItem }

  uploadedImageBase64List: { fileId: string, fileName: string, fileBase64String: string }[] = [];
  i = 0;

  keys:any[] |any =[];


  constructor(
    // itemId:5nwra9b7IcnnkWYjwWJu
    // private readonly apiService: ApiService,
    public readonly sharedVariableService: SharedVariablesService,
    // private readonly sharedService: SharedService,
    // private readonly router:Router
  ) {

  }

  ngOnInit(): void {
    if (this.sharedVariableService.viewItemData) {
      this.item = this.sharedVariableService.viewItemData['item']
      this.uploadedImageBase64List = this.sharedVariableService.viewItemData['files']
    }

    this.keys  = Object.keys(this.item);
    console.log('keys',this.keys);
    


  }

  slideImages(action: string) {
    if (this.uploadedImageBase64List.length > this.i && this.i > -1) {
      if (action === '-') {
        if (this.i > 0) {
          this.i = this.i - 1;
        }
      } else if (action === '+') {
        if (this.i < this.uploadedImageBase64List.length - 1) {
          this.i = this.i + 1;
        }
      }
    }
  }

}
