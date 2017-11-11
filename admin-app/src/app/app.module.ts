import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { RouterModule, Routes } from '@angular/router';

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
  ],
  providers: [LoginService],
  bootstrap: [AppComponent]
})
export class AppModule { }
