import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

import { Book } from './../../../../models/book.model';
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

    @Input() set resetPagination(value: boolean) {
        if (value) {
            if (this.dataSourceBook) {
                if (this.dataSourceBook.paginator) {
                    this.dataSourceBook.paginator.firstPage();
                }
            }
        }
    }
    @Output() selectedBook = new EventEmitter<Book>();
    @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
    @ViewChild(MatSort, { static: true }) sort: MatSort;

    constructor(private bookService: BookService) { }

    ngOnInit() {
        this.bookService.getBooks("title: 1", 1000, 0).subscribe(res => {
            this.dataSourceBook = new MatTableDataSource(res.books);
            this.dataSourceBook.paginator = this.paginator;
            this.dataSourceBook.sort = this.sort;
        });
    }

    applyBookFilter(event: Event) {
        this.dataSourceBook.filter = (event.target as HTMLTextAreaElement).value.trim().toLowerCase();

        if (this.dataSourceBook.paginator) {
            this.dataSourceBook.paginator.firstPage();
        }
    }

    selectBook(row: Book) {
        this.selectedBook.emit(row);
    }
}
