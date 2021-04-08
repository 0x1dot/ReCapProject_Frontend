import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Car } from 'src/app/models/car';
import { CarImages } from 'src/app/models/carimages';
import { CarService } from 'src/app/services/car.service';

@Component({
  selector: 'app-car-details',
  templateUrl: './car-details.component.html',
  styleUrls: ['./car-details.component.css'],
})
export class CarDetailsComponent implements OnInit {
  cars: Car[];
  images: CarImages[];
  apiUrl = 'https://localhost:44373/images/';
  dataLoaded: boolean = false;
  constructor(
    private carService: CarService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      if (params['carId']) {
        this.getCarsById(params['carId']);
        this.getCarsImagesById(params['carId']);
      } else {
      }
    });
  }
  getCarsById(carId: string) {
    this.carService.getCarsById(carId).subscribe((response) => {
      this.cars = response.data;
      this.dataLoaded = true;
    });
  }
  getCarsImagesById(carId: string) {
    this.carService.getCarImagesById(carId).subscribe((response) => {
      this.images = response.data;
      this.dataLoaded = true;
    });
  }
  GetImage() {
    if (this.images.length > 0) {
      return this.apiUrl + this.images[0].imagePath;
    } else {
      var s = this.apiUrl + 'default.jpg';
      return s;
    }
  }
}
