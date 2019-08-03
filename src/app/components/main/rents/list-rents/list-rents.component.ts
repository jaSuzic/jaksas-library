import { Component, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { DateAdapter, MAT_DATE_FORMATS, MatDialog, MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { Subscription } from 'rxjs';
import { ReturnDateComponent } from 'src/app/components/modals/return-date/return-date.component';
import { scrollToTop } from 'src/app/helpers/helpers-function';
import { RentService } from 'src/app/services/rent.service';

import { APP_DATE_FORMATS, AppDateAdapter } from './../../../../helpers/format-datepicker';

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
  selectedRent;
  isLoading = false;
  sub: Subscription;

  @Input() onlyActive: boolean;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(private rentService: RentService, public dialog: MatDialog) {}

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
            fullName: rent.memberId.name + " " + rent.memberId.lastName,
            name: rent.memberId.name,
            lastName: rent.memberId.lastName,
            memberId: rent.memberId._id,
            book: rent.bookId.title,
            author: rent.bookId.author,
            bookId: rent.bookId._id,
            rentDate: rent.rentDate,
            returnDate: rent.returnDate,
            _id: rent._id
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
            fullName: rent.memberId.name + " " + rent.memberId.lastName,
            name: rent.memberId.name,
            lastName: rent.memberId.lastName,
            memberId: rent.memberId._id,
            book: rent.bookId.title,
            author: rent.bookId.author,
            bookId: rent.bookId._id,
            rentDate: rent.rentDate,
            returnDate: rent.returnDate,
            _id: rent._id
          };
        });
        this.isLoading = false;
        this.dataSource = new MatTableDataSource(rents);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      });
    }
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  editRent(rent) {
    scrollToTop();
    this.selectedRent = rent;
  }

  saveChanges(updatedRent) {
    this.rentService
      .updateRent(
        updatedRent._id,
        updatedRent.memberId,
        updatedRent.bookId,
        updatedRent.rentDate,
        null
      )
      .subscribe(res => {
        this.selectedRent = undefined;
        this.callSearch();
      });
  }

  returnBook(row) {
    const dialogRef = this.dialog.open(ReturnDateComponent, {
      data: {
        id: row._id,
        rentDate: row.rentDate
      },
      disableClose: true
    });

    dialogRef.afterClosed().subscribe(res => {
      console.log(res);
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
