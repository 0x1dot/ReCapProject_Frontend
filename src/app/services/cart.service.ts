import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { CartItem } from '../models/cartItem';
import { CartItems } from '../models/cartItems';
import { Rental } from '../models/rental';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  constructor(private toastr:ToastrService,private storage:StorageService) {}
  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    
  }
  addToCart(rental: Rental) {
    let item = CartItems.find((c) => c.rental.carId === rental.carId);
    if (item) {
     // item.quantity += 1;
     this.toastr.error("Ürün sepette mevcut","Zaten Mevcut");
     return;
    } else {
      let cartItem = new CartItem();
      cartItem.rental = rental;
      cartItem.quantity = 1;
      CartItems.push(cartItem);
    }
    this.storage.setItem("cartItems",JSON.stringify(CartItems));
    this.toastr.info("Sepete başarıyla eklendi. Yönlendiriliyorsunuz.");
  }
  removeFromCart(rental:Rental){
    let item = CartItems.find((c) => c.rental.carId === rental.carId);
    CartItems.splice(CartItems.indexOf(item),1);
    this.storage.setItem("cartItems",JSON.stringify(CartItems));
  }
  list(): CartItem[] {
    if(CartItems.length == 0){
      var carts = JSON.parse(this.storage.getItem("cartItems"));
      if(carts == null) return CartItems;
      for (let i = 0; i < carts.length; i++) {
        CartItems.push(carts[i]);
      }
    }
    return CartItems;
  }
}
