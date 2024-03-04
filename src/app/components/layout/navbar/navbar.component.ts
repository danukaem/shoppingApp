import { Component } from '@angular/core';
import { SharedVariablesService } from 'src/app/services/shared-variables.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  constructor(public sharedVariable: SharedVariablesService){

    console.log('user',this.sharedVariable.user);
    

  
  }

}
