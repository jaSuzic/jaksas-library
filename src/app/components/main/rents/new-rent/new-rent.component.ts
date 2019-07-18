import { Component, OnInit } from '@angular/core';
import { Book } from 'src/app/models/book.model';
import { Member } from 'src/app/models/member.model';

@Component({
  selector: "app-new-rent",
  templateUrl: "./new-rent.component.html",
  styleUrls: ["./new-rent.component.css"]
})
export class NewRentComponent implements OnInit {
  chosenMember: Member;
  chosenBook: Book;

  constructor() {}

  ngOnInit() {}

  choseMember(row) {
    this.chosenMember = {
      firstName: row.name,
      lastName: row.lastName,
      birthDate: row.birthDate,
      _id: row._id
    };
  }
  choseBook(book) {
    this.chosenBook = book;
  }
}
