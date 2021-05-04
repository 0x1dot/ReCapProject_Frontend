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
import { CartItem } from 'src/app/models/cartItem';
import { CartService } from 'src/app/services/cart.service';
import { CustomerService } from 'src/app/services/customer.service';
import { StorageService } from 'src/app/services/storage.service';
import { Customer } from 'src/app/models/customer';
import { CartItems } from 'src/app/models/cartItems';
import { FindeksService } from 'src/app/services/findeks.service';
import { FindeksModel } from 'src/app/models/findeksModel';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css'],
})
export class PaymentComponent implements OnInit {
  customer: Customer;
  targetCards: CreditCard;
  targetMethod: string = "home";
  cardTypeId: number;
  car: Car;
  data: number[];
  payment: Payment;
  paymentForm: FormGroup;
  cartTotal: number;
  cards: CreditCard[] = [];
  creditCardTypes: CreditCardType[];
  dataloaded: boolean = false;
  cartItems: CartItem[];
  totals: Number[] = [];
  constructor(
    private toastrService: ToastrService,
    private rentalService: RentalService,
    private paymentService: PaymentService,
    private creditCardService: CreditCardService,
    private creditCardTypeService: CreditCardTypeService,
    private formBuilder: FormBuilder,
    private cartService: CartService,
    private customerService: CustomerService,
    private storage: StorageService,
    private findeksService:FindeksService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getRentalToLocalStorage();
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
    this.cartItems = this.cartService.list();
    if (this.cartItems.length == 0) {
      this.router.navigate(['/']);
    }
    this.totalCalcs(this.cartItems);
    this.getCustomer();
    this.getCardTypes();
    this.createPaymentForm();
  }
  totalCalc(cartItem: CartItem) {
    return this.paymentService.totalPrice(
      cartItem.rental.rentDate,
      cartItem.rental.returnDate,
      cartItem.rental.dailyPrice
    ); // çıktı : gün -- kdv dahil toplam fiyat -- kdv fiyatı
  }
  totalCalcs(cartItems: CartItem[]) {
    let subtotal: number = 0;
    let tax: number = 0;
    let total: number = 0;
    for (let i = 0; i < cartItems.length; i++) {
      subtotal += this.totalCalc(cartItems[i])[1] - this.totalCalc(cartItems[i])[2];
      tax += this.totalCalc(cartItems[i])[2];
      total += this.totalCalc(cartItems[i])[1];
    }
    this.totals.push(subtotal, tax, total);
  }
  getCardTypes() {
    this.creditCardTypeService.getAllCardTypes().subscribe((response) => {
      this.creditCardTypes = response.data;
    });
  }
  getCustomer() {
    let userId = Number.parseInt(this.storage.getItem("userId"));
    this.customerService.getCustomerById(userId).subscribe((response) => {
      this.customer = response.data;
      this.getCardList();
    });
  }
  getCardList() {
    this.creditCardService.getCardsByCustomerId(this.customer.customerId).subscribe(response => {
      this.cards = response.data;
    });
  }
  pay() {
    if (this.selectedPaymentMethod() == "home") {
      if (this.paymentForm.valid) {
        let creditcardModel: CreditCard = Object.assign({}, this.paymentForm.value);
        creditcardModel.customerId = this.customer.customerId;

        let paymentModel: Payment = Object.assign({});
        paymentModel.customerId = this.customer.customerId;
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
        } else {
          this.process(paymentModel);
        }
      }
      else {
        this.toastrService.error('Form alanlarını düzgün doldurduğunuzdan emin olun!', 'Dikkat');
      }
    }
    else if (this.selectedPaymentMethod() == "card") {
      let paymentModel: Payment = Object.assign({});
      paymentModel.customerId = this.customer.customerId;
      paymentModel.cardTypeId = this.targetCards.cardTypeId;
      this.process(paymentModel);
    }
  }
  selectCards(cards: CreditCard) {
    this.targetCards = cards;
  }

  selectedPaymentMethod(method: string = "") {
    if (method == "") { return this.targetMethod; }
    else { this.targetMethod = method; return ""; }
  }
  process(paymentModel: Payment) {
    this.cartItems.forEach(element => {
      paymentModel.carId = element.rental.carId;
      paymentModel.totalPrice = this.totalCalc(element)[1];
      if (this.selectedPaymentMethod() == "card") {
        paymentModel.cardTypeId = this.targetCards.cardTypeId;
        paymentModel.cardId = this.targetCards.id;
      }
      this.paymentService.payment(paymentModel).subscribe((response) => {
        if (response.success) {
          this.rentalService.addRental(element.rental).subscribe((response) => {
            this.toastrService.success('Ödeme işleminiz gerçekleştirilmiştir.', 'Başarılı');
            if (element === CartItems[CartItems.length - 1]) {
                this.findeksService.getUserFindeksPointByCustomerId(Number.parseInt(this.storage.getItem("userId"))).subscribe(response=>{
                  let findeks:FindeksModel = response.data;
                  if(findeks.findeksPoint!=1900){
                    findeks.findeksPoint=findeks.findeksPoint+300;
                    console.log(findeks.findeksPoint)
                    if(findeks.findeksPoint>1900){
                      findeks.findeksPoint =1900;
                    }
                    this.findeksService.updateUserFindeksPoint(findeks).subscribe(response=>{
                        if(response.success){
                          this.toastrService.success(response.message);
                        }
                    });
                  }
                });
              this.toastrService.info("Anasayfaya yönlendiriliyorsunuz...")
              localStorage.removeItem("cartItems");
              setTimeout(() => { this.router.navigate(['/']); window.location.reload() }, 2000);
            }
          }, (responseError) => {
            if (responseError.error.Errors.length > 0) {
              for (let i = 0; i < responseError.error.Errors.length; i++) {
                this.toastrService.error(responseError.error.Errors[i].ErrorMessage, 'Doğrulama hatası');
              }
            }
          }
          );
        } else {
          this.toastrService.error('Ödeme işleminiz gerçekleştirilemedi.', 'Başarısız');
        }
      }, (responseError) => {
        if (responseError.error.Errors.length > 0) {
          for (let i = 0; i < responseError.error.Errors.length; i++) {
            this.toastrService.error(responseError.error.Errors[i].ErrorMessage, 'Doğrulama hatası');
          }
        }
      });
    });
  }
}
