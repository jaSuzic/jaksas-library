import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"]
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.loginForm = new FormGroup({
      email: new FormControl(null, [Validators.email, Validators.required]),
      password: new FormControl(null, [Validators.required])
    });
  }

  onLogin() {
    if (this.loginForm.invalid) return;
    this.authService
      .loginUser(this.loginForm.value.email, this.loginForm.value.password)
      .subscribe(
        res => {
          if (res) {
            console.log("u resu smo");
            this.authService.processLogin(res);
          } else {
          }
        },
        err => {
          console.log("u erroru smo");
          this.loginForm.get("password").setErrors({ wrong: true });
        }
      );
  }
}
