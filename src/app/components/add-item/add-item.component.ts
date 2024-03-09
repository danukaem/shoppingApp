import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { Item } from 'src/app/services/models';
import { SharedVariablesService } from 'src/app/services/shared-variables.service';
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-add-item',
  templateUrl: './add-item.component.html',
  styleUrls: ['./add-item.component.css']
})
export class AddItemComponent implements OnInit {

  initialItem ={
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
  item: Item = {...this.initialItem}


  image64String: any[] = [];

  uploadedFiles = [];

  constructor(
    private readonly apiService: ApiService,
    private readonly sharedVariableService: SharedVariablesService,
    private readonly sharedService: SharedService
  ) { }
  ngOnInit(): void {
    this.image64String = this.sharedVariableService.files;


  }

  uploadFile(event: any) {
    this.uploadedFiles = event.target.files;
  }


  addItem() {
    const itemId = this.sharedService.generateRandomId(20);

    this.item.itemId = itemId;

    // this.item.itemOwnerUserId = this.sharedVariableService.user?.email!


    if (this.uploadedFiles.length > 0) {
      for (let i = 0; i < this.uploadedFiles.length; i++) {
        const fileId = this.sharedService.generateRandomId(20);
        this.item.fileIds.push(fileId);
        this.apiService.convertImageToBase64(this.uploadedFiles[i]).then((fileBase64String: string) => {
          this.apiService.imageUpload(fileId, this.uploadedFiles[i]['name'], fileBase64String, this.item).then(() => {
            this.apiService.addItem(this.item).then(() => {

              this.sharedVariableService.user?.addedItems.push({itemId:itemId,placedOrderDetails:[]})
              this.apiService.userRegister(this.sharedVariableService.user!);

              this.uploadedFiles = [];
              this.item = {...this.initialItem}
            });

          });
        }).catch((e: any) => {
          console.error(e)
        })
      }
    } else {
      this.apiService.addItem(this.item).then(() => {
        this.uploadedFiles = [];

        this.item = {...this.initialItem}
      })

    }


  }

}
