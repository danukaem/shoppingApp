import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LayoutComponent } from './components/layout/layout.component';
import { FormsModule } from '@angular/forms';
import { NavbarComponent } from './components/layout/navbar/navbar.component';
import { SidebarComponent } from './components/layout/sidebar/sidebar.component';
import { ContainerComponent } from './components/layout/container/container.component';
import { FooterComponent } from './components/layout/footer/footer.component';
import { RegisterUserComponent } from './components/register-user/register-user.component';
import { SigninUserComponent } from './components/signin-user/signin-user.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialsModule } from './materials.module';
import { AddItemComponent } from './components/add-item/add-item.component';
import { ViewItemsComponent } from './components/view-items/view-items.component';
import { ImageSliderComponent } from './components/view-items/image-slider/image-slider.component';
import { ViewAllItemsComponent } from './components/view-all-items/view-all-items.component';
import { EditItemComponent } from './components/edit-item/edit-item.component';

@NgModule({
  declarations: [
    AppComponent,
    LayoutComponent,
    NavbarComponent,
    SidebarComponent,
    ContainerComponent,
    FooterComponent,
    RegisterUserComponent,
    SigninUserComponent,
    AddItemComponent,
    ViewItemsComponent,
    ImageSliderComponent,
    ViewAllItemsComponent,
    EditItemComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    BrowserAnimationsModule,
    MaterialsModule,

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
