import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { CarService } from 'src/app/services/car.service';
import { PaymentService } from 'src/app/services/payment.service';
import { CreditCard } from 'src/app/models/creditCard';
import { RentalService } from 'src/app/services/rental.service';
import { Rental } from 'src/app/models/rental';
import { Car } from 'src/app/models/car';
import { CreditCardType } from 'src/app/models/creditCardType';
import { CreditCardService } from 'src/app/services/credit-card.service';
import { CreditCardTypeService } from 'src/app/services/credit-card-type.service';
import { Payment } from 'src/app/models/payment';
import { Router } from '@angular/router';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css'],
})
export class PaymentComponent implements OnInit {
  car: Car;
  rental: Rental;
  data: number[];
  payment: Payment;
  paymentForm: FormGroup;
  cartTotal: number;
  cards: CreditCard[] = [];
  creditCardTypes: CreditCardType[];
  dataloaded: boolean = false;
  constructor(
    private toastrService: ToastrService,
    private carService: CarService,
    private rentalService: RentalService,
    private paymentService: PaymentService,
    private creditCardService: CreditCardService,
    private creditCardTypeService: CreditCardTypeService,
    private formBuilder: FormBuilder,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getRentalToLocalStorage();
    this.createPaymentForm();
  }
  createPaymentForm() {
    this.paymentForm = this.formBuilder.group({
      cardTypeId: ['', Validators.required],
      cardNumber: [
        '',
        [
          Validators.required,
          Validators.min(1000000000000000),
          Validators.max(9999999999999999),
        ],
      ],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      expirationMonth: [
        '',
        [Validators.required, Validators.min(1), Validators.max(12)],
      ],
      expirationYear: [
        '',
        [Validators.required, Validators.min(2021), Validators.max(2050)],
      ],
      cvv: [
        '',
        [Validators.required, Validators.min(100), Validators.max(999)],
      ],
      saveCard: [''],
    });
  }

  getRentalToLocalStorage() {
    if(localStorage.getItem('rental') == null){
      this.router.navigate(['/']);
    }
    this.rental = JSON.parse(localStorage.getItem('rental'));
    this.carService.getCarsDtoById(this.rental.carId).subscribe((response) => {
      this.car = response.data;
      this.data = this.paymentService.totalPrice(
        this.rental.rentDate,
        this.rental.returnDate,
        this.car.dailyPrice
      );
      this.getCardTypes();
      this.dataloaded = true;
    });
  }
  getCardTypes() {
    this.creditCardTypeService.getAllCardTypes().subscribe((response) => {
      this.creditCardTypes = response.data;
    });
  }
  getCardList() {
    this.paymentService.getCardListByCustomerId(1).subscribe((response) => {
      this.cards = response.data;
    });
  }
  pay() {
    if (this.paymentForm.valid) {
      let creditcardModel: CreditCard = Object.assign({}, this.paymentForm.value);
      creditcardModel.customerId = this.rental.customerId;

      let paymentModel: Payment=Object.assign({});
      paymentModel.customerId = this.rental.customerId;
      
      paymentModel.carId = this.rental.carId;
      paymentModel.totalPrice = this.data[3];
      paymentModel.cardTypeId = creditcardModel.cardTypeId;
      if (this.paymentForm.value.saveCard) {
        this.creditCardService.addCreditCard(creditcardModel).subscribe(
          (response) => {//kredi kartı ekle
          this.creditCardService.getCardByCustomerId(creditcardModel.customerId).subscribe((response) => {//eklenen kartın id al
            paymentModel.cardId = response.data.id; //kredi kartı id al
            this.process(paymentModel);
          },
          (responseError) => {
            if (responseError.error.Errors.length > 0) {
              for (let i = 0; i < responseError.error.Errors.length; i++) {
                this.toastrService.error(
                  responseError.error.Errors[i].ErrorMessage,
                  'Doğrulama hatası'
                );
              }
            }
          }
          );
        },
        (responseError) => {
          if (responseError.error.Errors.length > 0) {
            for (let i = 0; i < responseError.error.Errors.length; i++) {
              this.toastrService.error(
                responseError.error.Errors[i].ErrorMessage,
                'Doğrulama hatası'
              );
            }
          }
        });
      }else{
        this.process(paymentModel); 
      }
    } 
    else 
    {
      this.toastrService.error('Form alanlarını düzgün doldurduğunuzdan emin olun!', 'Dikkat');
    }
  }
  process(paymentModel:Payment){
    this.paymentService.payment(paymentModel).subscribe((response) => {
      if(response.success){
        this.rentalService.addRental(this.rental).subscribe(
          (response) => {
            this.toastrService.success('Ödeme işleminiz gerçekleştirilmiştir. Anasayfaya yönlendiriliyorsunuz.','Başarılı');
            localStorage.clear();
            this.router.navigate(['/']);
          },
          (responseError) => {
            if (responseError.error.Errors.length > 0) {
              for (let i = 0; i < responseError.error.Errors.length; i++) {
                this.toastrService.error(
                  responseError.error.Errors[i].ErrorMessage,
                  'Doğrulama hatası'
                );
              }
            }
          }
        );
      }
      else{
        this.toastrService.error('Ödeme işleminiz gerçekleştirilemedi.','Başarısız');
      }
    },
    (responseError) => {
      if (responseError.error.Errors.length > 0) {
        for (let i = 0; i < responseError.error.Errors.length; i++) {
          this.toastrService.error(
            responseError.error.Errors[i].ErrorMessage,
            'Doğrulama hatası'
          );
        }
      }
    });
  }
}
