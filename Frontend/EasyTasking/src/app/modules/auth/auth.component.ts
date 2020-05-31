import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CustomValidators } from '../../utils/custom-validators';
import { ServerService } from '../../service/server.service';
import { CookieService } from 'src/app/service/cookie.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {

  isLogin = true;
  isChecked = true;
  isSubmitting = null;

  registrationForm = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(3)]),
    email: new FormControl('', [Validators.required, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$')]),
    password: new FormControl('', [
      Validators.required,
      CustomValidators.patternValidator(/\d/, { hasNumber: true }),
      CustomValidators.patternValidator(/[A-Z]/, { hasCapitalCase: true }),
      CustomValidators.patternValidator(/[a-z]/, { hasSmallCase: true }),
      Validators.minLength(8)]),
    gender: new FormControl('', Validators.required),
    phone: new FormControl('')
  });

  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$')]),
    password: new FormControl('', [Validators.required])
  });

  get registerForm() {
    return this.registrationForm.controls;
  }

  get authForm() {
    return this.loginForm.controls;
  }

  async submitForm(form) {
    this.isSubmitting = form;
    if (form === 'register' && this.registrationForm.valid) {
      this.server.registerUser({ ...this.registrationForm.value }).subscribe((response: any) => {
        if (response.success) {
          this.server.successMessage('Account successfully created !')
        } else {
          this.server.errorMessage('Some error occurred !')
        }
      });
    } else if (form === 'auth' && this.loginForm.valid) {
      this.server.loginUser({ ...this.loginForm.value }).subscribe((response: any) => {
        if(response.success){
          console.log(response)
          localStorage.setItem('auth_token',response.data.token)
          this.cookieService.setCookie('auth_token',response.data.token,1)
          this.router.navigate(['/dashboard'])
        }
      })
    }
  }

  constructor(private router:Router,private activatedRouter: ActivatedRoute, private server: ServerService, private cookieService: CookieService,) {
  }

  ngOnInit(): void {
    this.activatedRouter.params.subscribe(params => {
      if (params.param === 'signup') {
        this.isLogin = false;
      } else {
        this.isLogin = true;
      }
    });
  }
}
