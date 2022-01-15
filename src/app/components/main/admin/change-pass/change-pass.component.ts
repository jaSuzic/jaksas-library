import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

import { User } from './../../../../models/user.model';
import { AuthService } from './../../../../services/auth.service';
import { UserService } from './../../../../services/user.service';

@Component({
    selector: 'app-change-pass',
    templateUrl: './change-pass.component.html',
    styleUrls: ['./change-pass.component.css']
})
export class ChangePassComponent implements OnInit {
    passGroup: FormGroup;
    user: User;

    constructor(
        private authService: AuthService,
        private userService: UserService,
        private snackBar: MatSnackBar
    ) { }

    ngOnInit() {
        this.user = this.authService.getUser();
        this.passGroup = new FormGroup({
            oldPass: new FormControl(null, Validators.required),
            newPass: new FormControl(null, Validators.required),
            confirmPass: new FormControl(null, Validators.required)
        });
        console.log(this.user);
    }

    sendNewPass() {
        if (
            this.passGroup.get('newPass').value !==
            this.passGroup.get('confirmPass').value
        ) {
            this.passGroup.get('newPass').setErrors({ notSame: true });
            this.passGroup.get('confirmPass').setErrors({ notSame: true });
            return;
        } else {
            this.passGroup.get('newPass').setErrors({ notSame: false });
            this.passGroup.get('confirmPass').setErrors({ notSame: false });
        }

        let newPass = this.passGroup.get('newPass').value;
        let oldPass = this.passGroup.get('oldPass').value;
        let email = this.user.email;
        this.userService.changePass(email, oldPass, newPass).subscribe(
            (res) => {
                if (res.message === 'success') {
                    this.snackBar.open(
                        'Pass updated, please login with new pass',
                        null,
                        {
                            duration: 5000,
                            panelClass: ['correct-snackbar']
                        }
                    );
                    this.authService.logout();
                } else {
                    this.snackBar.open(
                        'There was error: ' + res.message,
                        null,
                        {
                            duration: 8000,
                            panelClass: ['warning-snackbar']
                        }
                    );
                    console.log(res.message);
                }
            },
            (err) => {
                this.snackBar.open('There was error: ' + err.message, null, {
                    duration: 8000,
                    panelClass: ['warning-snackbar']
                });
                console.log(err);
            }
        );
    }
}
