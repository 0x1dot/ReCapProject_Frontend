import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Brand } from '../models/brand';
import { ListResponseModel } from '../models/listResponseModel';
import { ResponseModel } from '../models/responseModel';
import { SingleResponseModel } from '../models/singleResponseModel';

@Injectable({
  providedIn: 'root',
})
export class BrandService {
  constructor(private httpClient: HttpClient) {}
  addBrands(brand:Brand): Observable<ResponseModel>{
    let newPath = environment.apiUrl + "brands/add";
    return this.httpClient.post<ResponseModel>(newPath,brand);
  }
  deleteBrands(brand:Brand):Observable<ResponseModel>{
    let newPath = environment.apiUrl + "brands/delete";
    return this.httpClient.post<ResponseModel>(newPath,brand);
  }
  updateBrands(brand:Brand):Observable<ResponseModel>{
    let newPath = environment.apiUrl + "brands/update";
    return this.httpClient.post<ResponseModel>(newPath,brand);
  }
  getBrands(): Observable<ListResponseModel<Brand>> {
    return this.httpClient.get<ListResponseModel<Brand>>(environment.apiUrl+"brands/getall");
  }
  getBrandById(brandId:number):Observable<SingleResponseModel<Brand>>{
    return this.httpClient.get<SingleResponseModel<Brand>>(environment.apiUrl+"brands/getbyid?brandId="+brandId);
  }
}