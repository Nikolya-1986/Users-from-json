import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AddUserComponent } from './components/add-user/add-user.component';
import { EditUserComponent } from './components/edit-user/edit-user.component';
import { UsersListComponent } from './components/users-list/users-list.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'add' },
  { path: 'add', component: AddUserComponent },
  { path: 'edit/:id', component: EditUserComponent },
  { path: 'list', component: UsersListComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
