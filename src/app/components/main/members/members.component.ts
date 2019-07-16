import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';

import { Member } from './../../../models/member.model';
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
  dataSource: MatTableDataSource<Member>;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(private memeberService: MemberService) {}

  ngOnInit() {
    this.memeberService.getMembers().subscribe(res => {
      console.log("evo ga res za member: ", res);
      this.dataSource = new MatTableDataSource(res.members);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  applyFilter(filterValue: string) {
    console.log("evo ga rezultat iz filtera: ", filterValue);
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  rentHistory(row) {
    console.log(row);
  }

  editMember(row) {
    console.log(row);
  }
}
