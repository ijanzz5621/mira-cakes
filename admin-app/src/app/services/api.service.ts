import { IProduct } from './../interfaces/IProduct';
import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';

import 'rxjs/Rx';

@Injectable()
export class ApiService {

  // url: string;

  constructor(private _http: Http) { }

  getProducts(_url): Observable<IProduct[]> {
    return this._http.get(_url)
      .map((response: Response) => {
        response.json();
      })
      .catch(this.handleError);
  }

  private handleError(error: Response) {
    return Observable.throw(error.statusText);
  }

}
