import { NgModule } from '@angular/core';
import {RouterModule, Routes} from "@angular/router";

export const appRouter: Routes = [
  {
    path: 'login',
    loadChildren: './login/login.module#LoginModule'
  }, {
    path: 'app',
    loadChildren: './pages/pages.module#PagesModule'
  }, {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRouter)
  ],
  exports: [
    RouterModule
  ],
  declarations: []
})
export class RoutingModule { }
