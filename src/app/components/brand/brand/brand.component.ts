import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Brand } from 'src/app/models/brand';
import { BrandService } from 'src/app/services/brand.service';

@Component({
  selector: 'app-brand',
  templateUrl: './brand.component.html',
  styleUrls: ['./brand.component.css']
})
export class BrandComponent implements OnInit {

  brands:Brand[]=[];
  currentBrand: Brand;
  constructor(private brandService:BrandService,
    private activatedRoute: ActivatedRoute) { }
  
  ngOnInit(): void {
        this.getBrands();
}

  getBrands(){
    return this.brandService.getBrands().subscribe(response=>{
      this.brands = response.data;
    })
  }
  setCurrentBrand(brand: Brand) {
    this.currentBrand = brand;
  }
  setCurrentBrandAll() {
    this.currentBrand = null;
  }
  getCurrentBrandClass(brand: Brand) {
    if (brand == this.currentBrand) {
      return 'list-group-item active';
    }else{return 'list-group-item';}
  }
  getAllBrandClass() {
    if (!this.currentBrand) {
      return 'list-group-item active';
    } else {
      return 'list-group-item';
    }
  }
}
