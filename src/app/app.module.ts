import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './login/login.component';
import { CouponComponent } from './coupon/coupon.component';
import { PrintComponent } from './print/print.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    CouponComponent,
    PrintComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [PrintComponent]
})
export class AppModule { }
