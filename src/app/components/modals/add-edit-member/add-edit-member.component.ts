import { Component, Inject, OnInit } from '@angular/core';
import { DateAdapter, MAT_DATE_FORMATS } from '@angular/material/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';

import { APP_DATE_FORMATS, AppDateAdapter } from './../../../helpers/format-datepicker';
import { MemberService } from './../../../services/member.service';
import { ConfirmationModalComponent } from './../confirmation-modal/confirmation-modal.component';

@Component({
    selector: "app-add-edit-member",
    templateUrl: "./add-edit-member.component.html",
    styleUrls: ["./add-edit-member.component.css"],
    providers: [
        { provide: DateAdapter, useClass: AppDateAdapter },
        { provide: MAT_DATE_FORMATS, useValue: APP_DATE_FORMATS }
    ]
})
export class AddEditMemberComponent implements OnInit {
    constructor(
        public dialogRef: MatDialogRef<AddEditMemberComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any,
        private memberService: MemberService,
        private router: Router,
        public dialog: MatDialog
    ) { }

    ngOnInit() { }

    save() {
        if (this.data.edit) {
            this.memberService
                .updateMember(
                    this.data.id,
                    this.data.firstName,
                    this.data.lastName,
                    this.data.birthDate
                )
                .subscribe(
                    res => {
                        this.memberService.membersUpdated();
                        this.dialogRef.close();
                    },
                    err => {
                        console.log("There was error: ", err);
                    }
                );
        } else {
            this.memberService
                .saveMember(
                    this.data.firstName,
                    this.data.lastName,
                    this.data.birthDate
                )
                .subscribe(
                    res => {
                        this.router.navigate(["/members"]);
                        this.memberService.membersUpdated();
                        this.dialogRef.close();
                    },
                    err => {
                        //do something with error
                    }
                );
        }
        //try save if success then this.dialogRef.close(); if not display message
    }

    delete() {
        // this.memberService.deleteMember(this.data.id);
        const dialogRef = this.dialog.open(ConfirmationModalComponent, {
            width: "300px",
            data: "Are you sure you want to remove this member???"
        });
        dialogRef.afterClosed().subscribe(result => {
            if (result) {
                this.memberService.deleteMember(this.data.id).subscribe(
                    res => {
                        this.memberService.membersUpdated();
                        this.dialogRef.close();
                    },
                    err => {
                        console.log("NOT ok");
                    }
                );
            }
        });
    }
}
