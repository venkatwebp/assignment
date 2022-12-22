import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators'
import { signInModel } from '../sign-in/signin.mode';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class SignupService {
  newdata:any;
  constructor(private http: HttpClient,private router: Router) { }

  postSignUpData(data: any){
    return this.http.post<any>('https://snapkaro.com/eazyrooms_staging/api/user_registeration', data)
    .pipe(map((res)=>{      
      return res
    }))
  }

  postSignInData(data: signInModel){
   return this.http.post<any>('https://snapkaro.com/eazyrooms_staging/api/userlogin', data)
   .pipe(map((res)=>{      
    return res
  }))
  }

  setDataInLocalStorage(userdata:any){
    this.newdata=userdata;
    localStorage.setItem("userdata",JSON.stringify(userdata));
  }

  async getUserFromService(){
    if(!this.newdata && localStorage.getItem("userdata")){
      this.newdata=localStorage.getItem("userdata");
      this.newdata = JSON.parse(this.newdata);
    }
    return this.newdata;
  }
}
