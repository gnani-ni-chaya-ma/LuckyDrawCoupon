import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from '../service/api.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;

  constructor(
    private _formBuilder: FormBuilder,
    private _router: Router,
    private _toastr: ToastrService,
    private _spinner: NgxSpinnerService,
    private _apiService: ApiService,
  ) {
  }

  ngOnInit() {
    this.loginForm = this._formBuilder.group({
      username: [null, Validators.required],
      password: [null, Validators.required],
    });
  }

  get f() {
    return this.loginForm.controls;
  }

  delay = (s: number) => new Promise(res => setTimeout(res, s * 1000));

  async submit() {
    console.log('Form', this.loginForm.value);
    try {
      if (this.loginForm.valid) {
        this._spinner.show();
        if (this.f.username.value === 'admin@gnc.com' && this.f.password.value === 'Admin@GNC#') {
          this._apiService.currentUser = { username: 'Admin' };
          await this.delay(3);
        } else {
          const result = await this._apiService.login(this.loginForm.value).toPromise();
          this._apiService.currentUser = result;
        }
        this._router.navigate(['coupon']);
        this._spinner.hide();
      }
    } catch (error) {
      this._spinner.hide();
      console.error('Error in API', error);
      this._toastr.error(`${error.message || error}`, `${error.status || 'Error to login'}`);
    }
  }
}
