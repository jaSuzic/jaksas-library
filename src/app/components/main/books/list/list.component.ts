import { SafeUrl } from '@angular/platform-browser';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

import { AddEditComponent } from '../../../modals/add-edit-book/add-edit.component';
import { CommonService } from './../../../../services/common.service';
import { Book } from './../../../../models/book.model';
import { BookService } from './../../../../services/book.service';

@Component({
    selector: 'app-list',
    templateUrl: './list.component.html',
    styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
    books: Book[] = [];
    titleSearch: string;
    authorSearch: string;
    sortBy: string = 'title: 1';
    items = [
        { key: 'author: 1', value: 'Authors ▼' },
        { key: 'author: -1', value: 'Authors ▲' },
        { key: 'title: 1', value: 'Title ▼' },
        { key: 'title: -1', value: 'Title ▲' }
    ];
    length: number;
    pageSize: number = 5;
    pageIndex: number = 0;
    pageSizeOptions: number[] = [5, 10, 20, 50];
    isLoading = false;
    imageMap: Map<string, SafeUrl>;
    filterChanged: Subject<string> = new Subject();

    constructor(
        private bookService: BookService,
        public dialog: MatDialog,
        private commonService: CommonService
    ) { }

    ngOnInit() {
        this.bookService.getBooksStatus().subscribe((res) => {
            if (res) this.callSearch();
        });

        this.imageMap = new Map();

        this.filterChanged
            .pipe(debounceTime(500), distinctUntilChanged())
            .subscribe(() => this.callSearch());
    }

    onFilterChange(val: any) {
        this.filterChanged.next(val)
    }

    clearTitle() {
        this.titleSearch = '';
        this.callSearch();
    }

    clearAuthor() {
        this.authorSearch = '';
        this.callSearch();
    }

    callSearch() {
        this.isLoading = true;
        let paramsForSending: string = '';
        if (this.titleSearch) {
            this.titleSearch = this.titleSearch.trim();
            const titleSuffix = paramsForSending.length > 0 ? `&title=${this.titleSearch}` : `title=${this.titleSearch}`
            paramsForSending = paramsForSending + titleSuffix;
        }
        if (this.authorSearch) {
            this.authorSearch = this.authorSearch.trim();
            const authorSuffix = paramsForSending.length > 0 ? `&author=${this.authorSearch}` : `author=${this.authorSearch}`
            paramsForSending = paramsForSending + authorSuffix;
        }
        this.bookService
            .getBooks(
                this.sortBy,
                this.pageSize,
                this.pageIndex * this.pageSize,
                paramsForSending
            )
            .subscribe((res) => {
                this.isLoading = false;
                this.books = res.books;
                this.length = res.count;
            });
    }

    editBook(book: Book) {
        const dialogRef = this.dialog.open(AddEditComponent, {
            width: '550px',
            data: {
                edit: true,
                title: book.title,
                author: book.author,
                year: book.year,
                id: book.id,
                image: book.imagePath ? book.imagePath : undefined
            },
            disableClose: true
        });
    }
    changePagination(e: any) {
        this.pageSize = e.pageSize;
        this.pageIndex = e.pageIndex;
        this.callSearch();
    }

    generateBookImageUrl(imagePath: string) {
        return imagePath.length ? imagePath : 'assets/noImage.png'
    }
}
