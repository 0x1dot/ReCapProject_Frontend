import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CartItem } from 'src/app/models/cartItem';
import { Rental } from 'src/app/models/rental';
import { CartService } from 'src/app/services/cart.service';
import { PaymentService } from 'src/app/services/payment.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-cartshop',
  templateUrl: './cartshop.component.html',
  styleUrls: ['./cartshop.component.css'],
})
export class CartshopComponent implements OnInit {
  cartshops: FormGroup;
  cartItems: CartItem[];
  totals: Number[]=[];
  apiUrl = environment.api+'images/';
  constructor(
    private cartService: CartService,
    private formBuilder: FormBuilder,
    private paymentService: PaymentService
  ) { }
 

  ngOnInit(): void {
    this.createPaymentForm();
    this.cartItems = this.cartService.list();
    this.totalCalcs(this.cartItems);
  }
  createPaymentForm() {
    this.cartshops = this.formBuilder.group({
      quantity: ['', Validators.required],
    });
  }
  remove(rental: Rental) {
    this.cartService.removeFromCart(rental);
  }
  totalCalc(cartItem: CartItem) {
    return this.paymentService.totalPrice(
      cartItem.rental.rentDate,
      cartItem.rental.returnDate,
      cartItem.rental.dailyPrice
    ); // çıktı : gün -- kdv dahil toplam fiyat -- kdv fiyatı
  }
  totalCalcs(cartItems: CartItem[]) {
    let subtotal:number = 0;
    let tax:number=0;
    let total:number=0;
    for (let i = 0; i < cartItems.length; i++) {
      subtotal += this.totalCalc(cartItems[i])[1]-this.totalCalc(cartItems[i])[2];
      tax += this.totalCalc(cartItems[i])[2];
      total += this.totalCalc(cartItems[i])[1];
    }
    this.totals.push(subtotal,tax,total);
  }
}
