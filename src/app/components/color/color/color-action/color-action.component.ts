import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Color } from 'src/app/models/color';
import { ColorService } from 'src/app/services/color.service';

@Component({
  selector: 'app-color-action',
  templateUrl: './color-action.component.html',
  styleUrls: ['./color-action.component.css']
})
export class ColorActionComponent implements OnInit {
  ColorActionForm: FormGroup;
  param: number;
  color: Color={colorId:0,colorName:null};
  constructor(private FormBuilder: FormBuilder,
    private toastrService: ToastrService,
    private activatedRoute: ActivatedRoute,
    private colorService: ColorService) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      if (this.param = params['colorId']) {
        this.colorService.getColorById(params['colorId']).subscribe(response => {
          this.color = response.data;
        });
      }
      this.createColorActionForm();
    });
  }
  createColorActionForm() {
    this.ColorActionForm = this.FormBuilder.group({
      colorName: ['', Validators.required]
    });
  }
  actionBuild() {
    if (this.ColorActionForm.valid) {
      let colorModel = Object.assign(this.color, this.ColorActionForm.value);
      if (this.param) {
        this.colorService.updateColors(colorModel).subscribe(response => {
          if (response.success) {
            this.toastrService.success("Güncelleme işleminiz gerçekleştirildi.", "Başarılı");
          } else {
            this.toastrService.error("Güncelleme işleminiz gerçekleştirilemedi.", "Başarısız");
          }
        });
      } else {
        this.colorService.addColors(colorModel).subscribe(response => {
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
