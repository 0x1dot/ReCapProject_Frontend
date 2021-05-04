import { Component } from '@angular/core';
import { StorageService } from './services/storage.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(private storageService:StorageService){}
  title = 'ReCapProject';
  user:string = "Murat Dursun";

  isLogin(){
    return !(this.storageService.getItem("token") === null);
  }
}
