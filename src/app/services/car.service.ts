import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { Car } from '../models/car';
import { CarImages } from '../models/carimages';
import { ListResponseModel } from '../models/listResponseModel';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root'
})
export class CarService {
  apiUrl = 'https://localhost:44373/api/';
  constructor(private httpClient: HttpClient,private sanitizer: DomSanitizer) {}

  getCarsByColor(colorId:string):Observable<ListResponseModel<Car>> {
    let newPath = this.apiUrl+"cars/getdtobycolorid?colorId="+colorId
    return this.httpClient.get<ListResponseModel<Car>>(newPath)
   }

  getCarsByBrand(brandId:string):Observable<ListResponseModel<Car>> {
    let newPath = this.apiUrl+"cars/getdtobybrandid?brandId="+brandId
    return this.httpClient.get<ListResponseModel<Car>>(newPath)
   }

  getCars(): Observable<ListResponseModel<Car>> {
    let newPath = this.apiUrl + "cars/getcardetails"
    return this.httpClient.get<ListResponseModel<Car>>(newPath);
  }
  getCarsById(carId:string):Observable<ListResponseModel<Car>> {
    let newPath = this.apiUrl + "cars/getdtobyid?carId="+carId
    return this.httpClient.get<ListResponseModel<Car>>(newPath);
  }
  getCarImagesById(carId:string):Observable<ListResponseModel<CarImages>>{
    let newPath = this.apiUrl + "carimages/getcarimages?carId="+carId;
    return this.httpClient.get<ListResponseModel<CarImages>>(newPath);
  }
}
