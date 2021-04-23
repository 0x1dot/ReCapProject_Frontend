import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from 'src/environments/environment';
import { Color } from '../models/color';
import { ListResponseModel } from '../models/listResponseModel';
import { ResponseModel } from '../models/responseModel';
import { SingleResponseModel } from '../models/singleResponseModel';

@Injectable({
  providedIn: 'root'
})
export class ColorService {
  constructor(private httpClient: HttpClient) {}
  addColors(color:Color): Observable<ResponseModel>{
    let newPath = environment.apiUrl + "colors/add";
    return this.httpClient.post<ResponseModel>(newPath,color);
  }
  deleteColors(color:Color):Observable<ResponseModel>{
    let newPath = environment.apiUrl + "colors/delete";
    return this.httpClient.post<ResponseModel>(newPath,color);
  }
  updateColors(color:Color):Observable<ResponseModel>{
    let newPath = environment.apiUrl + "colors/update";
    return this.httpClient.post<ResponseModel>(newPath,color);
  }
  getColors(): Observable<ListResponseModel<Color>> {
    return this.httpClient.get<ListResponseModel<Color>>(environment.apiUrl+"colors/getall");
  }
  getColorById(colorId:number):Observable<SingleResponseModel<Color>>{
    return this.httpClient.get<SingleResponseModel<Color>>(environment.apiUrl+"colors/getbyid?colorId="+colorId);
  }
 
}
