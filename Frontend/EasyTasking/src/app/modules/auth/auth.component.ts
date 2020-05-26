import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {FormGroup, FormControl, Validators} from '@angular/forms';
import {CustomValidators} from '../../utils/custom-validators';

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
      CustomValidators.patternValidator(/\d/, {hasNumber: true}),
      CustomValidators.patternValidator(/[A-Z]/, {hasCapitalCase: true}),
      CustomValidators.patternValidator(/[a-z]/, {hasSmallCase: true}),
      Validators.minLength(8)]),
    gender: new FormControl('', Validators.required),
    phone: new FormControl()
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

  submitForm(form) {
    if (form === 'register') {
      console.log(this.registrationForm.value);
    } else if (form === 'auth') {
      console.log(this.loginForm.value);
    }
    this.isSubmitting = form;
  }

  constructor(private router: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.router.params.subscribe(params => {
      if (params.param === 'signup') {
        this.isLogin = false;
      } else {
        this.isLogin = true;
      }
    });
  }

}
