import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material';
import { PrintComponent } from '../print/print.component';
import { NgxSpinnerService } from "ngx-spinner";
import { ToastrService } from 'ngx-toastr';
import { ApiService } from '../service/api.service';

@Component({
  selector: 'app-coupon',
  templateUrl: './coupon.component.html',
  styleUrls: ['./coupon.component.scss']
})
export class CouponComponent implements OnInit {

  form: FormGroup;
  @ViewChild('couponForm', { static: true }) couponForm: NgForm;

  constructor(
    private _formBuilder: FormBuilder,
    private _router: Router,
    public dialog: MatDialog,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService,
    public _apiService: ApiService,
  ) {
  }

  ngOnInit() {
    this.form = this._formBuilder.group({
      contactNumber: [null, [Validators.required, Validators.pattern(/^[6-9]\d{9}$/)]],
    });
  }

  get f() {
    return this.form.controls;
  }

  async submit() {
    console.log('Form', this.form.value);
    try {
      if (this.form.valid) {
        this.spinner.show();
        const result = await this._apiService.generateCoupon(this.form.value).toPromise();
        this.dialog.open(PrintComponent, {
          width: '400px',
          data: result,
          disableClose: true,
        });
        this.f.contactNumber.reset();
        this.spinner.hide();
      }
    } catch (error) {
      this.spinner.hide();
      console.error('Error in API', error);
      this.toastr.error(`${error.message || error}`, `${error.status || 'Error to generate coupon'}`);
    }
  }

  logout() {
    this._apiService.currentUser = null;
    this._router.navigate(['login']);
  }
}
