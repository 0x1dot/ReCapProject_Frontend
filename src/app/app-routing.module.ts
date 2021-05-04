import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BrandActionComponent } from './components/brand/brand/brand-action/brand-action.component';
import { CarActionComponent } from './components/car/car-action/car-action.component';
import { CarComponent } from './components/car/car.component';
import { CartshopComponent } from './components/cartshop/cartshop.component';
import { ColorActionComponent } from './components/color/color/color-action/color-action.component';
import { LoginComponent } from './components/login/login.component';
import { PaymentComponent } from './components/payment/payment.component';
import { RegisterComponent } from './components/register/register.component';
import { RentalComponent } from './components/rental/rental.component';
import { ProfileComponent } from './components/profile/profile.component';
import { LoginGuard } from './guards/login.guard';
import { AdminGuard } from './guards/admin.guard';

const routes: Routes = [
  { path: "cars/add", component: CarActionComponent, canActivate:[AdminGuard]},
  { path: "cars/:carId", component: CarActionComponent },
  { path: "", pathMatch: "full", component: CarComponent,canActivate:[LoginGuard] },
  { path: "cars", component: CarComponent ,canActivate:[LoginGuard] },
  { path: "brands/add", component: BrandActionComponent, canActivate:[AdminGuard]},
  { path: "brands/:brandId", component: BrandActionComponent },
  { path: "cars/brands/:brandId", component: CarComponent },
  { path: "colors/add", component: ColorActionComponent, canActivate:[AdminGuard]},
  { path: "colors/:colorId", component: ColorActionComponent },
  { path: "cars/colors/:colorId", component: CarComponent },
  { path: "filter/:brandId/:colorId", component: CarComponent },
  { path: "details/:carId", component: RentalComponent ,canActivate:[LoginGuard]},//rentals
  { path: "payment", component: PaymentComponent, canActivate:[LoginGuard]},
  { path: "login", component: LoginComponent},
  { path: "register", component: RegisterComponent},
  { path: "cartshop", component: CartshopComponent,canActivate:[LoginGuard]},
  { path: "profile", component: ProfileComponent,canActivate:[LoginGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
