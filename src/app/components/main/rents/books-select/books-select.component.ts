import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { Book } from 'src/app/models/book.model';

import { BookService } from './../../../../services/book.service';

@Component({
  selector: "app-books-select",
  templateUrl: "./books-select.component.html",
  styleUrls: ["./books-select.component.css"]
})
export class BooksSelectComponent implements OnInit {
  displayedColumns: string[] = ["title", "author", "year", "btnSelect"];
  dataSourceBook: MatTableDataSource<Book>;
  isLoading = false;

  @Output() selectedBook = new EventEmitter<Book>();
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(private bookService: BookService) {}

  ngOnInit() {
    this.bookService.getBooks("title: 1", 1000, 0).subscribe(res => {
      this.dataSourceBook = new MatTableDataSource(res.books);
      this.dataSourceBook.paginator = this.paginator;
      this.dataSourceBook.sort = this.sort;
    });
  }

  applyBookFilter(filterValue: string) {
    this.dataSourceBook.filter = filterValue.trim().toLowerCase();

    if (this.dataSourceBook.paginator) {
      this.dataSourceBook.paginator.firstPage();
    }
  }
  selectBook(row) {
    this.selectedBook.emit(row);
  }
}
