import { Injectable } from '@angular/core';

import { initializeApp } from 'firebase/app';
import { environment } from '../../environments/environment';
import { getDatabase, ref, child, get, set, push } from 'firebase/database';
import { collection, getDocs } from "firebase/firestore";
import { User } from './models';
import { SharedVariablesService } from './shared-variables.service';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  // user: User = {
  //   username: '',
  //   firstName: '',
  //   lastName: '',
  //   gender: '',
  //   address: '',
  //   email: '',
  //   password: ''
  // };

  constructor(private sharedVariable: SharedVariablesService) { }


  userRegister(user: any) {

    const app = initializeApp(environment.firebase);
    const db = getDatabase(app);
    const dataRef = ref(db, 'users/' + user['username'] + user['password']);
    localStorage.setItem('usernamepassword', user['username'] + user['password']);

    // set(push(dataRef), {
    //   firstName: user['firstName'],
    //   flastName: user['lastName'],
    //   gender: user['gender'],
    //   address: user['address'],
    //   email: user['email'],
    //   password: user['password'],
    //   date: new Date().toDateString(),
    //   time: new Date().toTimeString()
    // });

    set(dataRef, {
      username: user['username'],
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

  async userSignin(username: string, password: string): Promise<boolean> {

    const app = initializeApp(environment.firebase);
    const db = getDatabase(app);
    const dataRef = ref(db, `users/${username}${password}`);

    let logged = false;

    await get(dataRef).then((snapshot) => {
      if (snapshot.exists()) {
        console.log(snapshot.val());
        this.sharedVariable.user = snapshot.val();
        localStorage.setItem('username',this.sharedVariable.user?.username.toString()+'')
        logged = true;
      } else {
        console.log("No data available");
        logged = false;
      }
    }).catch((error) => {
      console.error(error);
    });
    return logged;


  }

  imageUpload(file: File) {

    const app = initializeApp(environment.firebase);
    const db = getDatabase(app);
    const dataRef = ref(db, 'files/');

    // set(push(dataRef), {
    //   firstName: user['firstName'],
    //   flastName: user['lastName'],
    //   gender: user['gender'],
    //   address: user['address'],
    //   email: user['email'],
    //   password: user['password'],
    //   date: new Date().toDateString(),
    //   time: new Date().toTimeString()
    // });

    set(dataRef, {
      file:file
    });

  }
}
