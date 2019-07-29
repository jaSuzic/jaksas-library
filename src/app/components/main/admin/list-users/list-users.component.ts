import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { User } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth.service';

import { UserService } from './../../../../services/user.service';
import { EditUserComponent } from './../../../modals/edit-user/edit-user.component';

@Component({
  selector: "app-list-users",
  templateUrl: "./list-users.component.html",
  styleUrls: ["./list-users.component.css"]
})
export class ListUsersComponent implements OnInit {
  displayedColumns: string[] = [
    "firstName",
    "lastName",
    "email",
    "position",
    "btnEdit"
  ];
  dataSource: MatTableDataSource<any>;
  user: User;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(
    public dialog: MatDialog,
    private authService: AuthService,
    private userService: UserService
  ) {}

  ngOnInit() {
    this.user = this.authService.getUser();
    this.callSearch();
  }

  callSearch() {
    this.userService.getUsersExcept(this.user._id).subscribe((res: User[]) => {
      console.log(res);
      this.dataSource = new MatTableDataSource(res);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  editMember(row) {
    const dialogRef = this.dialog.open(EditUserComponent, {
      data: {
        edit: true,
        firstName: row.firstName,
        lastName: row.lastName,
        email: row.email,
        id: row._id,
        image: row.image,
        position: row.position
      },
      disableClose: true
    });

    dialogRef.afterClosed().subscribe(res => {
      console.log(res);
    });
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
