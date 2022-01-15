import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DateAdapter, MAT_DATE_FORMATS } from '@angular/material/core'

import { RentService } from './../../../services/rent.service';
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
    returnDate = new Date();
    rentDate: Date;
    id: string;
    constructor(
        public dialogRef: MatDialogRef<ReturnDateComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any,
        public dialog: MatDialog,
        private rentService: RentService,
        private snackBar: MatSnackBar
    ) { }

    ngOnInit() {
        if (this.data) {
            this.rentDate = this.data.rentDate;
            this.id = this.data.id;
        }
    }

    returnBook() {
        this.rentService.returnBook(this.id, this.returnDate).subscribe(
            res => {
                this.rentService.rentUpdated();
                this.snackBar.open("Book returned", null, {
                    duration: 5000,
                    panelClass: ["correct-snackbar"]
                });
                this.dialogRef.close();
            },
            err => {
                console.log(err);
                this.snackBar.open("There was error: " + err.message, null, {
                    duration: 8000,
                    panelClass: ["warning-snackbar"]
                });
            }
        );
    }
}
