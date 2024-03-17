import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { SharedVariablesService } from 'src/app/services/shared-variables.service';

@Component({
  selector: 'app-cart-item-row',
  templateUrl: './cart-item-row.component.html',
  styleUrls: ['./cart-item-row.component.css']
})
export class CartItemRowComponent implements OnInit {

  i = 0;

  @Input() itemWithImages: any;

  quantity = 0;



  constructor(
    private readonly router: Router,
    private readonly apiService: ApiService,
    public readonly sharedVariableService: SharedVariablesService
  ) { }

  ngOnInit(): void {
    this.quantity = this.itemWithImages['quantity']

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

  gotoItem(itemWithImages: any) {
    this.router.navigate(['/viewItem/' + itemWithImages['item']['itemId']])

  }

  quantityChange(qty: number) {
    this.quantity = this.quantity + qty;
    if (this.quantity < 0) { this.quantity = 0 }

    this.sharedVariableService.user.cartItems.map((val:any)=>{
      if(val['itemId'] ==this.itemWithImages['item']['itemId']){
        val['quantity'] =this.quantity;
      }
      return  val;
    })



    this.apiService.userRegister(this.sharedVariableService.user).then(() => { });

  }

}
