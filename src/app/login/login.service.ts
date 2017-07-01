import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
@Injectable()
export class LoginService {
  private url: String = 'http://hosting.suprice.today:8020/api/userLogin';

  constructor(private http: Http) {}

    login(user) {
        return this.http.post(`${this.url}`, user)
            .map( (response: Response) => response.json())
            .catch( this.handleError );
    }
    handleError(error: any) {
        return Observable.throw(error);
    }

}
