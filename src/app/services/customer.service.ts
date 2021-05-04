import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from 'src/environments/environment';
import { Customer } from '../models/customer';
import { ListResponseModel } from '../models/listResponseModel';
import { ResponseModel } from '../models/responseModel';
import { SingleResponseModel } from '../models/singleResponseModel';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  constructor(private httpClient: HttpClient) {}
  getCustomers(): Observable<ListResponseModel<Customer>> {
    return this.httpClient.get<ListResponseModel<Customer>>(environment.apiUrl+"customers/getcustomersdetail");
  }
  getCustomerById(userId:number){
    return this.httpClient.get<SingleResponseModel<Customer>>(environment.apiUrl+"customers/getbyid?userid="+userId);
  }
  customerAdd(customer:Customer):Observable<ResponseModel>{
    return  this.httpClient.post<ResponseModel>(environment.apiUrl+"customers/add",customer)
  }

  customerDelete(customer:Customer):Observable<ResponseModel>{
    return this.httpClient.post<ResponseModel>(environment.apiUrl+"customers/delete",customer)
  }

  customerUpdate(customer:Customer):Observable<ResponseModel>{
    return this.httpClient.post<ResponseModel>(environment.apiUrl+"customers/update",customer)
  }
}
