import { Component, OnInit } from '@angular/core';

import { Book } from './../../../../models/book.model';
import { BookService } from './../../../../services/book.service';

@Component({
  selector: "app-list",
  templateUrl: "./list.component.html",
  styleUrls: ["./list.component.css"]
})
export class ListComponent implements OnInit {
  books: Book[] = [];
  titleSearch: string;
  authorSearch: string;
  sortBy: string = "title: 1";
  items = [
    { key: "author: 1", value: "Authors ▼" },
    { key: "author: -1", value: "Authors ▲" },
    { key: "title: 1", value: "Title ▼" },
    { key: "title: -1", value: "Title ▲" }
  ];

  constructor(private bookService: BookService) {}

  ngOnInit() {
    this.bookService.getBooks(this.sortBy).subscribe(res => {
      this.books = res.books;
      console.log("Evo resa: ", res);
    });
  }

  titleValueChange() {
    console.log("triggered title");
    this.callSearch({ key: "title", value: this.titleSearch });
  }

  authorValueChange() {
    console.log("triggered author");
    this.callSearch({ key: "author", value: this.authorSearch });
  }

  callSearch(params?: { key: string; value: string }) {
    let paramsForSending: string = "";
    if (params) {
      paramsForSending = params.key + "=" + params.value;
    }
    this.bookService.getBooks(this.sortBy, paramsForSending).subscribe(res => {
      this.books = res.books;
    });
  }
  sortChange(e) {
    console.log(e);
    let field = e.value.split(": ")[0];
    let order = +e.value.split(": ")[1];

    if (order > 0) {
      this.books.sort((a, b) =>
        a[field] > b[field] ? 1 : b[field] > a[field] ? -1 : 0
      );
    } else {
      this.books.sort((a, b) =>
        a[field] < b[field] ? 1 : b[field] < a[field] ? -1 : 0
      );
    }

    this.sortBy = e.value;
  }
}
