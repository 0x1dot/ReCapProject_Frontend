import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { Car } from '../models/car';
import { CarImages } from '../models/carimages';
import { ListResponseModel } from '../models/listResponseModel';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { SingleResponseModel } from '../models/singleResponseModel';

@Injectable({
  providedIn: 'root'
})
export class CarService {
  apiUrl = 'https://localhost:44373/api/';
  constructor(private httpClient: HttpClient,private sanitizer: DomSanitizer) {}

  getCarsByColor(colorId:number):Observable<ListResponseModel<Car>> {
    let newPath = this.apiUrl+"cars/getdtobycolorid?colorId="+colorId
    return this.httpClient.get<ListResponseModel<Car>>(newPath)
   }

  getCarsByBrand(brandId:number):Observable<ListResponseModel<Car>> {
    let newPath = this.apiUrl+"cars/getdtobybrandid?brandId="+brandId
    return this.httpClient.get<ListResponseModel<Car>>(newPath)
   }
   GetCarsBrandAndColor(brandId: number, colorId:number){
    let newPath = this.apiUrl+"cars/getdtobrandandcolorid?brandId="+brandId+"&colorId="+colorId
    return this.httpClient.get<ListResponseModel<Car>>(newPath)
   }
  getCars(): Observable<ListResponseModel<Car>> {
    let newPath = this.apiUrl + "cars/getcarsdetails"
    return this.httpClient.get<ListResponseModel<Car>>(newPath);
  }
  getCarsDtoById(carId:number):Observable<SingleResponseModel<Car>> {
    let newPath = this.apiUrl + "cars/getdtobyid?carId="+carId
    return this.httpClient.get<SingleResponseModel<Car>>(newPath);
  }
  getCarImagesById(carId:number):Observable<ListResponseModel<CarImages>>{
    let newPath = this.apiUrl + "carimages/getcarimages?carId="+carId;
    return this.httpClient.get<ListResponseModel<CarImages>>(newPath);
  }
}
