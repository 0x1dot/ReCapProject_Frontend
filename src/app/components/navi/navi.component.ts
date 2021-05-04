import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';
import { StorageService } from 'src/app/services/storage.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-navi',
  templateUrl: './navi.component.html',
  styleUrls: ['./navi.component.css']
})
export class NaviComponent implements OnInit {
apiurl = environment.api+"images/"
  constructor(private authService:AuthService,
    private toastrService:ToastrService,
    private storage:StorageService,
    private router:Router,) { }

  ngOnInit(): void {
    this.getItem();
  }
  logOut(){
    this.authService.logOut();
    this.toastrService.info(" Anasayfaya yönlendiriliyorsunuz...","Çıkış işlemi gerçekleşti")
    setTimeout(()=>this.router.navigateByUrl('login'),1000);
  }
  getItem(){
    return this.authService.getToken();
  }
  getUser(){
    return this.storage.getItem("name");
  }
}
