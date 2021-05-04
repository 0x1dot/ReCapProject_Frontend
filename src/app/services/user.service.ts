import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ListResponseModel } from '../models/listResponseModel';
import { ResponseModel } from '../models/responseModel';
import { SingleResponseModel } from '../models/singleResponseModel';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private httpClient: HttpClient) { }
  getUsers(){
    return this.httpClient.get<ListResponseModel<User>>(environment.apiUrl+"users/getall");
  }
  getUserById(userId:number): Observable<SingleResponseModel<User>> {
    return this.httpClient.get<SingleResponseModel<User>>(environment.apiUrl+"users/getbyid?userid="+userId);
  }
  userUpdate(user:User):Observable<ResponseModel>{
    return this.httpClient.post<ResponseModel>(environment.apiUrl+"users/update",user);
  }
}
