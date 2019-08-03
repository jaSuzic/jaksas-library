import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { User } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth.service';

import { UserService } from './../../../../services/user.service';

@Component({
  selector: "app-change-image",
  templateUrl: "./change-image.component.html",
  styleUrls: ["./change-image.component.css"]
})
export class ChangeImageComponent implements OnInit {
  imagePreview;
  user: User;
  imageFormControl = new FormControl(null, [Validators.required]);
  constructor(
    private authService: AuthService,
    private userService: UserService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.user = this.authService.getUser();
  }

  onImageChange(e: Event) {
    const file = (event.target as HTMLInputElement).files[0];
    this.imageFormControl.patchValue({ image: file });
    this.imageFormControl.updateValueAndValidity();
    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result as string;
    };
    reader.readAsDataURL(file);
  }

  sendNewImage() {
    const file = this.imageFormControl.value.image;
    this.userService.changeImage(this.user._id, file).subscribe(
      res => {
        this.snackBar.open("Image updated, please login again", null, {
          duration: 5000,
          panelClass: ["correct-snackbar"]
        });
        this.authService.logout();
      },
      err => {
        console.log(err);
        this.snackBar.open("There was error: " + err.message, null, {
          duration: 8000,
          panelClass: ["warning-snackbar"]
        });
      }
    );
  }
}
