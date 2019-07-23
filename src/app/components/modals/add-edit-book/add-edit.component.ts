import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material';
import { Router } from '@angular/router';

import { BookService } from '../../../services/book.service';
import { ConfirmationModalComponent } from '../confirmation-modal/confirmation-modal.component';

@Component({
  selector: "app-add-edit",
  templateUrl: "./add-edit.component.html",
  styleUrls: ["./add-edit.component.css"]
})
export class AddEditComponent implements OnInit {
  title: string;
  author: string;
  year: number;

  constructor(
    public dialogRef: MatDialogRef<AddEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private bookService: BookService,
    private router: Router,
    public dialog: MatDialog
  ) {}

  ngOnInit() {}

  save() {
    if (this.data.edit) {
      this.bookService
        .updateBook(
          this.data.id,
          this.data.title,
          this.data.author,
          this.data.year
        )
        .subscribe(
          res => {
            this.bookService.booksUpdated();
            this.dialogRef.close();
          },
          err => {
            console.log("There was error: ", err);
          }
        );
    } else {
      this.bookService
        .saveBook(this.data.title, this.data.author, this.data.year)
        .subscribe(
          res => {
            this.router.navigate(["/books"]);
            this.bookService.booksUpdated();
            this.dialogRef.close();
          },
          err => {
            //do something with error
          }
        );
    }
    //try save if success then this.dialogRef.close(); if not display message
  }

  delete() {
    // this.bookService.deleteBook(this.data.id);
    const dialogRef = this.dialog.open(ConfirmationModalComponent, {
      width: "200px",
      data: "Are you sure you want to delete this book???"
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.bookService.deleteBook(this.data.id).subscribe(
          res => {
            this.bookService.booksUpdated();
            this.dialogRef.close();
          },
          err => {
            console.log("NOT ok");
          }
        );
      }
    });
  }
}
