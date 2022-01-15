import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table'

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
        "name",
        "lastName",
        "birthDate",
        "btnHistory",
        "btnEdit"
    ];
    dataSource: MatTableDataSource<any>;
    isLoading = false;

    @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
    @ViewChild(MatSort, { static: true }) sort: MatSort;

    constructor(
        private memberService: MemberService,
        public dialog: MatDialog
    ) { }

    ngOnInit() {
        this.memberService.getMembersStatus().subscribe(res => {
            if (res) this.callSearch();
        });
    }

    callSearch() {
        this.isLoading = true;
        this.memberService.getMembers().subscribe(res => {

            let members = res.members.map(member => {
                return {
                    name: member.firstName,
                    lastName: member.lastName,
                    _id: member.id,
                    birthDate: member.birthDate
                };
            });
            this.isLoading = false;
            this.dataSource = new MatTableDataSource(members);
            this.dataSource.paginator = this.paginator;
            this.dataSource.sort = this.sort;
        });
    }

    applyFilter(filterValue: Event) {
        this.dataSource.filter = (filterValue.target as HTMLTextAreaElement).value.trim().toLowerCase();

        if (this.dataSource.paginator) {
            this.dataSource.paginator.firstPage();
        }
    }

    rentHistory(row) {
        const dialogRef = this.dialog.open(RentHistoryComponent, {
            width: "550px",
            data: {
                id: row._id,
                fullName: row.name + " " + row.lastName
            }
        });
    }

    editMember(row) {
        const dialogRef = this.dialog.open(AddEditMemberComponent, {
            width: "350px",
            data: {
                edit: true,
                firstName: row.name,
                lastName: row.lastName,
                birthDate: row.birthDate,
                id: row._id
            },
            disableClose: true
        });
    }
}
