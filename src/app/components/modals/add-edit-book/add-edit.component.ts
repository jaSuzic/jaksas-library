import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
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
  form: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<AddEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private bookService: BookService,
    private router: Router,
    public dialog: MatDialog
  ) {}

  ngOnInit() {
    this.form = new FormGroup({
      title: new FormControl(null, Validators.required),
      author: new FormControl(null, Validators.required),
      year: new FormControl(null, Validators.required),
      image: new FormControl(null)
    });
    if (this.data) {
      if (this.data.edit) {
        this.form.setValue({
          title: this.data.title,
          author: this.data.author,
          year: this.data.year,
          image: this.data.image
        });
      }
    }
  }

  save() {
    if (this.data.edit) {
      this.bookService
        .updateBook(
          this.data.id,
          this.form.value.title,
          this.form.value.author,
          this.form.value.year
          // this.form.value.image
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
        .saveBook(
          this.form.value.title,
          this.form.value.author,
          this.form.value.year
          // this.form.value.image
        )
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

  onImagePicked(e: Event) {
    const file = (event.target as HTMLInputElement).files[0];
    this.form.patchValue({ image: file });
    this.form.get("image").updateValueAndValidity();
    console.log(file);
    console.log(this.form);
  }
}
