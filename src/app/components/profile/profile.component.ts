import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { User } from 'src/app/models/user';
import { StorageService } from 'src/app/services/storage.service';
import { UserService } from 'src/app/services/user.service';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  userForm: FormGroup;
  user: User;
  constructor(
    private formBuilder: FormBuilder, 
    private userService: UserService, 
    private storage: StorageService,
    private toastrService:ToastrService) { }

  ngOnInit(): void {
    this.getUser();
    
    this.createUserForm();
  }
  createUserForm() {
    this.userForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', Validators.required],
    });
  }
  getUser() {
    this.userService.getUserById(Number.parseInt(this.storage.getItem("userId"))).subscribe(response => {
      if (response.success) {
        this.user = response.data;
        this.userForm.controls['firstName'].setValue(this.user.firstName);
        this.userForm.controls['lastName'].setValue(this.user.lastName);
        this.userForm.controls['email'].setValue(this.user.email);
      }
    });
  }
  changeUser(){
    if(this.userForm.valid){
      let userModel:User = Object.assign(this.user,this.userForm.value);
      this.userService.userUpdate(userModel).subscribe(response=>{
        if(response.success){
          this.toastrService.success(response.message);
        }
      });
    }else{
      this.toastrService.error("gerekli alanları doldurunuz.");
    }
  }
}
