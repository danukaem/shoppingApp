import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { SharedVariablesService } from 'src/app/services/shared-variables.service';

@Component({
  selector: 'app-cart-items',
  templateUrl: './cart-items.component.html',
  styleUrls: ['./cart-items.component.css']
})
export class CartItemsComponent implements OnInit {

  itemsWithImages: any[] = [];
  i = 0;

  subTotal = 0;
  shippingFee = 400;
  total = 0;

  selectedItems: any = [];


  constructor(
    private readonly apiService: ApiService,
    public readonly sharedVariableService: SharedVariablesService,
    private readonly route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    if (this.sharedVariableService.user && this.sharedVariableService.user.cartItems) {
      this.loadCartItems(this.sharedVariableService.user.cartItems);
    }
    this.calculateTotal();
  }

  loadCartItems(cartItems: {
    itemId: string,
    quantity: number
  }[]) {
    this.itemsWithImages =[];
    for (let cartItem of cartItems) {
      let itemWithImages: any = { item: {}, files: [] };
      itemWithImages['quantity'] = cartItem['quantity'];
      this.apiService.getItem(cartItem.itemId).then((item: any) => {
        if (item.exists()) {
          itemWithImages['item'] = item.val();
          for (let fileId of item.val().fileIds) {
            this.apiService.getImage(fileId).then((val: any) => {
              if (val.exists()) {
                itemWithImages['files'].push(val.val())
              }
            }).catch((e: any) => {
              console.error(e);
            })
          }
          this.itemsWithImages.push(itemWithImages);
        }
      }).catch((e: any) => {
        console.error(e);
      })
    }
  }

  checkout() {

  }

  checkItem(cartItem: any, event: any) {
    if (event.checked) {
      let duplicated = this.selectedItems.find((val: any) => {
        return val['item']['itemId'] == cartItem['item']['itemId']
      })
      if (!duplicated) {
        this.selectedItems.push(cartItem);
      }
    } else {
      this.selectedItems = this.selectedItems.filter((val: any) => {
        return val['item']['itemId'] != cartItem['item']['itemId']
      })
    }
    this.calculateTotal();
  }

  calculateTotal() {
    this.total = 0;
    this.subTotal = 0;
    for (let selectedItem of this.selectedItems) {
      this.subTotal = this.subTotal + Number(selectedItem['item']['price']) * Number(selectedItem['quantity'])
    }
    this.total = this.subTotal + this.shippingFee;
  }

  changeQuantity(event: any) {
    this.calculateTotal();
  }

  selectAll(event: any) {
    if (event.checked) {
      this.selectedItems = this.itemsWithImages;
    } else {
      this.selectedItems = []
    }
    this.calculateTotal();
  }

  isInSelectedList(cartItem: any): boolean {
    let duplicated = this.selectedItems.find((val: any) => {
      return val['item']['itemId'] == cartItem['item']['itemId']
    })
    if (duplicated) {
      return true;
    } else {
      return false;
    }
  }

  deleteSelectdeItems() {

    console.log('this.selectedItems', this.selectedItems);
    console.log('1 this.sharedVariableService.user.cartItems', this.sharedVariableService.user.cartItems);


    for (let selectedItem of this.selectedItems) {

      this.sharedVariableService.user.cartItems = this.sharedVariableService.user.cartItems.filter((val: any) => {
        return val['itemId'] != selectedItem['item']['itemId']
      })


    }

    console.log('2 this.sharedVariableService.user.cartItems', this.sharedVariableService.user.cartItems);



    this.apiService.userRegister(this.sharedVariableService.user).then(() => { 
      this.loadCartItems(this.sharedVariableService.user.cartItems);

    });
  }


}
