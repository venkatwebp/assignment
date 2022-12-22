import { Component, OnInit } from '@angular/core';
import { AbstractControl,FormBuilder, FormGroup,Validators } from '@angular/forms';
import { SignupService } from '../shared/signup.service';
import { signInModel } from './signin.mode';
import {Router} from '@angular/router';


@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {

  formValue !: FormGroup;
  signInObj: signInModel = new signInModel();
  isDataAvailable: any;
  newdata: any;
  submitted = false;
  constructor(private signup: SignupService, private formBuilder: FormBuilder, private router: Router) { }

  async ngOnInit(){
    this.isDataAvailable = await this.signup.getUserFromService();
    if(this.isDataAvailable){
      this.router.navigateByUrl('/dashboard');
    }
    this.formValue = this.formBuilder.group({
      user_email: ['',[Validators.required,Validators.email]],
      user_password: ['',[Validators.minLength(5),Validators.required]]
    })
  }

  async createSignIn(){
    this.submitted = true;
    this.signInObj.user_email = this.formValue.value.user_email;
    this.signInObj.user_password = this.formValue.value.user_password;
    if(this.signInObj.user_email!="" && this.signInObj.user_password!=""){
    this.signup.postSignInData(this.signInObj)
    .subscribe((res:any)=>{
      if(res.status){
        this.newdata=res.user_data[0];
        if(this.newdata){
          this.signup.setDataInLocalStorage(this.newdata);
          this.router.navigateByUrl('/dashboard')
        }
      }else{
        window.alert(res.msg)
      }
    });

  }
  }
  get f(): { [key: string]: AbstractControl } {
    return this.formValue.controls;
  }
}
