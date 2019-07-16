import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ListComponent } from './components/main/books/list/list.component';
import { MembersComponent } from './components/main/members/members.component';

const routes: Routes = [
  { path: "", component: ListComponent },
  { path: "books", component: ListComponent },
  { path: "members", component: MembersComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
