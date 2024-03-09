import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SharedVariablesService } from 'src/app/services/shared-variables.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  username;
  constructor(public sharedVariable: SharedVariablesService,private router:Router){


    console.log('user',this.sharedVariable.user);
    this.username =this.sharedVariable.user?.email;

  
  }
  ngOnInit(): void {
    this.username = localStorage.getItem('email')+'';
  }

  logout(){

    localStorage.clear();
    this.router.navigate(['/'])

    setTimeout(()=>{window.location.reload();},100)
    // this.router.navigate(['/signin'])

  }

}
