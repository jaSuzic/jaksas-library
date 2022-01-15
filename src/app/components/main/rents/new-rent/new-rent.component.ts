import { DateAdapter, MAT_DATE_FORMATS } from '@angular/material/core';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { Book } from './../../../../models/book.model';
import { Member } from './../../../../models/member.model';
import { RentService } from './../../../../services/rent.service';
import { APP_DATE_FORMATS, AppDateAdapter } from './../../../../helpers/format-datepicker';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatStepper } from '@angular/material/stepper';

@Component({
    selector: "app-new-rent",
    templateUrl: "./new-rent.component.html",
    styleUrls: ["./new-rent.component.css"],
    providers: [
        { provide: DateAdapter, useClass: AppDateAdapter },
        { provide: MAT_DATE_FORMATS, useValue: APP_DATE_FORMATS }
    ]
})
export class NewRentComponent implements OnInit {
    chosenMember: Member;
    chosenBook: Book;
    chosenDate: Date = new Date();
    memberForm: FormGroup;
    bookForm: FormGroup;
    resetPaginator = false;

    @ViewChild(MatStepper, { static: false }) stepper: MatStepper;

    constructor(
        private rentService: RentService,
        private snackBar: MatSnackBar
    ) { }

    ngOnInit() {
        this.memberForm = new FormGroup({
            memberId: new FormControl("", Validators.required)
        });
        this.bookForm = new FormGroup({
            bookId: new FormControl("", Validators.required)
        });
    }

    choseMember(row: Member) {
        this.chosenMember = {
            firstName: row.firstName,
            lastName: row.lastName,
            birthDate: row.birthDate,
            id: row.id
        };

        this.memberForm.get("memberId").setValue(row.id);
    }
    choseBook(book: Book) {
        this.chosenBook = book;
        this.bookForm.get("bookId").setValue(book.id);
    }

    saveRent() {
        this.rentService
            .saveRent(this.chosenMember.id, this.chosenBook.id, this.chosenDate)
            .subscribe({
                next: res => {
                    this.resetPaginator = true;
                    this.chosenBook = undefined;
                    this.chosenMember = undefined;
                    this.chosenDate = new Date();
                    this.stepper.reset();
                    this.snackBar.open("New rent created", null, {
                        duration: 5000,
                        panelClass: ["correct-snackbar"]
                    });
                },
                error: err => {
                    console.log(err);
                    this.snackBar.open("There was error: " + err.message, null, {
                        duration: 8000,
                        panelClass: ["warning-snackbar"]
                    });
                }
            });
    }
}
