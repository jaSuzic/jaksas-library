import { Rent } from './../../../models/rent.model';
import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';

import { RentService } from './../../../services/rent.service';
@Component({
    selector: "app-rent-history",
    templateUrl: "./rent-history.component.html",
    styleUrls: ["./rent-history.component.css"]
})
export class RentHistoryComponent implements OnInit {
    rents: any[];
    isLoading = false;

    constructor(
        public dialogRef: MatDialogRef<RentHistoryComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any,
        public dialog: MatDialog,
        private rentService: RentService
    ) { }

    ngOnInit() {
        this.isLoading = true;
        this.rentService.getRentHistory(this.data.id).subscribe({
            next: res => {
                this.isLoading = false;
                this.rents = res as Rent[];
            },
            error: err => {
                console.log(err);
            }
        })
    }

    close() {
        this.dialogRef.close();
    }
}
