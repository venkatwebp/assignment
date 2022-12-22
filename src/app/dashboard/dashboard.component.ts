import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { SignupService } from '../shared/signup.service';
import { SignUpModel } from '../sign-up/signup.model';
import {Router} from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  formValue !: FormGroup;
  signupmodel: SignUpModel = new SignUpModel();
  users: any;
  userExist: any;

  constructor(private signup: SignupService,
    private formBuilder: FormBuilder, private router: Router
    ) { }

 async ngOnInit() {
    this.formValue = this.formBuilder.group({
      user_firstname: [],
      user_email: [],
      user_phone: [],
      user_password: [],
      user_lastname: [],
      user_city: [],
      user_zipcode: []
    })
    this.userExist = await this.signup.getUserFromService();
    if(!this.userExist){
      this.router.navigateByUrl('/signin');
    }else{
      console.log(this.userExist);
    }
  }

  postSignUp(){
    this.signupmodel.user_firstname = this.formValue.value.user_firstname;
    this.signupmodel.user_email = this.formValue.value.user_email;
    this.signupmodel.user_phone = this.formValue.value.user_phone;
    this.signupmodel.user_password = this.formValue.value.user_password;
    this.signupmodel.user_lastname = this.formValue.value.user_lastname;
    this.signupmodel.user_city = this.formValue.value.user_city;
    this.signupmodel.user_zipcode = this.formValue.value.user_zipcode;

    this.signup.postSignUpData(this.signupmodel)
    .subscribe(res=>{
      console.log(res);
    })
  }
  async logout(){
    localStorage.clear();
    this.signup.newdata=null;
    this.router.navigateByUrl("/signin")
  }
}
