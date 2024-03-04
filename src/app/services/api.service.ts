import { Injectable } from '@angular/core';

import { initializeApp } from 'firebase/app';
import { environment } from '../../environments/environment';
import { getDatabase, ref, get, set, update, onValue, child, push, remove } from 'firebase/database';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor() { }


  userRegister(user: any) {

    const app = initializeApp(environment.firebase);
    const db = getDatabase(app);
    const dataRef = ref(db, 'users/');

    set(push(dataRef), {
      firstName: user['firstName'],
      flastName: user['lastName'],
      gender: user['gender'],
      address: user['address'],
      email: user['email'],
      password: user['password'],
      date: new Date().toDateString(),
      time: new Date().toTimeString()
    });

  }
}
