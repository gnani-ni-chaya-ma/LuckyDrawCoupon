import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-print',
  templateUrl: './print.component.html',
  styleUrls: ['./print.component.scss']
})
export class PrintComponent {

  constructor(
    public dialogRef: MatDialogRef<PrintComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {
  }

  printCoupon(printSection: any): void {
    this.dialogRef.close();
    let popupWin: Window;
    popupWin = window.open('', '_blank', 'top=0,left=0,height=100%,width=auto');
    popupWin.document.open();
    popupWin.document.write(`
      <html>
        <head>
          <title>Print Coupon</title>
        </head>
      <body onload="window.print();window.close()">${printSection.innerHTML}</body>
      </html>`
    );
    popupWin.document.close();
  }

}
