import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { Item } from 'src/app/services/models';
import { SharedVariablesService } from 'src/app/services/shared-variables.service';
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-edit-item',
  templateUrl: './edit-item.component.html',
  styleUrls: ['./edit-item.component.css']
})
export class EditItemComponent implements OnInit {

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

  uploadedImageBase64List: { fileId: string, fileName: string, fileBase64String: string }[] = [];

  removedImages: { fileId: string, fileName: string, fileBase64String: string }[] = []

  i = 0;

  constructor(
    private readonly apiService: ApiService,
    private readonly sharedVariableService: SharedVariablesService,
    private readonly sharedService: SharedService,
    private readonly router:Router
  ) {

  }
  ngOnInit(): void {
    if (this.sharedVariableService.editItem) {
      this.item = this.sharedVariableService.editItem['item']
      this.uploadedImageBase64List = this.sharedVariableService.editItem['files']
    }

  }
  uploadFile(event: any) {
    this.uploadedFiles = event.target.files;
    if (this.uploadedFiles.length > 0) {
      for (let i = 0; i < this.uploadedFiles.length; i++) {
        const fileId = this.sharedService.generateRandomId(20);

        this.apiService.convertImageToBase64(this.uploadedFiles[i]).then((fileBase64String: string) => {
          this.uploadedImageBase64List.push({ fileId: fileId, fileName: this.uploadedFiles[i]['name'], fileBase64String: fileBase64String })

        })

      }
    }

  }


  editItem() {

    for (let i of this.removedImages) {
      this.apiService.removeFile(i.fileId).then();

    }
    this.item.fileIds = []

    for (let i of this.uploadedImageBase64List) {
      this.item.fileIds.push(i.fileId);
      this.apiService.imageUpload(i.fileId, i.fileName, i.fileBase64String, this.item).then(() => {

      });
      this.apiService.addItem(this.item).then(() => {
        this.uploadedFiles = [];

        this.item = { ...this.initialItem }
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

  removeItem(i: { fileId: string, fileName: string, fileBase64String: string }, x: number) {
    this.slideImages('-');

    this.removedImages.push(i);
    this.uploadedImageBase64List = this.uploadedImageBase64List.filter((val: any) => { return val.fileId != i.fileId })


  }
}
