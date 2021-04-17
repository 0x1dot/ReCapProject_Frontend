import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from 'src/environments/environment';
import { CreditCard } from '../models/creditCard';
import { ListResponseModel } from '../models/listResponseModel';
import { Payment } from '../models/payment';
import { ResponseModel } from '../models/responseModel';

@Injectable({
  providedIn: 'root',
})
export class PaymentService {  
  constructor(private httpClient: HttpClient) {}

  payment(payment: Payment): Observable<ResponseModel> {
    let paymentPath = environment.apiUrl + 'payments/add';
    return this.httpClient.post<ResponseModel>(paymentPath, payment);
  }

  getCardListByCustomerId(
    customerId: number
  ): Observable<ListResponseModel<CreditCard>> {
    let newPath =
      environment.apiUrl + 'payments/listcards?customerId=' + customerId;
    return this.httpClient.get<ListResponseModel<CreditCard>>(newPath);
  }
  totalPrice(rentDate: Date, returnDate: Date,dailyPrice:number) {
    let data:number[] = [];
    var date1 = new Date(rentDate);
    var date2 = new Date(returnDate);
    var timeDiff = Math.abs(date2.getTime() - date1.getTime());
    var totaldays = Math.ceil(timeDiff / (1000 * 3600 * 24));
    data[0] = totaldays;//kiralanan toplam gün
    var money = dailyPrice*totaldays;
    data[1] = money;//kiralanan gün fiyatı
    var VAT = ((money * 18) / 100);
    data[2] = VAT;//kdv
    data[3] = money+VAT;//kiralanan gün adedi fiyatı+kdv
    return data;
  }
}
