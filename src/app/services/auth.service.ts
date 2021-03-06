  import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginModel } from 'src/app/models/loginModel';
import { RegisterModel } from 'src/app/models/registerModel';
import { SingleResponseModel } from 'src/app/models/singleResponseModel';
import { TokenModel } from 'src/app/models/tokenModel';
import {Moment} from 'moment'
import * as moment from 'moment';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { DecodedToken } from 'src/app/models/decodedToken';
import jwtDecode from 'jwt-decode';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  decodedToken:DecodedToken;

  constructor(private httpClient: HttpClient,
    private toastrService:ToastrService,
    private router:Router) { }

  login(loginModel: LoginModel) {
    return this.httpClient.post<SingleResponseModel<TokenModel>>(environment.apiUrl + "auth/login", loginModel);
  }
  isAuthenticated() {
    if (localStorage.getItem("token")) {
      return true;
    }
    else {
      return false;
    }
  }
  logOut(){
    localStorage.removeItem("token")
    localStorage.removeItem("role")
    localStorage.removeItem("name")
    localStorage.removeItem("userId")
    localStorage.removeItem("exp")
  }

  isLogened(){
    let date = moment.unix(Number(localStorage.getItem("exp")));
    let date2 =new Date()
    console.log(date.toDate())
    console.log(date2)
    if(date.toDate() > date2){
      return true;
    }else{
      this.toastrService.warning("İşlem Yapabilmek İçin Giriş Yapmalısınız.")
      this.logOut();
      setTimeout(()=>this.router.navigate(["login"]),250)
      return false;

    }
  }
  getToken(){
    return localStorage.getItem("token")
  }
  register(user:RegisterModel){
    return this.httpClient.post<SingleResponseModel<TokenModel>>(environment.apiUrl+"auth/register",user);
  }

  decodeToken(token:any){
    this.decodedToken = jwtDecode(token)
    localStorage.setItem("role",this.decodedToken['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'])
    localStorage.setItem("name",this.decodedToken['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name'])
    localStorage.setItem("userId",this.decodedToken['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier'])
    localStorage.setItem("exp",this.decodedToken['exp'])
    // console.log(localStorage.getItem("role"))
    // console.log(this.decodedToken['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'])
  }

}
