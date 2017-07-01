import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import { PagesComponent } from './pages.component'
import {MaterialModule} from "@angular/material";
import {FlexLayoutModule} from "@angular/flex-layout";

export const appRouter: Routes = [
  {
    path: '',
    component: PagesComponent,
    children: [
      {
        path: 'users',
        loadChildren: './users/users.module#UsersModule'
      }, {
        path: '',
        redirectTo: 'users',
        pathMatch: 'full'
      }
    ]
  }
];

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    FlexLayoutModule,
    RouterModule.forChild(appRouter)
  ],
  declarations: [
    PagesComponent
  ]
})
export class PagesModule { }
