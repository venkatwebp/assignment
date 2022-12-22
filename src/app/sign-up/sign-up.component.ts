import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SignupService } from '../shared/signup.service';
import { SignUpModel } from './signup.model';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {

  formValue !: FormGroup;
  signupmodel: SignUpModel = new SignUpModel();
  users: any;
  submitted = false;


  constructor(private signup: SignupService, private formBuilder: FormBuilder,private router: Router) { }

  ngOnInit() {
    this.formValue = this.formBuilder.group({
      user_firstname: ['', Validators.required],
      user_email: ['', [Validators.required,Validators.email]],
      user_phone: ['', [Validators.minLength(10),Validators.required]],
      user_password: ['', [Validators.minLength(5),Validators.required]],
      user_lastname: [''],
      user_city: ['', Validators.required],
      user_zipcode: ['', Validators.required],
      terms:['',Validators.required]
    })    
  }

  postSignUp(){
    this.submitted = true;
    
    if (this.formValue.invalid) {
      return;
    }
    this.signupmodel.user_firstname = this.formValue.value.user_firstname;
    this.signupmodel.user_email = this.formValue.value.user_email;
    this.signupmodel.user_phone = this.formValue.value.user_phone;
    this.signupmodel.user_password = this.formValue.value.user_password;
    this.signupmodel.user_lastname = this.formValue.value.user_lastname;
    this.signupmodel.user_city = this.formValue.value.user_city;
    this.signupmodel.user_zipcode = this.formValue.value.user_zipcode;

    this.signup.postSignUpData(this.signupmodel)
    .subscribe(res=>{
      if(res.status){
        this.router.navigateByUrl('/signin')
      }else{
        window.alert(res.msg)
      }
    })
  }

  get f(): { [key: string]: AbstractControl } {
    return this.formValue.controls;
  }
}
