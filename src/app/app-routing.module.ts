import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './components/layout/layout.component';
import { RegisterUserComponent } from './components/register-user/register-user.component';
import { SigninUserComponent } from './components/signin-user/signin-user.component';
import { AddItemComponent } from './components/add-item/add-item.component';
import { ViewItemsComponent } from './components/view-items/view-items.component';
import { ViewAllItemsComponent } from './components/view-all-items/view-all-items.component';
import { EditItemComponent } from './components/edit-item/edit-item.component';
import { ViewItemComponent } from './components/view-items/view-item/view-item.component';
import { CartItemsComponent } from './components/cart-items/cart-items.component';

const routes: Routes = [
  {
    path: '', component: LayoutComponent, children: [
      { path: '', component: ViewAllItemsComponent },
      { path: 'addItem', component: AddItemComponent },
      { path: 'editItem', component: EditItemComponent },
      { path: 'viewItems', component: ViewItemsComponent },
      { path: 'viewAllItems', component: ViewAllItemsComponent },
      { path: 'viewItem/:itemId', component: ViewItemComponent },
      { path: 'cartItems', component: CartItemsComponent },

      
    ]
  },
  { path: 'register', component: RegisterUserComponent },
  { path: 'signin', component: SigninUserComponent },
  { path: '*', redirectTo: '/' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
