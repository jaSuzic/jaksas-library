import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

import { User } from './../../../models/user.model';
import { AuthService } from './../../../services/auth.service';
import { UserService } from './../../../services/user.service';
import { ConfirmationModalComponent } from './../confirmation-modal/confirmation-modal.component';

@Component({
    selector: "app-edit-user",
    templateUrl: "./edit-user.component.html",
    styleUrls: ["./edit-user.component.css"]
})
export class EditUserComponent implements OnInit {
    isLoading = false;
    form: FormGroup;
    imagePreview: string;
    user: User;

    constructor(
        public dialogRef: MatDialogRef<EditUserComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any,
        public dialog: MatDialog,
        private authService: AuthService,
        private userService: UserService,
        private snackBar: MatSnackBar
    ) { }

    ngOnInit() {
        this.form = new FormGroup({
            email: new FormControl(null, Validators.required),
            firstName: new FormControl(null, Validators.required),
            lastName: new FormControl(null, Validators.required),
            position: new FormControl(null, Validators.required),
            image: new FormControl(null, Validators.required)
        });
        this.form.get('email').disable();
        this.user = this.authService.getUser();
        if (this.data) {
            this.form.setValue({
                email: this.data.email,
                firstName: this.data.firstName,
                lastName: this.data.lastName,
                position: this.data.position,
                image: this.data.image ? this.data.image : null
            });
            if (this.data.image) {
                this.imagePreview = this.data.image;
            }
        }
    }

    onImagePicked(e: Event) {
        const file = (e.target as HTMLInputElement).files[0];
        if (file.size < 2 * 1024 * 1024) {
            this.form.get("image").patchValue({ image: file });
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

    delete() {
        const dialogRef = this.dialog.open(ConfirmationModalComponent, {
            width: "200px",
            data: "Are you sure you want to delete this user???"
        });
        const subscription = dialogRef.afterClosed().subscribe(result => {
            if (result) {
                this.userService.deleteUser(this.data.id).subscribe(
                    res => {
                        this.snackBar.open("User deleted", null, {
                            duration: 5000,
                            panelClass: ["correct-snackbar"]
                        });
                        this.userService.usersUpdated();
                        this.dialogRef.close();
                    },
                    err => {
                        this.snackBar.open("There was error: " + err.message, null, {
                            duration: 8000,
                            panelClass: ["warning-snackbar"]
                        });
                        console.log("NOT ok", err);
                    }
                );
            }
        });
    }

    save() {
        this.isLoading = true;
        const id = this.data.id;
        const firstName = this.form.value.firstName;
        const lastName = this.form.value.lastName;
        const email = this.form.value.email;
        const position = this.form.value.position;
        let image;
        if (this.form.value.image) {
            if (typeof this.form.value.image === "object") {
                image = this.form.value.image.image;
            } else {
                image = this.form.value.image;
            }
        }
        this.userService
            .updateUser(id, firstName, lastName, email, position, image)
            .subscribe(
                res => {
                    this.snackBar.open("User updated", null, {
                        duration: 5000,
                        panelClass: ["correct-snackbar"]
                    });
                    this.userService.usersUpdated();
                    this.dialogRef.close();
                    this.isLoading = false;
                },
                err => {
                    console.log(err);
                    this.snackBar.open("There was error: " + err.message, null, {
                        duration: 8000,
                        panelClass: ["warning-snackbar"]
                    });
                    this.isLoading = false;
                }
            );
    }
}
