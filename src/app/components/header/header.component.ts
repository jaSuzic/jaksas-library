import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';

import { AddEditComponent } from '../modals/add-edit/add-edit.component';

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.css"]
})
export class HeaderComponent implements OnInit {
  name: string = "test";
  lastName: string = "test";
  position: string = "test";

  constructor(public dialog: MatDialog) {}

  ngOnInit() {}

  addNewBook() {
    const dialogRef = this.dialog.open(AddEditComponent, {
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
}
