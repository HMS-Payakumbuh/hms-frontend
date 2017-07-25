import { Injectable }              from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable }              from 'rxjs';
import 'rxjs/add/operator/map';

import { ENV }  from '../environment';
import { User } from './user';

@Injectable()
export class AuthenticationService {
  private users: User[] = [
    {no_pegawai: 'D001', name: 'Dokter', role: 'dokter', password: 'dokter'},
    {no_pegawai: 'P001', name: 'Perawat', role: 'perawat', password: 'perawat'},
    {no_pegawai: 'L001', name: 'Petugas Lab', role: 'petugaslab', password: 'petugaslab'},
    {no_pegawai: 'A001', name: 'Admin', role: 'admin', password: 'admin'}
  ]

  public token: string;
  public registerUrl = ENV.registerUrl;

  constructor(private http: Http) {
    var currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.token = currentUser && currentUser.token;
  }

  login(no_pegawai: string, password: string): boolean {
    let user = this.users.find(user => user.no_pegawai == no_pegawai && user.password == password);
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
