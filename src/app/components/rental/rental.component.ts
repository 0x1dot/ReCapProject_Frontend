import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Car } from 'src/app/models/car';
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
  constructor(
    private activatedRoute: ActivatedRoute,
    private carService: CarService,
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      if (params['carId']) {
        this.getCars(params['carId']);
      }
    });
  }
  getCars(carId: number) {
    this.carService.getCarsDtoById(carId).subscribe((response) => {
      this.car = response.data;
    });
  } 
}
