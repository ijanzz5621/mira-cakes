import { HttpModule } from '@angular/http';
import { ApiService } from './services/api.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// import { MdButtonModule, MdCardModule, MdMenuModule, MdToolbarModule, MdIconModule } from '@angular/material';

import { ModalModule } from 'ngx-bootstrap/modal';

import { AppComponent } from './app.component';
import { LoginFormComponent } from './login-form/login-form.component';
import { ProductComponent } from './components/product/product.component';
import { HeaderComponent } from './components/header/header.component';
import { HomeComponent } from './components/home/home.component';

// service
import { LoginService } from './services/login.service';

const appRoutes: Routes = [
  {
    path: 'login'
    , component: LoginFormComponent
  },
  {
    path: 'products'
    , component: ProductComponent
  },
  {
    path: ''
    , component: HomeComponent
  }
];

@NgModule({
  declarations: [
    AppComponent,
    LoginFormComponent,
    ProductComponent,
    HeaderComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule
    , RouterModule.forRoot(appRoutes)
    , FormsModule
    , ReactiveFormsModule
    , HttpModule
    , HttpClientModule
    // , MatDialogModule
    , BrowserAnimationsModule
    // , MdDialogModule
    // , MdButtonModule
    // , MdCardModule
    // , MdMenuModule
    // , MdToolbarModule
    // , MdIconModule
    , ModalModule.forRoot()
  ],
  providers: [LoginService, ApiService],
  bootstrap: [AppComponent]
})
export class AppModule { }
