import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-register-user',
  templateUrl: './register-user.component.html',
  styleUrls: ['./register-user.component.css']
})
export class RegisterUserComponent implements OnInit {

  userGroup: FormGroup;
  imagePreview;
  user: User;

  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.user = this.authService.getUser();
    this.userGroup = new FormGroup({
      firstName: new FormControl(null, Validators.required),
      lastName: new FormControl(null, Validators.required),
      email: new FormControl(null, Validators.required),
      password: new FormControl(null, Validators.required),
      position: new FormControl(null, Validators.required),
      image: new FormControl(null),
    })
  }

  onImageChange(e: Event) {
    const file = (event.target as HTMLInputElement).files[0];
    this.userGroup.get('image').patchValue({ image: file });
    this.userGroup.get('image').updateValueAndValidity();
    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result as string;
    };
    reader.readAsDataURL(file);
  }

  registerUser() {
    const email = this.userGroup.value.email;
    const password = this.userGroup.value.password;
    const firstName = this.userGroup.value.firstName;
    const lastName = this.userGroup.value.lastName;
    const position = this.userGroup.value.position;
    const image = this.userGroup.value.image ? this.userGroup.value.image.image : null;
    this.authService.createUser(email, password, firstName, lastName, position, image).subscribe(
      res => {
        console.log(res)
      },
      err => {
        console.log(err)
      }
    )
  }

}
