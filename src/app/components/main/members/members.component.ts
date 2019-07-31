import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { RentService } from 'src/app/services/rent.service';

import { AddEditMemberComponent } from '../../modals/add-edit-member/add-edit-member.component';
import { MemberService } from './../../../services/member.service';
import { RentHistoryComponent } from './../../modals/rent-history/rent-history.component';

@Component({
  selector: "app-members",
  templateUrl: "./members.component.html",
  styleUrls: ["./members.component.css"]
})
export class MembersComponent implements OnInit {
  displayedColumns: string[] = [
    "firstName",
    "lastName",
    "birthDate",
    "btnHistory",
    "btnEdit"
  ];
  dataSource: MatTableDataSource<any>;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(
    private memberService: MemberService,
    public dialog: MatDialog,
    private rentService: RentService
  ) {}

  ngOnInit() {
    this.callSearch();

    this.memberService.getMembersStatus().subscribe(res => {
      if (res) this.callSearch();
    });
  }

  callSearch() {
    this.memberService.getMembers().subscribe(res => {
      let members = res.members.map(member => {
        return {
          name: member.firstName,
          lastName: member.lastName,
          _id: member._id,
          birthDate: member.birthDate
        };
      });
      this.dataSource = new MatTableDataSource(members);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  rentHistory(row) {
    const dialogRef = this.dialog.open(RentHistoryComponent, {
      data: {
        id: row._id,
        fullName: row.name + " " + row.lastName
      }
    });
  }

  editMember(row) {
    const dialogRef = this.dialog.open(AddEditMemberComponent, {
      data: {
        edit: true,
        firstName: row.name,
        lastName: row.lastName,
        birthDate: row.birthDate,
        id: row._id
      },
      disableClose: true
    });

    dialogRef.afterClosed().subscribe(res => {
      console.log(res);
    });
  }
}
