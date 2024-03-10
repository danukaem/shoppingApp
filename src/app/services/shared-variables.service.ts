import { Injectable } from '@angular/core';
import { User, File, Item } from './models';

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

  items: Item[] = [];


  constructor() { }

}
