import { NewRentComponent } from './components/main/rents/new-rent/new-rent.component';
import { ListRentsComponent } from './components/main/rents/list-rents/list-rents.component';
import { ListActiveRentsComponent } from './components/main/rents/list-active-rents/list-active-rents.component';
import { EditRentComponent } from './components/main/rents/edit-rent/edit-rent.component';
import { BooksSelectComponent } from './components/main/rents/books-select/books-select.component';
import { NotFoundComponent } from './components/main/not-found/not-found.component';
import { MembersComponent } from './components/main/members/members.component';
import { LoginComponent } from './components/main/login/login.component';
import { ListComponent } from './components/main/books/list/list.component';
import { RegisterUserComponent } from './components/main/admin/register-user/register-user.component';
import { ListUsersComponent } from './components/main/admin/list-users/list-users.component';
import { ChangePassComponent } from './components/main/admin/change-pass/change-pass.component';
import { ChangeImageComponent } from './components/main/admin/change-image/change-image.component';
import { AdminPanelComponent } from './components/main/admin/admin-panel/admin-panel.component';
import { SidenavComponent } from './components/sidenav/sidenav.component';
import { ReturnDateComponent } from './components/modals/return-date/return-date.component';
import { RentHistoryComponent } from './components/modals/rent-history/rent-history.component';
import { EditUserComponent } from './components/modals/edit-user/edit-user.component';
import { ConfirmationModalComponent } from './components/modals/confirmation-modal/confirmation-modal.component';
import { AddEditMemberComponent } from './components/modals/add-edit-member/add-edit-member.component';
import { AddEditComponent } from './components/modals/add-edit-book/add-edit.component';
import { HeaderComponent } from './components/header/header.component';
import { AuthInterceptor } from './helpers/auth-interceptor';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MaterialModule } from './material.module';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module'

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HTTP_INTERCEPTORS, HttpClient, HttpClientModule } from '@angular/common/http';
import { AboutComponent } from './components/modals/about/about.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MembersSelectComponent } from './components/main/rents/members-select/members-select.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    AboutComponent,
    AddEditComponent,
    AddEditMemberComponent,
    ConfirmationModalComponent,
    EditUserComponent,
    RentHistoryComponent,
    ReturnDateComponent,
    SidenavComponent,
    AdminPanelComponent,
    ChangeImageComponent,
    ChangePassComponent,
    ListUsersComponent,
    RegisterUserComponent,
    ListComponent,
    LoginComponent,
    MembersComponent,
    NotFoundComponent,
    BooksSelectComponent,
    EditRentComponent,
    ListActiveRentsComponent,
    ListRentsComponent,
    MembersSelectComponent,
    NewRentComponent
],
imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [
    MatDatepickerModule,
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
],
  bootstrap: [AppComponent]
})
export class AppModule { }
