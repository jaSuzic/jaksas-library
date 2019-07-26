import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: "app-change-pass",
  templateUrl: "./change-pass.component.html",
  styleUrls: ["./change-pass.component.css"]
})
export class ChangePassComponent implements OnInit {
  passGroup: FormGroup;
  user: User;

  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.user = this.authService.getUser();
    this.passGroup = new FormGroup({
      oldPass: new FormControl(null, Validators.required),
      newPass: new FormControl(null, Validators.required),
      confirmPass: new FormControl(null, Validators.required)
    });
  }

  sendNewPass() {
    //pass not valid
    //new and confirm pass not same
    if (
      this.passGroup.get("newPass").value !==
      this.passGroup.get("confirmPass").value
    ) {
      this.passGroup.get("newPass").setErrors({ notSame: true });
      this.passGroup.get("confirmPass").setErrors({ notSame: true });
      return;
    } else {
      this.passGroup.get("newPass").setErrors({ notSame: false });
      this.passGroup.get("confirmPass").setErrors({ notSame: false });
    }

    let newPass = this.passGroup.get("newPass").value;
    let oldPass = this.passGroup.get("oldPass").value;
    let email = this.user.email;
    this.authService.changePass(email, oldPass, newPass).subscribe(
      res => {
        console.log(res);
      },
      err => {
        //Test wrong pass (old)
        console.log(err);
      }
    );
  }
}
