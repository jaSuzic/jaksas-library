import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material';
import { User } from 'src/app/models/user.model';

import { AuthService } from './../../../services/auth.service';
import { UserService } from './../../../services/user.service';
import { ConfirmationModalComponent } from './../confirmation-modal/confirmation-modal.component';

@Component({
  selector: "app-edit-user",
  templateUrl: "./edit-user.component.html",
  styleUrls: ["./edit-user.component.css"]
})
export class EditUserComponent implements OnInit {
  form: FormGroup;
  imagePreview: string;
  user: User;

  constructor(
    public dialogRef: MatDialogRef<EditUserComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialog: MatDialog,
    private authService: AuthService,
    private userService: UserService
  ) {}

  ngOnInit() {
    this.form = new FormGroup({
      email: new FormControl(null, Validators.required),
      firstName: new FormControl(null, Validators.required),
      lastName: new FormControl(null, Validators.required),
      position: new FormControl(null, Validators.required),
      image: new FormControl(null, Validators.required)
    });
    this.user = this.authService.getUser();
    if (this.data) {
      this.form.setValue({
        email: this.data.email,
        firstName: this.data.firstName,
        lastName: this.data.lastName,
        position: this.data.position,
        image: this.data.image ? this.data.image : null
      });
    }
    this.imagePreview = this.data.image;
  }

  onImagePicked(e: Event) {
    const file = (event.target as HTMLInputElement).files[0];
    this.form.get("image").patchValue({ image: file });
    this.form.get("image").updateValueAndValidity();
    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result as string;
    };
    reader.readAsDataURL(file);
  }

  delete() {
    // this.bookService.deleteBook(this.data.id);
    const dialogRef = this.dialog.open(ConfirmationModalComponent, {
      width: "200px",
      data: "Are you sure you want to delete this user???"
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.userService.deleteUser(this.data.id).subscribe(
          res => {
            this.userService.usersUpdated();
            this.dialogRef.close();
          },
          err => {
            console.log("NOT ok");
          }
        );
      }
    });
  }

  save() {}
}
