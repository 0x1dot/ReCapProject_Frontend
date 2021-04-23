import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Car } from 'src/app/models/car';
import { Customer } from 'src/app/models/customer';
import { Rental } from 'src/app/models/rental';
import { CustomerService } from 'src/app/services/customer.service';
import { PaymentService } from 'src/app/services/payment.service';
import { RentalService } from 'src/app/services/rental.service';

@Component({
  selector: 'app-controlrental',
  templateUrl: './controlrental.component.html',
  styleUrls: ['./controlrental.component.css'],
})
export class ControlrentalComponent implements OnInit {
  customers: Customer[];
  customerId: number;
  rentDate: Date;
  returnDate: Date;
  data: number[] = [];
  @Input() car: Car;
  rental: Rental;
  rentalAddForm: FormGroup;
  isrentaled = false;
  constructor(
    private formBuilder: FormBuilder,
    private customerService: CustomerService,
    private paymentService: PaymentService,
    private rentalService: RentalService,
    private toastrService: ToastrService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.createRentalAddForm();
    this.getCustomer();
  }
  createRentalAddForm() {
    this.rentalAddForm = this.formBuilder.group({
      customerId: ['', Validators.required],
      rentDate: ['', Validators.required],
      returnDate: ['', Validators.required]
    });
  }
  getCustomer() {
    this.customerService.getCustomers().subscribe((response) => {
      this.customers = response.data;
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
      rentalModel.carId = this.car.Id;
      this.rental = rentalModel;
      this.rentalService.checkRentalDates(this.rental).subscribe(response => {
        this.toastrService.success(response.message, "Başarılı");
        this.isrentaled = true;
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
  payment() {
    localStorage.setItem('rental', JSON.stringify(this.rental));
    this.router.navigate(['/payment/']);
  }



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
