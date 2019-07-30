import { Component, Inject, OnInit } from '@angular/core';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material';
import { RentService } from 'src/app/services/rent.service';

import { APP_DATE_FORMATS, AppDateAdapter } from './../../../helpers/format-datepicker';

@Component({
  selector: "app-return-date",
  templateUrl: "./return-date.component.html",
  styleUrls: ["./return-date.component.css"],
  providers: [
    { provide: DateAdapter, useClass: AppDateAdapter },
    { provide: MAT_DATE_FORMATS, useValue: APP_DATE_FORMATS }
  ]
})
export class ReturnDateComponent implements OnInit {
  returnDate;
  rentDate;
  id;
  constructor(
    public dialogRef: MatDialogRef<ReturnDateComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialog: MatDialog,
    private rentService: RentService
  ) {}

  ngOnInit() {
    if (this.data) {
      this.rentDate = this.data.rentDate;
      this.id = this.data.id;
    }
  }

  returnBook() {
    console.log("jaksa: ", this.id, this.returnDate);
    this.rentService.returnBook(this.id, this.returnDate).subscribe(
      res => {
        console.log(res);
      },
      err => {
        console.log(err);
      }
    );
  }
}
