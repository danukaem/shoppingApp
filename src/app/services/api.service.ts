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

    // return set(dataRef, {
    //   firstName: user['firstName'],
    //   lastName: user['lastName'],
    //   gender: user['gender'],
    //   address: user['address'],
    //   email: user['email'],
    //   password: user['password'],
    //   date: new Date().toDateString(),
    //   time: new Date().toTimeString()
    // });

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
        console.log(snapshot.val());
        this.sharedVariable.user = snapshot.val();
        console.log('signin user: ', this.sharedVariable.user);
        localStorage.setItem('user', JSON.stringify(snapshot.val()))

        localStorage.setItem('email', this.sharedVariable.user?.email.toString() + '')
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

  // imageUpload(fileId: string, fileName: string, fileBase64String: string,item:Item) {

  //   const app = initializeApp(environment.firebase);
  //   const db = getDatabase(app);
  //   const dataRef = ref(db, `files/${fileId}/`);

  //   set(dataRef, {
  //     fileId,
  //     fileName,
  //     fileBase64String
  //   }).then(()=>{

  //     this.addItem(item);
  //   })

  // }


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

  // async getImage(i: any): Promise<any> {

  //   const app = initializeApp(environment.firebase);
  //   const db = getDatabase(app);
  //   const dataRef = ref(db, `files/${i}`);



  //   await get(dataRef).then((snapshot) => {
  //     if (snapshot.exists()) {
  //       console.log('bbbbbbbb', snapshot.val());
  //       this.sharedVariable.files.push(snapshot.val());

  //     } else {
  //       console.log("No data available");
  //     }

  //     console.log('this.sharedVariable.files', this.sharedVariable.files);

  //   }).catch((error) => {
  //     console.error(error);
  //   });



  // }

  // async getImages(): Promise<any> {

  //   const app = initializeApp(environment.firebase);
  //   const db = getDatabase(app);
  //   const dataRef = ref(db, `files/`);

  //   let logged = false;

  //   await get(dataRef).then((snapshot) => {
  //     if (snapshot.exists()) {
  //       console.log('files', snapshot.val());
  //       const keys = Object.keys(snapshot.val())

  //       console.log('keys', keys);

  //       for (let key of keys) {
  //         this.getImage(key).then((val: any) => {
  //           console.log('aaaaaaaa', val);


  //         }).catch((e: any) => {
  //           console.error(e)
  //         })

  //       }




  //       // this.sharedVariable.files.push(snapshot.val());

  //     } else {
  //       console.log("No data available");
  //     }
  //   }).catch((error) => {
  //     console.error(error);
  //   });

  //   console.log('files:::::::::', this.sharedVariable.files);

  //   return logged;


  // }


  ////////////////////////////////////////////////////////////////
   
  getImage(fileId: any): Promise<any> {

    const app = initializeApp(environment.firebase);
    const db = getDatabase(app);
    const dataRef = ref(db, `files/${fileId}`);

    return get(dataRef)
  }

  getImages() {
    // getImages(): Promise<any> {

    this.sharedVariable.files =[];
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
        console.log('this.sharedVariable.files8888888888888888',this.sharedVariable.files);
        
      } else {
        console.log("No data availablessssssss");
      }
    });
  }
  //////////////////////////////////////////////////////////////



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
    debugger

    const app = initializeApp(environment.firebase);
    const db = getDatabase(app);
    const dataRef = ref(db, `items/${itemId}`);

    return get(dataRef);
  }

}
