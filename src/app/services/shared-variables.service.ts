import { Injectable } from '@angular/core';
import { User, File, Item } from './models';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedVariablesService {

  user: User = {
    email: '',
    firstName: '',
    lastName: '',
    gender: '',
    address: '',
    password: '',
    addedItems: [],
    cartItems: [],
    orderedItems: [],
    userRole: ''
  };

  files: File[] = [];

  yourItems: Item[] = [];

  allItems: Item[] = [];

  editItem :any;
  viewItemData:any;


  deleteEditSubject = new Subject<any>();

  itemKeyMap:any = {
    itemId:'Item Id',
    fileIds: 'File Ids' , 
    name: 'Name',
    condition: 'Condition',
    saleEnd: 'Sale ends',
    quantity: 'Quantity',
    price: 'Price',
    postage: 'Postage',
    delivery: 'Delivery',
    return: 'Return',
    coverage: 'Coverage',
    specification: 'specification',
    conditionDescription: 'Condition Description',
    type: 'Type',
    color: 'Color',
    gender: 'Gender',
    description: 'Description',
    brand: 'Brand',
    size: 'Size',
    style: 'Style',
    material: 'Material',
    countryManufactured: 'Country Manufactured',
    itemOwnerUserId: 'Item Owner UserId'
  };



  constructor() { }

}
