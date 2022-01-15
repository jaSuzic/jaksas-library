import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';

import { AuthService } from './../../../services/auth.service';
import { AboutComponent } from './../../modals/about/about.component';
@Component({
    selector: "app-login",
    templateUrl: "./login.component.html",
    styleUrls: ["./login.component.css"]
})
export class LoginComponent implements OnInit {
    loginForm: FormGroup;
    isLoading = false;
    constructor(private authService: AuthService, public dialog: MatDialog) { }

    ngOnInit() {
        this.loginForm = new FormGroup({
            email: new FormControl(null, [Validators.email, Validators.required]),
            password: new FormControl(null, [Validators.required])
        });
    }

    onLogin() {
        if (this.loginForm.invalid) return;
        this.isLoading = true;
        this.authService
            .loginUser(this.loginForm.value.email, this.loginForm.value.password)
            .subscribe(
                res => {
                    if (res) {
                        this.authService.processLogin(res);
                        this.isLoading = false;
                    } else {
                    }
                },
                err => {
                    this.loginForm.get("password").setErrors({ wrong: true });
                    this.isLoading = false;
                }
            );
    }

    openAboutAuthor() {
        const dialogRef = this.dialog.open(AboutComponent, {
            width: "550px",
            height: "400px",
            autoFocus: false,
            data: { author: true }
        });
    }

    openAboutApp() {
        const dialogRef = this.dialog.open(AboutComponent, {
            width: "550px",
            height: "400px",
            autoFocus: false,
            data: { app: true }
        });
    }
}
