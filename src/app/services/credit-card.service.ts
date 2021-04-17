import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CreditCard } from '../models/creditCard';
import { ListResponseModel } from '../models/listResponseModel';
import { ResponseModel } from '../models/responseModel';
import { SingleResponseModel } from '../models/singleResponseModel';

@Injectable({
  providedIn: 'root'
})
export class CreditCardService {

  constructor(private httpClient:HttpClient) { }

  getCardsByCustomerId(customerId:number):Observable<ListResponseModel<CreditCard>>{
    let newPath=environment.apiUrl+"creditcards/GetCardsByCustomerId?customerId="+customerId
    return this.httpClient.get<ListResponseModel<CreditCard>>(newPath)
  }

  getCardByCustomerId(customerId:number):Observable<SingleResponseModel<CreditCard>>{
    let newPath= environment.apiUrl+"creditcards/getcardbycustomerid?customerId="+customerId
    return this.httpClient.get<SingleResponseModel<CreditCard>>(newPath);
  }
  addCreditCard(creditCard:CreditCard):Observable<CreditCard>{
    let newPath= environment.apiUrl+"creditcards/add";
    return this.httpClient.post<CreditCard>(newPath,creditCard);
  }

  deleteCreditCard(creditCard:CreditCard):Observable<CreditCard>{
    let newPath = environment.apiUrl+"creditcards/delete";
    return this.httpClient.post<CreditCard>(newPath,creditCard);
  }
}
