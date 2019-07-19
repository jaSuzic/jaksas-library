import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { DateAdapter, MAT_DATE_FORMATS } from '@angular/material';
import { Book } from 'src/app/models/book.model';
import { Member } from 'src/app/models/member.model';

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

  constructor(private fb: FormBuilder) {}

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
}
