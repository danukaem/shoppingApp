import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './components/layout/layout.component';
import { RegisterUserComponent } from './components/register-user/register-user.component';
import { RegisterSuperAdminComponent } from './components/register-super-admin/register-super-admin.component';
import { RegisterAdminComponent } from './components/register-admin/register-admin.component';
import { SigninUserComponent } from './components/signin-user/signin-user.component';

const routes: Routes = [
  { path: '', component: LayoutComponent },
  { path: 'SuperAdminRegister', component: RegisterSuperAdminComponent },
  { path: 'AdminRegister', component: RegisterAdminComponent },
  { path: 'userRegister', component: RegisterUserComponent },
  { path: 'Signin', component: SigninUserComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
