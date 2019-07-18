import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  MatButtonModule,
  MatCardModule,
  MatDatepickerModule,
  MatDialogModule,
  MatExpansionModule,
  MatIconModule,
  MatInputModule,
  MatNativeDateModule,
  MatPaginatorModule,
  MatSelectModule,
  MatSidenavModule,
  MatSortModule,
  MatStepperModule,
  MatTableModule,
  MatToolbarModule,
} from '@angular/material';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import bootstrap from 'bootstrap';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { ListComponent } from './components/main/books/list/list.component';
import { MembersComponent } from './components/main/members/members.component';
import { NewRentComponent } from './components/main/rents/new-rent/new-rent.component';
import { AddEditComponent } from './components/modals/add-edit-book/add-edit.component';
import { AddEditMemberComponent } from './components/modals/add-edit-member/add-edit-member.component';
import { ConfirmationModalComponent } from './components/modals/confirmation-modal/confirmation-modal.component';
import { SidenavComponent } from './components/sidenav/sidenav.component';
import { MembersSelectComponent } from './components/main/rents/members-select/members-select.component';
import { BooksSelectComponent } from './components/main/rents/books-select/books-select.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SidenavComponent,
    ListComponent,
    AddEditComponent,
    ConfirmationModalComponent,
    MembersComponent,
    AddEditMemberComponent,
    NewRentComponent,
    MembersSelectComponent,
    BooksSelectComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    MatToolbarModule,
    MatCardModule,
    MatInputModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatExpansionModule,
    MatIconModule,
    MatSelectModule,
    MatDialogModule,
    MatPaginatorModule,
    MatTableModule,
    MatSortModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSidenavModule,
    MatStepperModule,
    ReactiveFormsModule
  ],
  entryComponents: [
    AddEditComponent,
    ConfirmationModalComponent,
    AddEditMemberComponent
  ],
  providers: [MatDatepickerModule],
  bootstrap: [AppComponent]
})
export class AppModule {}
