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


  constructor(
    private readonly apiService: ApiService,
    public readonly sharedVariableService: SharedVariablesService,
    private readonly route: ActivatedRoute
  ) { }

  ngOnInit(): void {

    if (this.sharedVariableService.user && this.sharedVariableService.user.cartItems) {
      console.log('this.sharedVariableService.user.cartItems in cart items', this.sharedVariableService.user.cartItems);
      console.log('this.sharedVariableService.user  in cart items', this.sharedVariableService.user);
      this.loadCartItems(this.sharedVariableService.user.cartItems);


    }

  }

  loadCartItems(cartItems: {
    itemId: string,
    quantity: number
  }[]) {


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


  


}
