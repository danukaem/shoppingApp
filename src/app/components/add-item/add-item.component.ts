import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { Item } from 'src/app/services/models';
import { SharedVariablesService } from 'src/app/services/shared-variables.service';

@Component({
  selector: 'app-add-item',
  templateUrl: './add-item.component.html',
  styleUrls: ['./add-item.component.css']
})
export class AddItemComponent implements OnInit {

  item: Item = {
      files: [],
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
    }


  image64String: any[] = [];

  constructor(private readonly apiService: ApiService, private readonly sharedService: SharedVariablesService) { }
  ngOnInit(): void {
    this.image64String = this.sharedService.files;


  }

  uploadFile(event: any) {
    console.log('file',event);
    console.log('file',event.target.files);
    console.log('file',event.target.files[0].name);
    

    for (let i = 0; i < event.target.files.length; i++) {
      this.apiService.convertImageToBase64(event.target.files[i]).then((base64String: string) => {
        this.apiService.imageUpload(event.target.files[i].name.replaceAll('.',''), base64String);
        // this.item.files.push(base64String);

      }).catch((e: any) => {
        console.error(e)
      })

    }



  }

}
