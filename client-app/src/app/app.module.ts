import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { HeaderComponent } from './components/header/header.component';
import { HomeComponent } from './components/home/home.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { RegisterComponent } from './components/register/register.component';

// services
import { LoginService } from './services/login.service';

const appRoutes: Routes = [
  {
    path: 'login'
    , component: LoginComponent
  },
  {
    path: 'register'
    , component: RegisterComponent
  },
  {
    path: 'checkout'
    , component: CheckoutComponent
  },
  {
    path: ''
    , component: HomeComponent
  }
];

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    LoginComponent,
    CheckoutComponent,
    RegisterComponent
  ],
  imports: [
    BrowserModule
    , RouterModule.forRoot(appRoutes)
    , FormsModule
    , ReactiveFormsModule
  ],
  providers: [LoginService],
  bootstrap: [AppComponent]
})
export class AppModule { }
