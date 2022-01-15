import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

import { User } from './../../../../models/user.model';
import { AuthService } from './../../../../services/auth.service';
import { UserService } from './../../../../services/user.service';

@Component({
    selector: "app-register-user",
    templateUrl: "./register-user.component.html",
    styleUrls: ["./register-user.component.css"]
})
export class RegisterUserComponent implements OnInit {
    userGroup: FormGroup;
    imagePreview: string;
    user: User;
    isLoading = false;

    constructor(
        private authService: AuthService,
        private snackBar: MatSnackBar,
        private userService: UserService
    ) { }

    ngOnInit() {
        this.user = this.authService.getUser();
        this.userGroup = new FormGroup({
            firstName: new FormControl(null, Validators.required),
            lastName: new FormControl(null, Validators.required),
            email: new FormControl(null, Validators.required),
            password: new FormControl(null, Validators.required),
            position: new FormControl(null, Validators.required),
            image: new FormControl(null)
        });
    }

    onImageChange(e: Event) {
        const file = (event.target as HTMLInputElement).files[0];
        if (file.size < 2 * 1024 * 1024) {
            this.userGroup.get("image").patchValue({ image: file });
            this.userGroup.get("image").updateValueAndValidity();
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

    registerUser() {
        this.isLoading = true;
        const email = this.userGroup.value.email;
        const password = this.userGroup.value.password;
        const firstName = this.userGroup.value.firstName;
        const lastName = this.userGroup.value.lastName;
        const position = this.userGroup.value.position;
        const image = this.userGroup.value.image
            ? this.userGroup.value.image.image
            : null;
        this.userService
            .createUser(email, password, firstName, lastName, position, image)
            .subscribe(
                res => {
                    this.snackBar.open("User created", null, {
                        duration: 5000,
                        panelClass: ["correct-snackbar"]
                    });
                    this.userService.usersUpdated();
                    this.isLoading = false;
                    this.imagePreview = null;
                },
                err => {
                    console.log("Error: ", err);
                    this.snackBar.open("There was error: " + err.message, null, {
                        duration: 8000,
                        panelClass: ["warning-snackbar"]
                    });
                    this.isLoading = false;
                }
            );
    }
}
