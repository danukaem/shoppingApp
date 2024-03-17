import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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
  item: Item = { ...this.initialItem }

  uploadedFiles = [];

  uploadedImageBase64List: { fileId: string, fileName: string, fileBase64String: string }[] = []

  i = 0;

  conditions: any[] = [
    {value: 'Brand New', viewValue: 'Brand New'},
    {value: 'Like Brand New', viewValue: 'Like Brand New'},
    {value: 'Lightly Used', viewValue: 'Lightly Used'},
    {value: 'Used', viewValue: 'Used'},
    {value: 'Heavy Used', viewValue: 'Heavy Used'},
  ];

  genders:any =[
    {value: 'Male', viewValue: 'Male'},
    {value: 'Female', viewValue: 'Female'},
    {value: 'Other', viewValue: 'Other'},
  ];

  constructor(
    private readonly apiService: ApiService,
    private readonly sharedVariableService: SharedVariablesService,
    private readonly sharedService: SharedService,
    private readonly router:Router
  ) { }
  ngOnInit(): void {
  }

  uploadFile(event: any) {
    this.uploadedFiles = event.target.files;
    if (this.uploadedFiles.length > 0) {
      for (let i = 0; i < this.uploadedFiles.length; i++) {
        this.apiService.convertImageToBase64(this.uploadedFiles[i]).then((fileBase64String: string) => {
          this.uploadedImageBase64List.push({ fileId: '', fileName: this.uploadedFiles[i]['name'], fileBase64String: fileBase64String })

        })

      }
    }
  }


  addItem() {

    if (!this.sharedVariableService.user.addedItems) {
      this.sharedVariableService.user.addedItems = []
    }

    const itemId = this.sharedService.generateRandomId(20);
    this.item.itemId = itemId;
    this.item.itemOwnerUserId = this.sharedVariableService.user.email

    if (this.uploadedFiles.length > 0) {
      for (let i = 0; i < this.uploadedFiles.length; i++) {
        const fileId = this.sharedService.generateRandomId(20);
        this.item.fileIds.push(fileId);
        this.apiService.convertImageToBase64(this.uploadedFiles[i]).then((fileBase64String: string) => {
          this.apiService.imageUpload(fileId, this.uploadedFiles[i]['name'], fileBase64String, this.item).then(() => {
            this.apiService.addItem(this.item).then(() => {
              localStorage.setItem('user', JSON.stringify(this.sharedVariableService.user))
              this.apiService.userRegister(this.sharedVariableService.user!);
              this.uploadedFiles = [];
              this.item = { ...this.initialItem }

              this.router.navigate(['/'])
            });

          });
        }).catch((e: any) => {
          console.error(e)
        })
      }
      this.sharedVariableService.user.addedItems.push({ itemId: itemId, placedOrderDetails: [] });

    } else {
      this.apiService.addItem(this.item).then(() => {
        this.uploadedFiles = [];

        this.item = { ...this.initialItem };
        this.router.navigate(['/'])

      })

    }


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
