import { Injectable }              from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable }              from 'rxjs';
import 'rxjs/add/operator/map';
import * as _ from "lodash";

import { ENV }  from '../environment';
import { User } from './user';

@Injectable()
export class AuthenticationService {
  private users: User[] = [
    {no_pegawai: 'D001', name: 'Dokter', role: 'dokter', password: 'dokter', other: ''},
    {no_pegawai: 'P001', name: 'Perawat', role: 'perawat', password: 'perawat', other: ''},
    {no_pegawai: 'L001', name: 'Petugas Lab', role: 'petugaslab', password: 'petugaslab', other: ''},
    {no_pegawai: 'A001', name: 'Admin', role: 'admin', password: 'admin', other: ''},
    {no_pegawai: 'F001', name: 'Front Office', role: 'frontOffice', password: 'frontOffice', other: '{"kategori_antrian": "A"}'}
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

  setKategori(no_pegawai: string, kategori_antrian: string): void {
    let user = _.find(this.users, { 'no_pegawai': no_pegawai });
    user.other = '{"kategori_antrian": "' + kategori_antrian + '"}';
    localStorage.setItem('currentUser', JSON.stringify(user));
  }
}
