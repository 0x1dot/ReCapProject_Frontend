import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Fuel } from '../models/fuel';
import { ListResponseModel } from '../models/listResponseModel';

@Injectable({
  providedIn: 'root'
})
export class FuelService {

  constructor(private httpClient: HttpClient) { }
  getFuels(): Observable<ListResponseModel<Fuel>> {
    let newPath = environment.apiUrl + "fuels/getall"
    return this.httpClient.get<ListResponseModel<Fuel>>(newPath);
  }
}
