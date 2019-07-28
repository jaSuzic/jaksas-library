import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { User } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-list-users',
  templateUrl: './list-users.component.html',
  styleUrls: ['./list-users.component.css']
})
export class ListUsersComponent implements OnInit {
  displayedColumns: string[] = [
    "firstName",
    "lastName",
    "birthDate",
    "btnHistory",
    "btnEdit"
  ];
  dataSource: MatTableDataSource<any>;
  user: User;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(public dialog: MatDialog, private authService: AuthService) { }

  ngOnInit() {
    this.user = this.authService.getUser();
    console.log(this.user)
    this.callSearch()
  }

  callSearch() {
    this.authService.getUsersExcept(this.user._id).subscribe(res => {
      console.log(res)
    })
  }

}
