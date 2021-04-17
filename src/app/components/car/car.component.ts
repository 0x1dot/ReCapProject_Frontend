import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Brand } from 'src/app/models/brand';
import { Car } from 'src/app/models/car';
import { Color } from 'src/app/models/color';
import { BrandService } from 'src/app/services/brand.service';
import { CarService } from 'src/app/services/car.service';
import { CartService } from 'src/app/services/cart.service';
import { ColorService } from 'src/app/services/color.service';

@Component({
  selector: 'app-car',
  templateUrl: './car.component.html',
  styleUrls: ['./car.component.css'],
})
export class CarComponent implements OnInit {
  cars: Car[] = [];
  brands: Brand[] = [];
  colors: Color[] = [];
  filterText = '';
  brandFilter = 0;
  colorFilter = 0;
  apiUrl = 'https://localhost:44373/images/';
  constructor(
    private carService: CarService,
    private brandService: BrandService,
    private colorService: ColorService,
    private activatedRoute: ActivatedRoute,
    private toastrService: ToastrService,
    private cartService: CartService
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      if (params['brandId'] && params['colorId']) {
        this.brandFilter = params['brandId'];
        this.colorFilter = params['colorId'];
        this.GetCarsBrandAndColor(params['brandId'], params['colorId']);
      } else if (params['brandId']) {
        this.getCarsByBrand(params['brandId']);
      } else if (params['colorId']) {
        this.getCarsByColor(params['colorId']);
      } else {
        this.getCars();
      }
    });
    this.getBrands();
    this.getColors();
  }

  getCars() {
    return this.carService.getCars().subscribe((response) => {
      this.cars = response.data;
    });
  }
  getBrands() {
    return this.brandService.getBrands().subscribe((response) => {
      this.brands = response.data;
    });
  }
  getColors() {
    return this.colorService.getColors().subscribe((response) => {
      this.colors = response.data;
    });
  }
  getCarsByBrand(brandName: number) {
    this.carService.getCarsByBrand(brandName).subscribe((response) => {
      this.cars = response.data;
    });
  }
  getCarsByColor(colorName: number) {
    this.carService.getCarsByColor(colorName).subscribe((response) => {
      this.cars = response.data;
    });
  }
  GetCarsBrandAndColor(brandId: number, colorId: number) {
    this.carService
      .GetCarsBrandAndColor(brandId, colorId)
      .subscribe((response) => {
        this.cars = response.data;
      });
  }
  selectedColor(colorId: number) {
    if (this.colorFilter == colorId) {
      return true;
    } else {
      return false;
    }
  }
  selectedBrand(brandId: number) {
    if (this.brandFilter == brandId) {
      return true;
    } else {
      return false;
    }
  }
  addToCart(car: Car) {
    this.cartService.addToCart(car);
    this.toastrService.success(
      car.brandName + ' ' + car.carName + ' Sepete eklendi'
    );
  }
}
