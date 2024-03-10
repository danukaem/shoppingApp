import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './components/layout/layout.component';
import { RegisterUserComponent } from './components/register-user/register-user.component';
import { SigninUserComponent } from './components/signin-user/signin-user.component';
import { AddItemComponent } from './components/add-item/add-item.component';
import { ViewItemsComponent } from './components/view-items/view-items.component';
import { ViewAllItemsComponent } from './components/view-all-items/view-all-items.component';

const routes: Routes = [
  {
    path: '', component: LayoutComponent, children: [
      { path: '', component: ViewAllItemsComponent },

      { path: 'addItem', component: AddItemComponent },
      { path: 'viewItem', component: ViewItemsComponent },
      { path: 'viewAllItems', component: ViewAllItemsComponent },

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
