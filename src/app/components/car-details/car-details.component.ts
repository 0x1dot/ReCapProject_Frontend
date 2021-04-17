import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Car } from 'src/app/models/car';
import { CarImages } from 'src/app/models/carimages';
import { CarService } from 'src/app/services/car.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-car-details',
  templateUrl: './car-details.component.html',
  styleUrls: ['./car-details.component.css'],
})
export class CarDetailsComponent implements OnInit {
  cardetail: Car;
  images: CarImages[];
  apiUrl = environment.apiUrl+'/images/';
  dataLoaded: boolean = false;
  constructor(
    private carService: CarService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      if (params['carId']) {
        this.getCarsDtoById(params['carId']);
        this.getCarsImagesById(params['carId']);
      } else {
      }
    });
  }
  getCarsDtoById(carId: number) {
    this.carService.getCarsDtoById(carId).subscribe((response) => {
      this.cardetail = response.data;
      this.dataLoaded = true;
    });
  }
  getCarsImagesById(carId: number) {
    this.carService.getCarImagesById(carId).subscribe((response) => {
      this.images = response.data;
      this.dataLoaded = true;
    });
  }
  GetImage() {//api tarafına alınacak
    if (this.images.length > 0) {
      return this.apiUrl + this.images[0].imagePath;
    } else {
      var s = this.apiUrl + 'default.jpg';
      return s;
    }
  }
  getCurrentSlideClass(carImage:CarImages){
    if (carImage === this.images[0]) {
      return "carousel-item active"
    }
    return "carousel-item"
  }
}
