import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { Member } from 'src/app/models/member.model';
import { MemberService } from 'src/app/services/member.service';

@Component({
  selector: "app-members-select",
  templateUrl: "./members-select.component.html",
  styleUrls: ["./members-select.component.css"]
})
export class MembersSelectComponent implements OnInit {
  displayedColumns: string[] = [
    "firstName",
    "lastName",
    "birthDate",
    "btnSelect"
  ];
  dataSourceMember: MatTableDataSource<any>;

  @Output() selectedMember = new EventEmitter<Member>();
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(private memberService: MemberService) {}

  ngOnInit() {
    this.memberService.getMembers().subscribe(res => {
      console.log("evo ga res za member: ", res);
      let members = res.members.map(member => {
        return {
          name: member.firstName,
          lastName: member.lastName,
          _id: member._id,
          birthDate: member.birthDate
        };
      });
      this.dataSourceMember = new MatTableDataSource(members);
      this.dataSourceMember.paginator = this.paginator;
      this.dataSourceMember.sort = this.sort;
    });
  }

  applyMemberFilter(filterValue: string) {
    this.dataSourceMember.filter = filterValue.trim().toLowerCase();

    if (this.dataSourceMember.paginator) {
      this.dataSourceMember.paginator.firstPage();
    }
  }
  selectMember(row) {
    this.selectedMember.emit(row);
  }
}
