import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { Item } from 'src/app/services/models';
import { SharedVariablesService } from 'src/app/services/shared-variables.service';

@Component({
  selector: 'app-view-item',
  templateUrl: './view-item.component.html',
  styleUrls: ['./view-item.component.css']
})
export class ViewItemComponent implements OnInit {

  i = 0;

  keys: any[] | any = [];

  itemWithImages: any = { item: {}, files: [] };

  itemIdParam = '';

  changeAddressView = false;

  address = '';
  quantity = 0;
  disable = false;

  constructor(
    private readonly apiService: ApiService,
    public readonly sharedVariableService: SharedVariablesService,
    private readonly route: ActivatedRoute
  ) {

  }

  ngOnInit(): void {

    this.itemIdParam = this.route.snapshot.params['itemId'];
    this.getItem(this.itemIdParam);
    this.keys = Object.keys(this.itemWithImages['item']);


    if (this.sharedVariableService.user != null && this.sharedVariableService.user != undefined) {
      this.disable = false;

      let cartItems = this.sharedVariableService.user.cartItems.filter((val: any) => { return val.itemId == this.itemIdParam })
      if (cartItems.length > 0) {
        this.quantity = cartItems[0].quantity;
      }
    } else {
      this.disable = true;

    }




  }

  getItem(itemId: string) {

    this.apiService.getItem(itemId).then((item: any) => {

      if (item.exists()) {
        this.itemWithImages['item'] = item.val()
        this.keys = Object.keys(this.itemWithImages['item']);

        for (let fileId of item.val().fileIds) {
          this.apiService.getImage(fileId).then((val: any) => {
            if (val.exists()) {
              this.itemWithImages['files'].push(val.val())
            }
          }).catch((e: any) => {
            console.error(e);
          })
        }

      }
    }).catch((e: any) => {
      console.error(e);
    })

  }

  slideImages(action: string) {
    if (this.itemWithImages['files'].length > this.i && this.i > -1) {
      if (action === '-') {
        if (this.i > 0) {
          this.i = this.i - 1;
        }
      } else if (action === '+') {
        if (this.i < this.itemWithImages['files'].length - 1) {
          this.i = this.i + 1;
        }
      }
    }
  }

  imageClick(i: number) {
    console.log('image clicked', i);

    this.i = i;
  }

  changeAddressClick() {
    this.changeAddressView = !this.changeAddressView;
  }

  saveNewAddress() {
    this.sharedVariableService.user.address = this.address;
    this.apiService.userRegister(this.sharedVariableService.user).then(() => {
      this.changeAddressView = false;
    });
  }

  quantityChange(qty: number) {
    this.quantity = this.quantity + qty;
    if (this.quantity < 0) { this.quantity = 0 }
  }

  addToCart() {

    if (!this.sharedVariableService.user.cartItems) {
      this.sharedVariableService.user.cartItems = []
    }

    let cartItems = this.sharedVariableService.user.cartItems.filter((val: any) => { return val.itemId == this.itemIdParam })
    if (cartItems.length > 0) {
      this.sharedVariableService.user.cartItems = this.sharedVariableService.user.cartItems.filter((val: any) => { return val.itemId != this.itemIdParam })
    }

    if (this.quantity > 0) {
      this.sharedVariableService.user.cartItems.push(
        {
          itemId: this.itemWithImages['item']['itemId'],
          quantity: this.quantity
        }
      )
    }
    this.apiService.userRegister(this.sharedVariableService.user).then(() => { });

  }

}
