import { Injectable }              from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable }              from 'rxjs';
import 'rxjs/add/operator/map';

import { ENV }  from '../environment';
import { User } from './user';

@Injectable()
export class AuthenticationService {
  private users: User[] = [
    {name: 'dokter', role: 'dokter', email: 'dokter@gmail.com', password: 'dokter'},
    {name: 'perawat', role: 'perawat', email: 'perawat@gmail.com', password: 'perawat'},
    {name: 'petugaslab', role: 'petugaslab', email: 'petugaslab@gmail.com', password: 'petugaslab'}
  ]

  public token: string;
  public registerUrl = ENV.registerUrl;

  constructor(private http: Http) {
    var currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.token = currentUser && currentUser.token;
  }

  login(email: string, password: string): boolean {
    let user = this.users.find(user => user.email == email && user.password == password);
    if (user != null) {
      localStorage.setItem('currentUser', JSON.stringify(user));
      return true;
    }
    else {
      return false;
    }
  }

  logout(): void {
    this.token = null;
    localStorage.removeItem('currentUser');
  }
}
