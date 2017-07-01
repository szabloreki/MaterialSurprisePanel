import { Component } from '@angular/core';

@Component({
  selector: 'spa-pages',
  templateUrl: './pages.component.html',
  styles: [`
  :host {
    display: flex;
    flex: 1;
  }
  .content {
    padding: 12px;
  }
  md-sidenav {
    width: 320px;
  }`]
})
export class PagesComponent {
}
