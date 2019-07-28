import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { User } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: "app-change-image",
  templateUrl: "./change-image.component.html",
  styleUrls: ["./change-image.component.css"]
})
export class ChangeImageComponent implements OnInit {
  imagePreview;
  user: User;
  imageFormControl = new FormControl(null, [Validators.required]);
  constructor(private authService: AuthService) { }

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
    this.authService.changeImage(this.user._id, file).subscribe(res => {
      this.authService.logout();
    }, err => {
      console.log(err)
    });
  }
}
