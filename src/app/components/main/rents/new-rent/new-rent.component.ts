import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DateAdapter, MAT_DATE_FORMATS, MatSnackBar, MatStepper } from '@angular/material';
import { Book } from 'src/app/models/book.model';
import { Member } from 'src/app/models/member.model';
import { RentService } from 'src/app/services/rent.service';

import { APP_DATE_FORMATS, AppDateAdapter } from './../../../../helpers/format-datepicker';

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
  ) {}

  ngOnInit() {
    this.memberForm = new FormGroup({
      memberId: new FormControl("", Validators.required)
    });
    this.bookForm = new FormGroup({
      bookId: new FormControl("", Validators.required)
    });
  }

  choseMember(row) {
    this.chosenMember = {
      firstName: row.name,
      lastName: row.lastName,
      birthDate: row.birthDate,
      _id: row._id
    };
    this.memberForm.get("memberId").setValue(row._id);
  }
  choseBook(book) {
    this.chosenBook = book;
    this.bookForm.get("bookId").setValue(book._id);
  }

  saveRent() {
    let rentDate = {
      bookId: this.chosenBook._id,
      memberId: this.chosenMember._id,
      chosenDate: this.chosenDate
    };
    this.rentService
      .saveRent(this.chosenMember._id, this.chosenBook._id, this.chosenDate)
      .subscribe(
        res => {
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
