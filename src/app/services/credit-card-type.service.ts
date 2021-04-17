import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CreditCardType } from '../models/creditCardType';
import { ListResponseModel } from '../models/listResponseModel';
import { ResponseModel } from '../models/responseModel';
import { SingleResponseModel } from '../models/singleResponseModel';

@Injectable({
  providedIn: 'root',
})
export class CreditCardTypeService {
  constructor(private httpClient: HttpClient) {}


  getAllCardTypes(): Observable<ListResponseModel<CreditCardType>> {
    let newPath = environment.apiUrl + 'creditcardtypes/getall';
    return this.httpClient.get<ListResponseModel<CreditCardType>>(newPath);
  }

  getCardTypeByTypeId(typeId:number):Observable<SingleResponseModel<CreditCardType>>{
    let newPath=environment.apiUrl+"creditcardtypes/getcardtypebyid?typeid="+typeId;
    return this.httpClient.get<SingleResponseModel<CreditCardType>>(newPath);
  }

  addCardType(creditCardType:CreditCardType):Observable<ResponseModel>{
    let newPath=environment.apiUrl+"creditcardtypes/add";
    return this.httpClient.post<ResponseModel>(newPath,creditCardType);
  }

  updateCardType(creditCardType:CreditCardType):Observable<ResponseModel>{
    let newPath = environment.apiUrl+"creditcardtypes/update";
    return this.httpClient.post<ResponseModel>(newPath,creditCardType);
  }

  deleteCardType(creditCardType:CreditCardType):Observable<ResponseModel>{
    let newPath = environment.apiUrl+"creditcardtypes/delete"
    return this.httpClient.post<ResponseModel>(newPath,creditCardType);
  }
}
