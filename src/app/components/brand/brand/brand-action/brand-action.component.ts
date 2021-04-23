import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Brand } from 'src/app/models/brand';
import { BrandService } from 'src/app/services/brand.service';

@Component({
  selector: 'app-brand-action',
  templateUrl: './brand-action.component.html',
  styleUrls: ['./brand-action.component.css']
})
export class BrandActionComponent implements OnInit {
  BrandActionForm: FormGroup;
  param: number;
  brand: Brand={brandId:0,brandName:null};
  constructor(
    private FormBuilder: FormBuilder,
    private toastrService: ToastrService,
    private activatedRoute: ActivatedRoute,
    private brandService: BrandService) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      if (this.param = params['brandId']) {
        this.brandService.getBrandById(params['brandId']).subscribe(response => {
          this.brand = response.data;
        });
      }

      this.createBrandActionForm();
    });
  }
  createBrandActionForm() {
    this.BrandActionForm = this.FormBuilder.group({
      brandName: ['', Validators.required]
    });
  }
  actionBuild() {
    if (this.BrandActionForm.valid) {
      let brandModel = Object.assign(this.brand, this.BrandActionForm.value);
      if (this.param) {
        this.brandService.updateBrands(brandModel).subscribe(response => {
          if (response.success) {
            this.toastrService.success("Güncelleme işleminiz gerçekleştirildi.", "Başarılı");
          } else {
            this.toastrService.error("Güncelleme işleminiz gerçekleştirilemedi.", "Başarısız");
          }
        });
      } else {
        this.brandService.addBrands(brandModel).subscribe(response => {
          if (response.success) {
            this.toastrService.success("Ekleme işleminiz gerçekleştirildi.", "Başarılı");
          } else {
            this.toastrService.error("Ekleme işleminiz gerçekleştirilemedi.", "Başarısız");
          }
        });
      }
    }
    else {
      this.toastrService.error("Lütfen gerekli yerleri doldurunuz!", "Hata");
    }
  }
}
