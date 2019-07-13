import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

import { Book } from './../models/book.model';

const BACKEND_URL = environment.apiUrl + "/books/";

@Injectable({
  providedIn: "root"
})
export class BookService {
  constructor(private http: HttpClient, private router: Router) {}

  getBooks() {
    return this.http.get<{ message: string; books: Book[]; count: number }>(
      BACKEND_URL
    );
  }
}
