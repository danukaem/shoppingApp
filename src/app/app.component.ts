import { Component, OnInit } from '@angular/core';
import { initializeApp } from 'firebase/app';
import { environment } from '../environments/environment';
import { getDatabase, ref, get, set, update, onValue, child, push, remove } from 'firebase/database';
import { SharedVariablesService } from './services/shared-variables.service';
import { ApiService } from './services/api.service';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  constructor(public readonly sharedVariableService: SharedVariablesService, private readonly apiService: ApiService) {
  }
  ngOnInit(): void {
    // this.writeData();
    this.sharedVariableService.user = JSON.parse(localStorage.getItem('user')!);
  }

  writeData() {
    const app = initializeApp(environment.firebase);
    const db = getDatabase(app);
    const dataRef = ref(db, 'users/');


    console.log('aaaaaaaa1');

    // get(dataRef).then((snapshot) => {
    //   if (snapshot.exists()) {
    //     const data = snapshot.val();
    //     console.log(data);
    //   } else {
    //     console.log('No data available');
    //   }
    // });


    // set(ref(db,'users/'+0),{
    //   name:'malawana',
    //   age:33,
    //   items:[{iName:'soap',price:35},{iName:'sugar',price:155},{iName:'rice',price:210}],
    //   fileIds:['aaa','bbb','ccc']
    // });


    // update(ref(db,'users/'+0),{
    //   name:'daunka eranda malawana',
    //   age:33
    // })

    // set(ref(db,'users/'+0),{
    //   name:'danuka',
    //   age:33,
    //   location:'sri lanka'
    // })



    console.log('aaaaa2');

    ////////////////////////////////////////////////////////////
    // set(ref(db, 'users/boys/school/' + 0), {
    //   username: 'name',
    //   email: 'email',
    //   profile_picture : 'imageUrl'
    // });

    // get(child(dataRef, `users`)).then((snapshot) => {
    //   if (snapshot.exists()) {
    //     console.log(snapshot.val());
    //   } else {
    //     console.log("No data available");
    //   }
    // }).catch((error) => {
    //   console.error(error);
    // });

    //     let a ;
    //     get( dataRef ).then((snapshot) => {
    //       if (snapshot.exists()) {
    //         console.log(snapshot.val());
    //         a=JSON.parse(snapshot.val());
    // console.log(a);

    //       } else {
    //         console.log("No data available");
    //       }
    //     }).catch((error) => {
    //       console.error(error);
    //     });

    // console.log(a);



    // set(push(ref(db, 'users' )), {
    //   date: new Date().toDateString(),
    //   time:new Date().toTimeString()
    // });


    // set(push(ref(db, 'schools' )), {
    //   date: new Date().toDateString(),
    //   time:new Date().toTimeString()
    // });

    // remove???????
    ////////////////////////////////////////////////////////////


    get(ref(db, 'users/danukaem1234/testDetails')).then((snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.val();
      } else {
        console.log('No data available');
      }
    });

  }

}
