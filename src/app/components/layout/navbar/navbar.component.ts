import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { SharedVariablesService } from 'src/app/services/shared-variables.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  username;
  siteLogo: any;
  constructor(public sharedVariable: SharedVariablesService, private router: Router, private readonly apiService: ApiService) {
    this.username = this.sharedVariable.user?.email;
  }

  ngOnInit(): void {
    this.username = localStorage.getItem('email') + '';
    this.apiService.getAssets().then((val) => {
      if (val.exists()) {
        this.siteLogo = val.val()['siteLogo']
      }
    })
  }

  logout() {

    localStorage.clear();
    this.router.navigate(['/'])

    setTimeout(() => { window.location.reload(); }, 100)
    // this.router.navigate(['/signin'])

  }

}
