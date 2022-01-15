import { Rent } from './../../../../models/rent.model';
import { DateAdapter, MAT_DATE_FORMATS } from '@angular/material/core';
import { Component, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';

import { ReturnDateComponent } from './../../../../components/modals/return-date/return-date.component';
import { scrollToTop } from './../../../../helpers/helpers-function';
import { RentService } from './../../../../services/rent.service';
import { APP_DATE_FORMATS, AppDateAdapter } from './../../../../helpers/format-datepicker';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';

@Component({
    selector: "app-list-rents",
    templateUrl: "./list-rents.component.html",
    styleUrls: ["./list-rents.component.css"],
    providers: [
        { provide: DateAdapter, useClass: AppDateAdapter },
        { provide: MAT_DATE_FORMATS, useValue: APP_DATE_FORMATS }
    ]
})
export class ListRentsComponent implements OnInit, OnDestroy {
    displayedColumns: string[] = [
        "name",
        "book",
        "author",
        "rentDate",
        "btnEdit"
    ];
    dataSource: MatTableDataSource<any>;
    selectedRent: Rent;
    isLoading = false;
    sub: Subscription;

    @Input() onlyActive: boolean;
    @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
    @ViewChild(MatSort, { static: true }) sort: MatSort;

    constructor(private rentService: RentService, public dialog: MatDialog) { }

    ngOnInit() {
        this.sub = this.rentService.getRentStatus().subscribe(res => {
            if (res) {
                this.callSearch();
            }
        });
    }

    callSearch() {
        if (!this.onlyActive) {
            this.isLoading = true;
            this.rentService.getRents().subscribe(res => {
                let rents = res.rents.map(rent => {
                    return {
                        fullName: rent.member.firstName + " " + rent.member.lastName,
                        name: rent.member.firstName,
                        lastName: rent.member.lastName,
                        memberId: rent.member.id,
                        book: rent.book.title,
                        author: rent.book.author,
                        bookId: rent.book.id,
                        rentDate: rent.rentDate,
                        returnDate: rent.returnDate,
                        _id: rent.rentId
                    };
                });
                this.isLoading = false;
                this.dataSource = new MatTableDataSource(rents);
                this.dataSource.paginator = this.paginator;
                this.dataSource.sort = this.sort;
            });
        } else {
            this.isLoading = true;
            this.rentService.getActiveRents().subscribe(res => {
                let rents = res.rents.map(rent => {
                    return {
                        fullName: rent.member.firstName + " " + rent.member.lastName,
                        name: rent.member.firstName,
                        lastName: rent.member.lastName,
                        memberId: rent.member.id,
                        book: rent.book.title,
                        author: rent.book.author,
                        bookId: rent.book.id,
                        rentDate: rent.rentDate,
                        returnDate: rent.returnDate,
                        _id: rent.rentId
                    };
                });
                this.isLoading = false;
                this.dataSource = new MatTableDataSource(rents);
                this.dataSource.paginator = this.paginator;
                this.dataSource.sort = this.sort;
            });
        }
    }

    applyFilter(event: Event) {
        this.dataSource.filter = (event.target as HTMLTextAreaElement).value.trim().toLowerCase();

        if (this.dataSource.paginator) {
            this.dataSource.paginator.firstPage();
        }
    }

    editRent(rent: Rent) {
        scrollToTop();
        this.selectedRent = rent;
    }

    saveChanges(updatedRent: Rent) {
        this.rentService
            .updateRent(
                updatedRent._id,
                updatedRent.idMember,
                updatedRent.idBook,
                updatedRent.rentDate,
                null
            )
            .subscribe(res => {
                this.selectedRent = undefined;
                this.callSearch();
            });
    }

    returnBook(row: Rent) {
        const dialogRef = this.dialog.open(ReturnDateComponent, {
            width: "400px",
            data: {
                id: row._id,
                rentDate: row.rentDate
            },
            disableClose: true
        });
    }

    ngOnDestroy() {
        this.sub.unsubscribe();
    }
}
