import { Rent } from './../../../../models/rent.model';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { MembersSelectComponent } from '../members-select/members-select.component';
import { BooksSelectComponent } from './../books-select/books-select.component';

@Component({
    selector: "app-edit-rent",
    templateUrl: "./edit-rent.component.html",
    styleUrls: ["./edit-rent.component.css"]
})
export class EditRentComponent implements OnInit {
    @Input() selectedRent: any;
    @Output() updatedRent = new EventEmitter();

    constructor(public dialog: MatDialog) { }

    ngOnInit() { }

    changeMember() {
        const dialogRef = this.dialog.open(MembersSelectComponent, {
            disableClose: false,
            width: "550px"
        });

        const sub = dialogRef.componentInstance.selectedMember.subscribe(res => {
            this.selectedRent.lastName = res.lastName;
            this.selectedRent.name = res.firstName;
            this.selectedRent.memberId = res.id;
            dialogRef.close();
        });

        dialogRef.afterClosed().subscribe(() => {
            sub.unsubscribe();
        });
    }

    changeBook() {
        const dialogRef = this.dialog.open(BooksSelectComponent, {
            disableClose: false,
            width: "550px"
        });

        const sub = dialogRef.componentInstance.selectedBook.subscribe(res => {
            this.selectedRent.author = res.author;
            this.selectedRent.book = res.title;
            this.selectedRent.bookId = res.id;
            dialogRef.close();
        });

        dialogRef.afterClosed().subscribe(() => {
            sub.unsubscribe();
        });
    }

    saveChanges() {
        this.updatedRent.emit(this.selectedRent);
    }
}
