import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material';

import { AuthService } from './../../../services/auth.service';
import { ConfirmationModalComponent } from './../confirmation-modal/confirmation-modal.component';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit {

  form: FormGroup;
  imagePreview: string;

  constructor(
    public dialogRef: MatDialogRef<EditUserComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialog: MatDialog,
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.form = new FormGroup({
      email: new FormControl(null, Validators.required),
      firstName: new FormControl(null, Validators.required),
      lastName: new FormControl(null, Validators.required),
      position: new FormControl(null, Validators.required),
      image: new FormControl(null, Validators.required)
    })
    if (this.data) {
      this.form.setValue({
        email: this.data.email,
        firstName: this.data.firstName,
        lastName: this.data.lastName,
        position: this.data.position,
        image: this.data.image ? this.data.image : null
      })
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
        // this.authService.deleteUser(this.data.id).subscribe(
        //   res => {
        //     this.authService.usersUpdated();
        //     this.dialogRef.close();
        //   },
        //   err => {
        //     console.log("NOT ok");
        //   }
        // );
      }
    });
  }

}
