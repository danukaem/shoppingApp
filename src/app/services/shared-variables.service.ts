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


  deleteEditSubject = new Subject<any>();



  constructor() { }

}
