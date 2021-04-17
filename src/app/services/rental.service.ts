import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from 'src/environments/environment';
import { Car } from '../models/car';
import { ListResponseModel } from '../models/listResponseModel';
import { Rental } from '../models/rental';
import { ResponseModel } from '../models/responseModel';

@Injectable({
  providedIn: 'root'
})
export class RentalService {
  car:Car;
  constructor(private httpClient: HttpClient) {}
  getRentals(): Observable<ListResponseModel<Rental>> {
    return this.httpClient.get<ListResponseModel<Rental>>(environment.apiUrl+"rentals/getall");
  }
  checkRentalDates(rental:Rental):Observable<ResponseModel>{
    let newPath = environment.apiUrl + 'rentals/checkrentaldates';
    return this.httpClient.post<ResponseModel>(newPath,rental)
  }
  addRental(rental:Rental):Observable<ResponseModel>{
    let newPath = environment.apiUrl + 'rentals/add';
    return this.httpClient.post<ResponseModel>(newPath,rental)
  }
}
