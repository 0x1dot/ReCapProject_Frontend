import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Gear } from '../models/gear';
import { ListResponseModel } from '../models/listResponseModel';

@Injectable({
  providedIn: 'root'
})
export class GearService {

  constructor(private httpClient: HttpClient) { }
  getGears(): Observable<ListResponseModel<Gear>> {
    let newPath = environment.apiUrl + "gears/getall"
    return this.httpClient.get<ListResponseModel<Gear>>(newPath);
  }
}
