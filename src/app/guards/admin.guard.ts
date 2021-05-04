import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {
  role:string="admin"
  constructor(private authService:AuthService,
    private toastr:ToastrService,
    private router:Router){}
  getRole(){
    return  localStorage.getItem("role") === this.role;
  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if(this.getRole()){
      return true;
    }else{
      this.router.navigate([""])
      this.toastr.info("Yetkisiz Giriş","Dikkat ! ");
      return false;
    }
  }
  
}
