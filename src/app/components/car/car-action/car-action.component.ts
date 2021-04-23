import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Brand } from 'src/app/models/brand';
import { Car } from 'src/app/models/car';
import { Color } from 'src/app/models/color';
import { Fuel } from 'src/app/models/fuel';
import { Gear } from 'src/app/models/gear';
import { BrandService } from 'src/app/services/brand.service';
import { CarService } from 'src/app/services/car.service';
import { CartService } from 'src/app/services/cart.service';
import { ColorService } from 'src/app/services/color.service';
import { FuelService } from 'src/app/services/fuel.service';
import { GearService } from 'src/app/services/gear.service';

@Component({
  selector: 'app-car-action',
  templateUrl: './car-action.component.html',
  styleUrls: ['./car-action.component.css'],
})
export class CarActionComponent implements OnInit {
  CarActionForm: FormGroup;
  param: number;
  car: Car;
  brands: Brand[];
  colors: Color[];
  fuels: Fuel[];
  gears: Gear[];
  constructor(
    private FormBuilder: FormBuilder,
    private carService: CarService,
    private brandService: BrandService,
    private colorService: ColorService,
    private fuelService: FuelService,
    private gearService: GearService,
    private activatedRoute: ActivatedRoute,
    private toastrService: ToastrService
  ) { }

  ngOnInit(): void {
    this.createCarActionForm();
    this.activatedRoute.params.subscribe((params) => {
      this.getCars(params['carId']);
      this.brandService.getBrands().subscribe((repsonse) => {
        this.brands = repsonse.data;
      });
      this.colorService.getColors().subscribe((repsonse) => {
        this.colors = repsonse.data;
      });
      this.fuelService.getFuels().subscribe((repsonse) => {
        this.fuels = repsonse.data;
      });
      this.gearService.getGears().subscribe((repsonse) => {
        this.gears = repsonse.data;
      });
    });
  }  
  getCars(carId:number){
    if ((this.param = carId)) {
      this.carService.getCarsDtoById(carId).subscribe((response) => {
          this.car = response.data;
          this.CarActionForm.controls['brandId'].setValue(this.car.brandId);
          this.CarActionForm.controls['colorId'].setValue(this.car.colorId);
          this.CarActionForm.controls['fuelId'].setValue(this.car.fuelId);
          this.CarActionForm.controls['gearId'].setValue(this.car.gearId);
          this.CarActionForm.controls['carName'].setValue(this.car.carName);
          this.CarActionForm.controls['modelYear'].setValue(this.car.modelYear);
          this.CarActionForm.controls['dailyPrice'].setValue(this.car.dailyPrice);
        });
    }
  }
  createCarActionForm() {
      this.CarActionForm = this.FormBuilder.group({
        brandId: [null, [Validators.required]],
        colorId: [null, [Validators.required]],
        fuelId: [null, [Validators.required]],
        gearId: [null, [Validators.required]],
        carName: [null, [Validators.required]],
        modelYear: [null, [Validators.required]],
        dailyPrice: [null, [Validators.required]],
      });    
  }
  actionBuild() {
    if (this.CarActionForm.valid) {
      if (this.param) {
        let carModel = Object.assign(this.car, this.CarActionForm.value);
        this.carService.updateCars(carModel).subscribe(response => {
          if (response.success) {
            this.toastrService.success("Güncelleme işleminiz gerçekleştirildi.", "Başarılı");
          } else {
            this.toastrService.error("Güncelleme işleminiz gerçekleştirilemedi.", "Başarısız");
          }
        });
      } else {
        let carModel = Object.assign({}, this.CarActionForm.value);
        this.carService.addCars(carModel).subscribe(response => {
          if (response.success) {
            this.toastrService.success("Ekleme işleminiz gerçekleştirildi.", "Başarılı");
          } else {
            this.toastrService.error("Ekleme işleminiz gerçekleştirilemedi.", "Başarısız");
          }
        });
      }
    }
  }
}
