import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';

import { AddEditComponent } from '../../../modals/add-edit-book/add-edit.component';
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
  length: number;
  pageSize: number = 10;
  pageIndex: number = 0;
  pageSizeOptions: number[] = [2, 5, 10, 20, 50];

  constructor(private bookService: BookService, public dialog: MatDialog) {}

  ngOnInit() {
    this.callSearch();

    this.bookService.getBooksStatus().subscribe(res => {
      if (res) this.callSearch();
    });
  }

  titleValueChange() {
    console.log("triggered title");
    this.callSearch({ key: "title", value: this.titleSearch });
    this.authorSearch = "";
  }
  clearTitle() {
    this.titleSearch = "";
    this.callSearch();
  }

  authorValueChange() {
    console.log("triggered author");
    this.callSearch({ key: "author", value: this.authorSearch });
    this.titleSearch = "";
  }
  clearAuthor() {
    this.authorSearch = "";
    this.callSearch();
  }

  callSearch(params?: { key: string; value: string }) {
    let paramsForSending: string = "";
    if (params) {
      paramsForSending = params.key + "=" + params.value;
    }
    this.bookService
      .getBooks(this.sortBy, this.pageSize, this.pageIndex, paramsForSending)
      .subscribe(res => {
        console.log("evo resa: ", res);
        this.books = res.books;
        this.length = res.count;
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

  rentBook(book) {}

  editBook(book) {
    const dialogRef = this.dialog.open(AddEditComponent, {
      data: {
        edit: true,
        title: book.title,
        author: book.author,
        year: book.year,
        id: book._id
      },
      disableClose: true
    });

    dialogRef.afterClosed().subscribe(res => {
      console.log(res);
    });
  }
  changePagination(e) {
    console.log(e);
    this.pageSize = e.pageSize;
    this.pageIndex = e.pageIndex;
    //pageIndex - broj strane
    //pageSize - koliko po strani
    if (this.titleSearch) {
      this.titleValueChange();
    } else if (this.authorSearch) {
      this.authorValueChange();
    } else this.callSearch();
  }
}
