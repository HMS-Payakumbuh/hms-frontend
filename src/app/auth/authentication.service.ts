import { Injectable }              from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable }              from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import * as _ from "lodash";

import { ENV }  from '../environment';
import { User } from './user';

@Injectable()
export class AuthenticationService {
  private users: User[] = [
    {no_pegawai: 'D001', name: 'Dokter A', role: 'dokter', password: 'dokter', other: ''},
    {no_pegawai: 'D002', name: 'Dokter B', role: 'dokter', password: 'dokter', other: ''},
    {no_pegawai: 'P001', name: 'Perawat', role: 'perawat', password: 'perawat', other: ''},
    {no_pegawai: 'L001', name: 'Petugas Lab A', role: 'petugasLab', password: 'petugaslab', other: ''},
    {no_pegawai: 'L002', name: 'Petugas Lab B', role: 'petugasLab', password: 'petugaslab', other: ''},
    {no_pegawai: 'A001', name: 'Admin', role: 'admin', password: 'admin', other: ''},
    {no_pegawai: 'F001', name: 'Front Office', role: 'frontOffice', password: 'frontOffice', other: '{"kategori_antrian": "A"}'},
    {no_pegawai: 'F002', name: 'Front Office', role: 'frontOffice', password: 'frontOffice', other: '{"kategori_antrian": "C"}'},
    {no_pegawai: 'AP001', name: 'Staf Apotek', role: 'stafApotek', password: 'stafapotek', other: ''},
    {no_pegawai: 'GU001', name: 'Gudang Utama', role: 'gudangUtama', password: 'gudangutama', other: ''},    
    {no_pegawai: 'K001', name: 'Kasir', role: 'kasir', password: 'kasir', other: ''}
  ]

  public token: string;
  public registerUrl = ENV.registerUrl;

  constructor(private http: Http) {
    var currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.token = currentUser && currentUser.token;
  }

  isLoggedIn(): boolean {
    if (localStorage.getItem('currentUser') != null)
      return true;
    else
      return false;
  }

  login(no_pegawai: string, password: string): Observable<boolean> {
    let user = this.users.find(user => user.no_pegawai == no_pegawai && user.password == password);
    if (user != null) {
      localStorage.setItem('currentUser', JSON.stringify(user));
      return Observable.of(true);
    }
    else {
      return Observable.of(false);
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
