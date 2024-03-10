import { Injectable } from '@angular/core';

import { initializeApp } from 'firebase/app';
import { environment } from '../../environments/environment';
import { getDatabase, ref, child, get, set, push, Database } from 'firebase/database';
import { collection, getDocs } from "firebase/firestore";
import { Item, User } from './models';
import { SharedVariablesService } from './shared-variables.service';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private sharedVariable: SharedVariablesService) { }

  userRegister(user: User): Promise<any> {
    this.sharedVariable.user = user;
    let emailFirstPartFirstPart = user['email'].split('@')[0]
    const app = initializeApp(environment.firebase);
    const db = getDatabase(app);
    const dataRef = ref(db, `users/${emailFirstPartFirstPart}_${user['password']}`);
    localStorage.setItem('uemailpassword', `${emailFirstPartFirstPart}_${user['password']}`);
    return set(dataRef, this.sharedVariable.user);


  }

  async userSignin(email: string, password: string): Promise<boolean> {
    let emailFirstPart = email.split('@')[0]
    const app = initializeApp(environment.firebase);
    const db = getDatabase(app);
    const dataRef = ref(db, `users/${emailFirstPart}_${password}`);
    let logged = false;
    await get(dataRef).then((snapshot) => {
      if (snapshot.exists()) {
        this.sharedVariable.user = snapshot.val();
        localStorage.setItem('user', JSON.stringify(snapshot.val()))
        localStorage.setItem('email', this.sharedVariable.user?.email.toString() + '')
        logged = true;
      } else {
        logged = false;
      }
    }).catch((error) => {
      console.error(error);
    });
    return logged;
  }

  imageUpload(fileId: string, fileName: string, fileBase64String: string, item: Item): Promise<any> {
    const app = initializeApp(environment.firebase);
    const db = getDatabase(app);
    const dataRef = ref(db, `files/${fileId}/`);
    return set(dataRef, {
      fileId,
      fileName,
      fileBase64String
    });
  }

  getImage(fileId: any): Promise<any> {
    const app = initializeApp(environment.firebase);
    const db = getDatabase(app);
    const dataRef = ref(db, `files/${fileId}`);
    return get(dataRef)
  }

  getImages() {
    this.sharedVariable.files = [];
    const app = initializeApp(environment.firebase);
    const db = getDatabase(app);
    const dataRef = ref(db, `files/`);
    get(dataRef).then((snapshot) => {
      if (snapshot.exists()) {
        const keys = Object.keys(snapshot.val())
        for (let key of keys) {
          this.getImage(key).then((res: any) => {
            if (res.exists()) {
              this.sharedVariable.files.push(res.val());
            }
          })
        }
      } else {
        console.log("No data available");
      }
    });
  }

  convertImageToBase64(file: File): Promise<string> {
    return new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        resolve(reader.result as string);
      };
      reader.onerror = (error) => {
        reject(error);
      };
      reader.readAsDataURL(file);
    });
  }

  addItem(item: Item): Promise<any> {
    const app = initializeApp(environment.firebase);
    const db = getDatabase(app);
    const dataRef = ref(db, `items/${item['itemId']}`);
    return set(dataRef,
      item
    );
  }

  getItem(itemId: any): Promise<any> {
    const app = initializeApp(environment.firebase);
    const db = getDatabase(app);
    const dataRef = ref(db, `items/${itemId}`);
    return get(dataRef);
  }

  getAllItem(): Promise<any> {
    const app = initializeApp(environment.firebase);
    const db = getDatabase(app);
    const dataRef = ref(db, `items/`);
    return get(dataRef);
  }


  getAssets(): Promise<any> {
    const app = initializeApp(environment.firebase);
    const db = getDatabase(app);
    const dataRef = ref(db, `assets/`);
    return get(dataRef);
  }
}
