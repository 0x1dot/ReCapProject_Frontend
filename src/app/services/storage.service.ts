import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor() { }
  getItem(name:any){
    return localStorage.getItem(name);
  }
  setItem(name:any,value:any){
    localStorage.setItem(name,value);
  }
  removeItem(name:any){
    localStorage.removeItem(name);
  }
  clear(){
    localStorage.clear();
    return true;
  }
}
