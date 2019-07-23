import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatPaginator, MatSort, MatTableDataSource } from '@angular/material';

import { AddEditMemberComponent } from '../../modals/add-edit-member/add-edit-member.component';
import { MemberService } from './../../../services/member.service';

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

  constructor(private memberService: MemberService, public dialog: MatDialog) {}

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
    console.log(row);
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
