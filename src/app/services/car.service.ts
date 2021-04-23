import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { Car } from '../models/car';
import { CarImages } from '../models/carimages';
import { ListResponseModel } from '../models/listResponseModel';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { SingleResponseModel } from '../models/singleResponseModel';
import { environment } from 'src/environments/environment';
import { ResponseModel } from '../models/responseModel';

@Injectable({
  providedIn: 'root'
})
export class CarService {
  constructor(private httpClient: HttpClient) {}
  addCars(car:Car): Observable<ResponseModel>{
    let newPath = environment.apiUrl + "cars/add";
    return this.httpClient.post<ResponseModel>(newPath,car);
  }
  deleteCars(car:Car):Observable<ResponseModel>{
    let newPath = environment.apiUrl + "cars/delete";
    return this.httpClient.post<ResponseModel>(newPath,car);
  }
  updateCars(car:Car):Observable<ResponseModel>{
    let newPath = environment.apiUrl + "cars/update";
    return this.httpClient.post<ResponseModel>(newPath,car);
  }
  getCarsByColor(colorId:number):Observable<ListResponseModel<Car>> {
    let newPath = environment.apiUrl+"cars/getdtobycolorid?colorId="+colorId
    return this.httpClient.get<ListResponseModel<Car>>(newPath)
   }

  getCarsByBrand(brandId:number):Observable<ListResponseModel<Car>> {
    let newPath = environment.apiUrl+"cars/getdtobybrandid?brandId="+brandId
    return this.httpClient.get<ListResponseModel<Car>>(newPath)
   }
   GetCarsBrandAndColor(brandId: number, colorId:number){
    let newPath = environment.apiUrl+"cars/getdtobrandandcolorid?brandId="+brandId+"&colorId="+colorId
    return this.httpClient.get<ListResponseModel<Car>>(newPath)
   }
  getCars(): Observable<ListResponseModel<Car>> {
    let newPath = environment.apiUrl + "cars/getcarsdetails"
    return this.httpClient.get<ListResponseModel<Car>>(newPath);
  }
  getCarsDtoById(carId:number):Observable<SingleResponseModel<Car>> {
    let newPath = environment.apiUrl + "cars/getdtobyid?carId="+carId
    return this.httpClient.get<SingleResponseModel<Car>>(newPath);
  }
  getCarImagesById(carId:number):Observable<ListResponseModel<CarImages>>{
    let newPath = environment.apiUrl + "carimages/getcarimages?carId="+carId;
    return this.httpClient.get<ListResponseModel<CarImages>>(newPath);
  }
}
