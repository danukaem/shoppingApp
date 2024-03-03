import { Component, OnInit } from '@angular/core';
import { initializeApp } from 'firebase/app';
import { environment } from '../environments/environment';
import { getDatabase, ref, get, set, update, onValue ,child, push ,remove} from 'firebase/database';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  constructor() {
  }
  ngOnInit(): void {
    this.writeData();
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
    //   age:33
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
    
    // get(child(dataRef, `boys/school`)).then((snapshot) => {
    //   if (snapshot.exists()) {
    //     console.log(snapshot.val());
    //   } else {
    //     console.log("No data available");
    //   }
    // }).catch((error) => {
    //   console.error(error);
    // });



    set(push(ref(db, 'users' )), {
      date: new Date().toDateString(),
      time:new Date().toTimeString()
    });


// remove???????
    ////////////////////////////////////////////////////////////

  }

}
