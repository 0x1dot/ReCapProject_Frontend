import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Customer } from 'src/app/models/customer';
import { AuthService } from 'src/app/services/auth.service';
import { CustomerService } from 'src/app/services/customer.service';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private AuthService:AuthService,
    private customerService:CustomerService,
    private toastrService:ToastrService,
    private storage:StorageService,
    private router: Router) { }

  ngOnInit(): void {
    this.createLoginForm();
  }
  createLoginForm() {
    this.registerForm = this.formBuilder.group({
      email: ["", Validators.required],
      password: ["", Validators.required],
      firstName: ["",Validators.required],
      lastName: ["",Validators.required],
    });
  }
  register() {
    if (this.registerForm.valid) {
      let registerModel = Object.assign({},this.registerForm.value);
      this.AuthService.register(registerModel).subscribe(response=>{
        this.toastrService.success(response.message);
        let token = response.data.token;
        localStorage.setItem("token",token);
        this.AuthService.decodeToken(token);
        let customer:Customer=Object.assign({});
        customer.userId = Number.parseInt(this.storage.getItem("userId"));
        this.customerService.customerAdd(customer).subscribe(response=>{
          if(response.success){
            this.toastrService.success(response.message);
            setTimeout(() => {
              this.router.navigate(['/'])
            }, 1000);
          }
        });
      },responseError=>{
        if(responseError.error.Errors.length>0){
          for (let i = 0; i < responseError.error.Errors.length; i++) {
            this.toastrService.error(responseError.error.Errors[i].ErrorMessage,"Doğrulama hatası")
          }
        }
        else{
          this.toastrService.error(responseError.error);
        }
      }
      );
    }
  }
}