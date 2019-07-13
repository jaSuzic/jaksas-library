import { Component, OnInit } from '@angular/core';

import { BookService } from './../../../../services/book.service';

@Component({
  selector: "app-list",
  templateUrl: "./list.component.html",
  styleUrls: ["./list.component.css"]
})
export class ListComponent implements OnInit {
  constructor(private bookService: BookService) {}

  ngOnInit() {
    this.bookService.getBooks().subscribe(res => {
      console.log("Evo resa: ", res);
    });
  }
}
