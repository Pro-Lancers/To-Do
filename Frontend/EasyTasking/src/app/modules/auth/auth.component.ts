import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl ,Validators } from '@angular/forms';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {

  isLogin = true;
  isChecked = true;

  
    registrationForm= new FormGroup({
      name: new FormControl('', [Validators.required, Validators.minLength(3)]),
      email: new FormControl(),
      password: new FormControl(),
      gender: new FormControl()
    });

    loginForm= new FormGroup({
      email: new FormControl(),
      password: new FormControl()
    });
    get f(){
      return this.registrationForm.controls;
    }
    submit(){
      alert('hello')
      console.log(this.registrationForm)
      return false;
    }
  constructor(private router: ActivatedRoute) { }

  ngOnInit(): void {
    this.router.params.subscribe(params => {
      if (params.param == 'signup') this.isLogin = false;
      else this.isLogin = true;
    });
  }

}
