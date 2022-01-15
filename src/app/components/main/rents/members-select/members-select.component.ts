import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Member } from './../../../../models/member.model';
import { MemberService } from './../../../../services/member.service';

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
    isLoading = false;

    @Input() set resetPagination(value: boolean) {
        if (value) {
            if (this.dataSourceMember) {
                if (this.dataSourceMember.paginator) {
                    this.dataSourceMember.paginator.firstPage();
                }
            }
        }
    }
    @Output() selectedMember = new EventEmitter<Member>();
    @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
    @ViewChild(MatSort, { static: true }) sort: MatSort;

    constructor(private memberService: MemberService) { }

    ngOnInit() {
        this.isLoading = true;
        this.memberService.getMembers().subscribe(res => {
            let members = res.members.map(member => {
                return {
                    name: member.firstName,
                    lastName: member.lastName,
                    id: member.id,
                    birthDate: member.birthDate
                };
            });
            this.isLoading = false;
            this.dataSourceMember = new MatTableDataSource(members);
            this.dataSourceMember.paginator = this.paginator;
            this.dataSourceMember.sort = this.sort;
        });
    }

    applyMemberFilter(event: Event) {
        this.dataSourceMember.filter = (event.target as HTMLTextAreaElement).value.trim().toLowerCase();

        if (this.dataSourceMember.paginator) {
            this.dataSourceMember.paginator.firstPage();
        }
    }
    selectMember(row: Member) {
        this.selectedMember.emit(row);
    }
}
