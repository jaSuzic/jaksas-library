import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ListComponent } from './components/main/books/list/list.component';
import { LoginComponent } from './components/main/login/login.component';
import { MembersComponent } from './components/main/members/members.component';
import { ListRentsComponent } from './components/main/rents/list-rents/list-rents.component';
import { NewRentComponent } from './components/main/rents/new-rent/new-rent.component';

const routes: Routes = [
  { path: "", component: ListComponent },
  { path: "books", component: ListComponent },
  { path: "members", component: MembersComponent },
  { path: "new-rent", component: NewRentComponent },
  { path: "rents", component: ListRentsComponent },
  { path: "login", component: LoginComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
