import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import bootstrap from 'bootstrap';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { ListComponent } from './components/main/books/list/list.component';
import { LoginComponent } from './components/main/login/login.component';
import { MembersComponent } from './components/main/members/members.component';
import { BooksSelectComponent } from './components/main/rents/books-select/books-select.component';
import { EditRentComponent } from './components/main/rents/edit-rent/edit-rent.component';
import { ListRentsComponent } from './components/main/rents/list-rents/list-rents.component';
import { MembersSelectComponent } from './components/main/rents/members-select/members-select.component';
import { NewRentComponent } from './components/main/rents/new-rent/new-rent.component';
import { AddEditComponent } from './components/modals/add-edit-book/add-edit.component';
import { AddEditMemberComponent } from './components/modals/add-edit-member/add-edit-member.component';
import { ConfirmationModalComponent } from './components/modals/confirmation-modal/confirmation-modal.component';
import { SidenavComponent } from './components/sidenav/sidenav.component';
import { AuthInterceptor } from './helpers/auth-interceptor';
import { MaterialModule } from './material.module';

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
    BooksSelectComponent,
    ListRentsComponent,
    EditRentComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MaterialModule
  ],
  entryComponents: [
    AddEditComponent,
    ConfirmationModalComponent,
    AddEditMemberComponent,
    MembersSelectComponent,
    BooksSelectComponent
  ],
  providers: [
    MatDatepickerModule,
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
