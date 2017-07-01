import { Component } from '@angular/core';

@Component({
  selector: 'spa-root',
  template: `<router-outlet></router-outlet>`,
  styles: [`:host { display: flex; flex: 1;}`]
})
export class AppComponent {}
