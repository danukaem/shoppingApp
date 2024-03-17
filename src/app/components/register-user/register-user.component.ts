import { Component, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { User } from 'src/app/services/models';
import { SharedVariablesService } from 'src/app/services/shared-variables.service';

@Component({
  selector: 'app-register-user',
  templateUrl: './register-user.component.html',
  styleUrls: ['./register-user.component.css']
})
export class RegisterUserComponent implements OnInit {

  user: User = {
    firstName: '',
    lastName: '',
    gender: '',
    address: '',
    email: '',
    password: '',
    addedItems: [],
    cartItems: [],
    orderedItems: [],
    userRole: ''
  }

  item = '';
  showAlert = false;
  showAlertSuccess = false;

  siteLogo: any;


  constructor(private readonly apiService: ApiService, private readonly router: Router,private sharedVariable: SharedVariablesService) {

  }

  ngOnInit(): void {
    this.apiService.getAssets().then((val) => {
      if (val.exists()) {
        this.siteLogo = val.val()['siteLogo']
      }
    })

    // this.apiService.getImages();

  }

  selectGender(val: string) {
    this.user.gender = val;

  }

  registerUser() {

    if (this.formValidation()) {
      this.apiService.userRegister(this.user).then(()=>{
        this.user = {
          firstName: '',
          lastName: '',
          gender: '',
          address: '',
          email: '',
          password: '',
          addedItems: [],
          cartItems: [],
          orderedItems: [],
          userRole: ''
        };
        this.showAlertSuccess = false;
        
        setTimeout(() => {
          this.router.navigate(['/'])
  
        }, 1000)
      })
     

    } else {
      this.showAlert = true;

    }
  }

  formValidation(): boolean {

    // if (this.user.username.trim() == '') {
    //   this.item = 'username';
    //   return false;
    // } else 
    if (this.user.firstName.trim() == '') {
      this.item = 'first name';
      return false;
    } else if (this.user.lastName.trim() == '') {
      this.item = 'last name';
      return false;
    } else if (this.user.gender.trim() == '') {
      this.item = 'gender';
      return false;
    } else if (this.user.address.trim() == '') {
      this.item = 'address';
      return false;
    } else if (this.user.email.trim() == '') {
      this.item = 'email';
      return false;
    } else if (this.user.password.trim() == '') {
      this.item = 'password';
      return false;
    } else {
      this.showAlert = false;
      return true;
    }
  }

  closeAlert() {
    this.showAlert = false;
  }

  closeAlertSuccess() {
    this.showAlertSuccess = false;



  }
}
