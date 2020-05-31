import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {FormGroup, FormControl, Validators} from '@angular/forms';
import {CustomValidators} from '../../utils/custom-validators';
import {ServerService} from '../../service/server.service';

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

  async submitForm(form) {
    this.isSubmitting = form;
    if (form === 'register' && this.registrationForm.valid) {
      this.server.registerUser({ ...this.registrationForm.value }).subscribe(response => {
        console.log("register : ", response);
      });
    } else if (form === 'auth' && this.loginForm.valid) {
      console.log(this.loginForm.value);
    }
  }

  constructor(private router: ActivatedRoute, private server: ServerService) {
  }

  ngOnInit(): void {
    this.router.params.subscribe(params => {
      if (params.param === 'signup') {
        this.isLogin = false;
      } else {
        this.isLogin = true;
      }
    });

    // Bro I changed apiServer name cause now we wont use that only for api's :P
    // Delete this comments after seeing

    this.test();
  }

  test() {
    this.server.errorMessage('test message');

  }

}
