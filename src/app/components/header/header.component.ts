import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user.model';

import { AddEditComponent } from '../modals/add-edit-book/add-edit.component';
import { AuthService } from './../../services/auth.service';
import { AddEditMemberComponent } from './../modals/add-edit-member/add-edit-member.component';

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.css"]
})
export class HeaderComponent implements OnInit {
  name: string = "test";
  lastName: string = "test";
  position: string = "test";
  user: User;

  @Output() logoutClicked = new EventEmitter();

  constructor(
    public dialog: MatDialog,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    this.user = this.authService.getUser();
  }

  addNewBook() {
    const dialogRef = this.dialog.open(AddEditComponent, {
      width: "550px",
      data: {
        edit: false,
        title: "",
        author: "",
        year: "",
        id: ""
      },
      disableClose: true
    });

    dialogRef.afterClosed().subscribe(res => {
      console.log(res);
    });
  }

  addNewMember() {
    const dialogRef = this.dialog.open(AddEditMemberComponent, {
      width: "550px",
      data: {
        edit: false,
        firstName: "",
        lastName: "",
        birthDate: "",
        id: ""
      },
      disableClose: true
    });
  }

  logout() {
    this.authService.logout();
    this.logoutClicked.emit();
  }
}
