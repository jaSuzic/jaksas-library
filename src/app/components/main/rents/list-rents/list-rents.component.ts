import { Component, OnInit, ViewChild } from '@angular/core';
import { DateAdapter, MAT_DATE_FORMATS, MatDialog, MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
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
export class ListRentsComponent implements OnInit {
  displayedColumns: string[] = [
    "name",
    "book",
    "author",
    "rentDate",
    "btnEdit"
  ];
  dataSource: MatTableDataSource<any>;
  selectedRent;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(private rentService: RentService, public dialog: MatDialog) {}

  ngOnInit() {
    this.callSearch();
  }

  callSearch() {
    this.rentService.getRents().subscribe(res => {
      let rents = res.rents.map(rent => {
        return {
          name: rent.memberId.name,
          lastName: rent.memberId.lastName,
          memberId: rent.memberId._id,
          book: rent.bookId.title,
          author: rent.bookId.author,
          bookId: rent.bookId._id,
          rentDate: rent.rentDate,
          _id: rent._id
        };
      });
      this.dataSource = new MatTableDataSource(rents);
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
}
