import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Car } from 'src/app/models/car';
import { Customer } from 'src/app/models/customer';
import { FindeksModel } from 'src/app/models/findeksModel';
import { Rental } from 'src/app/models/rental';
import { CartService } from 'src/app/services/cart.service';
import { CustomerService } from 'src/app/services/customer.service';
import { FindeksService } from 'src/app/services/findeks.service';
import { PaymentService } from 'src/app/services/payment.service';
import { RentalService } from 'src/app/services/rental.service';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-rentadd',
  templateUrl: './rentadd.component.html',
  styleUrls: ['./rentadd.component.css']
})

export class RentaddComponent implements OnInit {
  customer: Customer;
  customerId: number;
  rentDate: Date;
  returnDate: Date;
  data: number[] = [];
  @Input() car: Car;
  rental: Rental;
  rentalAddForm: FormGroup;
  isrentaled = false;
  findeks: FindeksModel;
  constructor(
    private formBuilder: FormBuilder,
    private findeksService: FindeksService,
    private paymentService: PaymentService,
    private rentalService: RentalService,
    private toastrService: ToastrService,
    private storage: StorageService,
    private customerService:CustomerService,
    public cart: CartService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.createRentalAddForm();
    this.getCustomer();
  }
  createRentalAddForm() {
    this.rentalAddForm = this.formBuilder.group({
      rentDate: ['', Validators.required],
      returnDate: ['', Validators.required]
    });
  }
  getCustomer() {
    let userId = Number.parseInt(this.storage.getItem("userId"));
     this.customerService.getCustomerById(userId).subscribe((response) => {
       this.customer = response.data;
       this.getCustomerFindeksCount();
     });
  }
  getRentDate() {
    var today = new Date();
    today.setDate(today.getDate() + 1);
    return today.toISOString().slice(0, 10);
  }
  getReturnDate() {
    var today = new Date();
    today.setDate(today.getDate() + 2);
    return today.toISOString().slice(0, 10);
  }
  compareDate() {
    this.isrentaled = false;
  }
  rentalCheck() {
    if (this.rentalAddForm.valid) {
      let rentalModel: Rental = Object.assign({}, this.rentalAddForm.value);
      rentalModel.carId = this.car.carId;
      rentalModel.customerId = this.customer.customerId;
      rentalModel.carName = this.car.carName;
      rentalModel.dailyPrice = this.car.dailyPrice;
      rentalModel.brandName = this.car.brandName;
      rentalModel.imagePath = this.car.imagePath;
      rentalModel.gearName = this.car.gearName;
      rentalModel.fuelName = this.car.fuelName;
      this.rental = rentalModel;
      this.rentalService.checkRentalDates(this.rental).subscribe(response => {
        if (this.findeks.findeksPoint < this.car.carFindeksPoint) {
          this.toastrService.error("Findeks puanınız yetersiz.", "Mevcut findeks puanınız : " + this.findeks.findeksPoint);
        } else {
          this.isrentaled = true;
          this.toastrService.success(response.message, "Başarılı");
        }
        this.data = this.paymentService.totalPrice(
          this.rentalAddForm.value.rentDate,
          this.rentalAddForm.value.returnDate,
          this.car.dailyPrice
        );// çıktı : gün -- kdv dahil toplam fiyat -- kdv fiyatı
      }, responseError => {
        this.toastrService.error(responseError.error.message, "Hata");
        this.isrentaled = false;
      }
      );
    } else {
      this.toastrService.error("Lütfen alanları doğru doldurduğunuzdan emin olun.", "Hata");
      this.isrentaled = false;
    }
  }
  getCustomerFindeksCount() {
    this.findeksService.getUserFindeksPointByCustomerId(this.customer.customerId).subscribe(response => {
      this.findeks = response.data;
      if (this.findeks == null) {
        let findeksModel: FindeksModel = Object.assign({});
        findeksModel.customerid = this.customer.customerId;
        findeksModel.findeksPoint = 100;
        this.findeksService.newUserFindeksPoint(findeksModel).subscribe(response => {
          if (response.success) {
            this.toastrService.success("Findeks puanı başarıyla eklendi.");
            this.toastrService.info("Mevcut Findeks Puanınız: " + findeksModel.findeksPoint);
          }
        });
      }
    });
  }
  addToCart(){
    this.cart.addToCart(this.rental);
    setTimeout(() => {
      this.router.navigate(['/cartshop/']);
    }, 2000); 
  }
  // payment() {
  //   localStorage.setItem('rental', JSON.stringify(this.rental));
  //   this.router.navigate(['/payment/']);
  // }
  // getRentals() {
  //   this.rentalService.getRentals().subscribe((response) => {
  //     this.rentals = response.data;
  //   });
  // }
  // createRental(){
  //    let MyRental:RentalDto = {
  //     rentDate: this.rentDate,
  //     returnDate: this.returnDate,
  //     carId: this.Car.carId,
  //     modelYear: this.Car.modelYear,
  //     brandName: this.Car.brandName,
  //     fuelName:this.Car.fuelName,
  //     gearName:this.Car.gearName,
  //     dailyPrice:this.Car.dailyPrice,
  //     carname:this.Car.carName,
  //     customerId: this.customerId
  //     }
  //     localStorage.setItem('rental',JSON.stringify(MyRental));
  //    this.router.navigate(['/payment/']);//JSON.stringify(MyRental)
  // }

}
