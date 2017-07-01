import { NgModule } from '@angular/core';
import { AddComponent } from './add/add.component';
import { EditComponent } from './edit/edit.component';
import { ListComponent } from './list/list.component';
import { RouterModule, Routes } from "@angular/router";
import {MaterialModule} from "@angular/material";
import {CommonModule} from "@angular/common";
import {UsersService} from "./users.service";

export const appRouter: Routes = [
  {
    path: 'list',
    component: ListComponent
  }, {
    path: 'add',
    component: AddComponent
  }, {
    path: ':id',
    component: EditComponent
  }, {
    path: '',
    redirectTo: 'list',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    RouterModule.forChild(appRouter)
  ],
  declarations: [AddComponent, EditComponent, ListComponent],
  providers: [UsersService]
})
export class UsersModule { }
