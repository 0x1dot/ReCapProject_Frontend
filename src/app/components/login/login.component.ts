import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private AuthService:AuthService,
    private toastrService:ToastrService,
    private router: Router) { }

  ngOnInit(): void {
    this.createLoginForm();
  }
  createLoginForm() {
    this.loginForm = this.formBuilder.group({
      email: ["", Validators.required],
      password: ["", Validators.required],
    });
  }
  login() {
    if (this.loginForm.valid) {
      let loginModel = Object.assign({},this.loginForm.value);
      this.AuthService.login(loginModel).subscribe(response=>{
        this.toastrService.info(response.message);
        this.toastrService.success("Giriş başarılı.","Başarılı");
        let token = response.data.token;
        localStorage.setItem("token",token);
        this.AuthService.decodeToken(token);
         this.router.navigate(['/']);
      },responseError=>{
        this.toastrService.error(responseError.error);
      });
    }
  }
}
