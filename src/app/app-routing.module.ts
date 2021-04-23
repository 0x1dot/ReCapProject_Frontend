import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BrandActionComponent } from './components/brand/brand/brand-action/brand-action.component';
import { CarActionComponent } from './components/car/car-action/car-action.component';
import { CarDetailsComponent } from './components/car/car-details/car-details.component';
import { CarComponent } from './components/car/car.component';
import { ColorActionComponent } from './components/color/color/color-action/color-action.component';
import { PaymentComponent } from './components/payment/payment.component';
import { RentalComponent } from './components/rental/rental.component';

const routes: Routes = [
  { path: "cars/add", component: CarActionComponent },
  { path: "cars/:carId", component: CarActionComponent },
  { path: "", pathMatch: "full", component: CarComponent },
  { path: "cars", component: CarComponent },
  { path: "brands/add", component: BrandActionComponent },
  { path: "brands/:brandId", component: BrandActionComponent },
  { path: "cars/brands/:brandId", component: CarComponent },
  { path: "colors/add", component: ColorActionComponent },
  { path: "colors/:colorId", component: ColorActionComponent },
  { path: "cars/colors/:colorId", component: CarComponent },
  { path: "filter/:brandId/:colorId", component: CarComponent },
  { path: "details/:carId", component: CarDetailsComponent },
  { path: "rental/:carId", component: RentalComponent },
  { path: "payment", component: PaymentComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
