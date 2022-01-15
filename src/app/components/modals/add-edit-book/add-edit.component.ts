import { SafeUrl } from '@angular/platform-browser';
import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';

import { CommonService } from './../../../services/common.service';
import { BookService } from '../../../services/book.service';
import { ConfirmationModalComponent } from '../confirmation-modal/confirmation-modal.component';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
    selector: "app-add-edit",
    templateUrl: "./add-edit.component.html",
    styleUrls: ["./add-edit.component.css"]
})
export class AddEditComponent implements OnInit {
    isLoading = false;
    form: FormGroup;
    imagePreview: string;
    coverImage: SafeUrl;

    constructor(
        public dialogRef: MatDialogRef<AddEditComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any,
        private bookService: BookService,
        private router: Router,
        public dialog: MatDialog,
        private snackBar: MatSnackBar,
        private commonService: CommonService
    ) { }

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
                    image: this.data.image ? this.data.image : null
                });
                if (this.data.image) {
                    this.coverImage = this.data.image
                }
            }
        }
        console.log("Jaksa data: ", this.data);


        if (this.data.image) {
            this.commonService.getImage(this.data.image).then((image: SafeUrl) => {
                this.coverImage = image;
            })
        }
    }

    save() {
        this.isLoading = true;
        if (this.data.edit) {
            console.log(this.form.value.image);
            this.bookService
                .updateBook(
                    this.data.id,
                    this.form.value.title,
                    this.form.value.author,
                    this.form.value.year,
                    this.form.value.image
                )
                .subscribe(
                    res => {
                        this.dialogRef.close();
                        this.bookService.booksUpdated();
                        this.isLoading = false;
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
                    this.form.value.year,
                    this.form.value.image ? this.form.value.image : null
                )
                .subscribe(
                    res => {
                        this.router.navigate(["/books"]);
                        this.bookService.booksUpdated();
                        this.dialogRef.close();
                        this.isLoading = false;
                    },
                    err => {
                        console.log("Error: ", err);
                    }
                );
        }
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
                        console.log("NOT ok", err);
                    }
                );
            }
        });
    }

    onImagePicked(e: Event) {
        const file: File | null = (e.target as HTMLInputElement).files![0];
        if (file.size < 2 * 1024 * 1024) {
            this.form.patchValue({ image: file });
            this.form.get("image").updateValueAndValidity();
            const reader = new FileReader();
            reader.onload = () => {
                this.imagePreview = reader.result as string;
            };
            reader.readAsDataURL(file);
        } else {
            this.snackBar.open("Upload failed, file size to large (max 2Mb)", null, {
                duration: 5000,
                panelClass: ["warning-snackbar"]
            });
        }
    }
}
