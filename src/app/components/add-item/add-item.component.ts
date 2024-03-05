import { Component } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-add-item',
  templateUrl: './add-item.component.html',
  styleUrls: ['./add-item.component.css']
})
export class AddItemComponent {

  item: {
    name: string;
    condition: string;
    saleEnd: string;
    quantity: string;
    price: string;
    postage: string;
    delivery: string;
    return: string;
    coverage: string;
    specification: string;
    conditionDescription: string;
    type: string;
    color: string;
    gender: string;
    description: string;
    brand: string;
    size: string;
    style: string;
    material: string;
    countryManufactured: string;
  } = {
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


    constructor(private readonly apiService:ApiService){}

    uploadFile(event:any){

      // console.log('file::',event );
      console.log('file::',event.target.files[0]);

      this.apiService.imageUpload(event.target.files[0]);
      

    }

}
