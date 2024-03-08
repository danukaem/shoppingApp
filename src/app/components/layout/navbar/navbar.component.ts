import { Component, OnInit } from '@angular/core';
import { SharedVariablesService } from 'src/app/services/shared-variables.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  username;
  constructor(public sharedVariable: SharedVariablesService){


    console.log('user',this.sharedVariable.user);
    this.username =this.sharedVariable.user?.email;

  
  }
  ngOnInit(): void {

    this.username = localStorage.getItem('username')+'';

    console.log('username::::::::::::::::::',this.username);
    
    // if( this.sharedVariable.user?.username != undefined){
    //   this.sharedVariable.user?.username = ''

    // }
    // this.sharedVariable.user?.username = ''
    // this.sharedVariable.user?.username = localStorage.getItem('username')+''
    // this.sharedVariable.user = {...this.sharedVariable.user,username:localStorage.getItem('username')+''}

  }

}
