import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AdminPanelComponent } from './components/main/admin/admin-panel/admin-panel.component';
import { ListComponent } from './components/main/books/list/list.component';
import { LoginComponent } from './components/main/login/login.component';
import { MembersComponent } from './components/main/members/members.component';
import { ListRentsComponent } from './components/main/rents/list-rents/list-rents.component';
import { NewRentComponent } from './components/main/rents/new-rent/new-rent.component';
import { AuthGuard } from './helpers/auth.guard';

const routes: Routes = [
  { path: "", component: ListComponent, canActivate: [AuthGuard] },
  { path: "books", component: ListComponent, canActivate: [AuthGuard] },
  { path: "members", component: MembersComponent, canActivate: [AuthGuard] },
  { path: "new-rent", component: NewRentComponent, canActivate: [AuthGuard] },
  { path: "rents", component: ListRentsComponent, canActivate: [AuthGuard] },
  { path: "admin", component: AdminPanelComponent, canActivate: [AuthGuard] },
  { path: "login", component: LoginComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class AppRoutingModule {}
