import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { FindeksModel } from '../models/findeksModel';
import { ResponseModel } from '../models/responseModel';
import { SingleResponseModel } from '../models/singleResponseModel';

@Injectable({
  providedIn: 'root'
})
export class FindeksService {

  constructor(private http:HttpClient) { }

  newUserFindeksPoint(findeks:FindeksModel):Observable<ResponseModel>{
    return this.http.post<ResponseModel>(environment.apiUrl+"userfindeks/new",findeks)
  }

  updateUserFindeksPoint(findeks:FindeksModel):Observable<ResponseModel>{
    return this.http.post<ResponseModel>(environment.apiUrl+"userfindeks/update",findeks);
  }

  getUserFindeksPointByCustomerId(customerId:number):Observable<SingleResponseModel<FindeksModel>>{
    let newPath = environment.apiUrl +"userfindeks/get?customerid="+customerId
    return this.http.get<SingleResponseModel<FindeksModel>>(newPath);

  }
}
