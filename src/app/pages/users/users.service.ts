import { Injectable } from '@angular/core';
import {Http} from "@angular/http";

@Injectable()
export class UsersService {
  private url =  'http://hosting.suprice.today:8020/api/users';
  constructor(private http: Http) { }

  get() {
    return this.http.get(`${this.url}`)
      .map( (response) => response.json())
      .catch( this.handleError );
  }

  private handleError(error: any) {
    return 'Error';
  }
}
