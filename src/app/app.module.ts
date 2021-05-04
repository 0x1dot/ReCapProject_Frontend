import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NaviComponent } from './components/navi/navi.component';
import { BrandComponent } from './components/brand/brand/brand.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ColorComponent } from './components/color/color/color.component';
import { CustomerComponent } from './components/customer/customer/customer.component';
import { CarComponent } from './components/car/car.component';
import { RentalComponent } from './components/rental/rental.component';
import { CarDetailsComponent } from './components/car/car-details/car-details.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FilterPipePipe } from './pipes/filter-pipe.pipe';
import {ToastrModule} from "ngx-toastr";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import { CartSummaryComponent } from './components/navi/cart-summary/cart-summary.component';
import { PaymentComponent } from './components/payment/payment.component';
import { RentaddComponent } from './components/rental/rentadd/rentadd.component';
import { BrandActionComponent } from './components/brand/brand/brand-action/brand-action.component';
import { ColorActionComponent } from './components/color/color/color-action/color-action.component';
import { CarActionComponent } from './components/car/car-action/car-action.component';
import { LoginComponent } from './components/login/login.component';
import { AuthInterceptor } from './interceptors/auth.interceptor';
import { RegisterComponent } from './components/register/register.component';
import { CartshopComponent } from './components/cartshop/cartshop.component';
import { ProfileComponent } from './components/profile/profile.component';

@NgModule({
  declarations: [
    AppComponent,
    NaviComponent,
    BrandComponent,
    ColorComponent,
    CustomerComponent,
    CarComponent,
    RentalComponent,
    CarDetailsComponent,
    FilterPipePipe,
    CartSummaryComponent,
    PaymentComponent,
    BrandActionComponent,
    ColorActionComponent,
    CarActionComponent,
    LoginComponent,
    RentaddComponent,
    RegisterComponent,
    CartshopComponent,
    ProfileComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      positionClass:"toast-bottom-right"
    }),
  ],
  providers: [
    {provide:HTTP_INTERCEPTORS, useClass:AuthInterceptor,multi:true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
