import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';

import { Book } from './../models/book.model';

const BACKEND_URL = environment.apiUrl + "/books";

@Injectable({
    providedIn: "root"
})
export class BookService {
    constructor(private http: HttpClient, private router: Router) { }

    private booksStatus = new BehaviorSubject([]);

    getBooks(sort: string, pageSize: number, offset: number, filter?: string) {
        let params = filter ? filter : "";
        let sortParams = sort.split(": ");
        const order = +sortParams[1] === 1 ? 'ASC' : 'DESC';
        let url =
            BACKEND_URL +
            "?" +
            params +
            "&sortItem=" +
            sortParams[0] +
            "&order=" +
            order +
            "&offset=" +
            offset +
            "&limit=" +
            pageSize;

        return this.http.get<{ message: string; books: Book[]; count: number }>(
            url
        );
    }

    saveBook(title: string, author: string, year: number, image: File) {
        const newBook = new FormData();
        newBook.append("title", title);
        newBook.append("author", author);
        newBook.append("year", year.toString());
        if (image) {
            newBook.append("image", image);
        }
        return this.http.post<{ message: string }>(BACKEND_URL, newBook);
    }

    deleteBook(id: string) {
        return this.http.delete(BACKEND_URL + "/" + id);
    }

    updateBook(
        id: string,
        title: string,
        author: string,
        year: number,
        image: File | string
    ) {
        const newBook = new FormData();
        newBook.append("title", title);
        newBook.append("author", author);
        newBook.append("year", year.toString());
        if (image) {
            newBook.append("image", image);
        }
        return this.http.patch(BACKEND_URL + "/" + id, newBook);
    }

    booksUpdated() {
        this.booksStatus.next([]);
    }

    getBooksStatus() {
        return this.booksStatus.asObservable();
    }
}
