import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

import { Book } from './../models/book.model';

const BACKEND_URL = environment.apiUrl + "/books";

@Injectable({
  providedIn: "root"
})
export class BookService {
  constructor(private http: HttpClient, private router: Router) {}

  getBooks(sort: string, filter?: string) {
    let params = filter ? filter : "";
    let sortParams = sort.split(": ");
    console.log("evo ga sortParams: ", sortParams);
    let url =
      BACKEND_URL +
      "?" +
      params +
      "&sortItem=" +
      sortParams[0] +
      "&order=" +
      sortParams[1];
    console.log("evo ga novi URL: ", url);

    return this.http.get<{ message: string; books: Book[]; count: number }>(
      url
    );
  }
}
