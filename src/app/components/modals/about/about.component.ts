import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';

import { scrollToTop } from './../../../helpers/helpers-function';

@Component({
    selector: "app-about",
    templateUrl: "./about.component.html",
    styleUrls: ["./about.component.css"]
})
export class AboutComponent implements OnInit {
    constructor(
        public dialogRef: MatDialogRef<AboutComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any,
        public dialog: MatDialog
    ) { }

    ngOnInit() {
        scrollToTop();
    }

    closeModal() {
        this.dialogRef.close();
    }
}
