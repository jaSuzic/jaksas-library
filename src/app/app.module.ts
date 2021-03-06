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
import { AdminPanelComponent } from './components/main/admin/admin-panel/admin-panel.component';
import { ChangeImageComponent } from './components/main/admin/change-image/change-image.component';
import { ChangePassComponent } from './components/main/admin/change-pass/change-pass.component';
import { ListUsersComponent } from './components/main/admin/list-users/list-users.component';
import { RegisterUserComponent } from './components/main/admin/register-user/register-user.component';
import { ListComponent } from './components/main/books/list/list.component';
import { LoginComponent } from './components/main/login/login.component';
import { MembersComponent } from './components/main/members/members.component';
import { NotFoundComponent } from './components/main/not-found/not-found.component';
import { BooksSelectComponent } from './components/main/rents/books-select/books-select.component';
import { EditRentComponent } from './components/main/rents/edit-rent/edit-rent.component';
import { ListActiveRentsComponent } from './components/main/rents/list-active-rents/list-active-rents.component';
import { ListRentsComponent } from './components/main/rents/list-rents/list-rents.component';
import { MembersSelectComponent } from './components/main/rents/members-select/members-select.component';
import { NewRentComponent } from './components/main/rents/new-rent/new-rent.component';
import { AboutComponent } from './components/modals/about/about.component';
import { AddEditComponent } from './components/modals/add-edit-book/add-edit.component';
import { AddEditMemberComponent } from './components/modals/add-edit-member/add-edit-member.component';
import { ConfirmationModalComponent } from './components/modals/confirmation-modal/confirmation-modal.component';
import { EditUserComponent } from './components/modals/edit-user/edit-user.component';
import { RentHistoryComponent } from './components/modals/rent-history/rent-history.component';
import { ReturnDateComponent } from './components/modals/return-date/return-date.component';
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
    LoginComponent,
    ChangePassComponent,
    ChangeImageComponent,
    RegisterUserComponent,
    ListUsersComponent,
    AdminPanelComponent,
    EditUserComponent,
    ListActiveRentsComponent,
    ReturnDateComponent,
    RentHistoryComponent,
    NotFoundComponent,
    AboutComponent
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
    BooksSelectComponent,
    EditUserComponent,
    ReturnDateComponent,
    RentHistoryComponent,
    AboutComponent
  ],
  providers: [
    MatDatepickerModule,
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
