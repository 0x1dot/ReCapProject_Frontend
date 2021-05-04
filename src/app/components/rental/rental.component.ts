import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Car } from 'src/app/models/car';
import { CarImages } from 'src/app/models/carimages';
import { CarService } from 'src/app/services/car.service';
import { environment } from 'src/environments/environment';
@Component({
  selector: 'app-rental',
  templateUrl: './rental.component.html',
  styleUrls: ['./rental.component.css'],
})
export class RentalComponent implements OnInit {
  apiUrl = environment.api+'images/';
  car:Car;
  images: CarImages[];
  dataLoaded: boolean = false;
  constructor(
    private activatedRoute: ActivatedRoute,
    private carService: CarService,
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      if (params['carId']) {
        this.getCars(params['carId']);
        this.getCarsImagesById(params['carId']);
      }
    });
  }
  getCars(carId: number) {
    this.carService.getCarsDtoById(carId).subscribe((response) => {
      this.car = response.data;
    });
  } 
  getCarsImagesById(carId: number) {
    this.carService.getCarImagesById(carId).subscribe((response) => {
      this.images = response.data;
      this.dataLoaded = true;
    });
  }
  getCurrentSlideClass(carImage:CarImages){
    if (carImage === this.images[0] || carImage === null) {
      return "carousel-item active"
    }
    return "carousel-item"
  }
}
