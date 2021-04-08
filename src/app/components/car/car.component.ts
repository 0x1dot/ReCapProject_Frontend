import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Car } from 'src/app/models/car';
import { CarService } from 'src/app/services/car.service';

@Component({
  selector: 'app-car',
  templateUrl: './car.component.html',
  styleUrls: ['./car.component.css'],
})
export class CarComponent implements OnInit {
  cars: Car[] = [];
  constructor(private carService: CarService, private activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      if (params['brandId']) {
        this.getCarsByBrand(params['brandId']);
      } else if(params['colorId']){
        this.getCarsByColor(params['colorId']);
      }else {
        this.getCars();
      }
    });
  }

  getCars() {
    return this.carService.getCars().subscribe((response) => {
      this.cars = response.data;
    });
  }
  getCarsByBrand(brandName:string) {
    this.carService.getCarsByBrand(brandName).subscribe((response) => {
      this.cars = response.data;
    });
  }
  getCarsByColor(colorName:string) {
    this.carService.getCarsByColor(colorName).subscribe((response) => {
      this.cars = response.data;
    });
  }
}
