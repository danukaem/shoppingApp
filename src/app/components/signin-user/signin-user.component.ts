import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-signin-user',
  templateUrl: './signin-user.component.html',
  styleUrls: ['./signin-user.component.css']
})
export class SigninUserComponent {

  username: string = '';
  password: string = '';


  showAlertfailed = false;

  constructor(private readonly apiService: ApiService, private readonly router: Router) { }

  signin() {
    this.apiService.userSignin(this.username, this.password).then((res) => {

      if (res) {
        this.router.navigate(['/'])

      } else {
        this.showAlertfailed = true;

      }
    }).catch((e) => { 
      this.showAlertfailed = true;

    })




  }

  closeAlert() {
    this.showAlertfailed = false;

  }

}
