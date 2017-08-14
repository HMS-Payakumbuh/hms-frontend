import { Injectable }              from '@angular/core';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { ToastyService, ToastyConfig, ToastOptions, ToastData } from 'ng2-toasty';
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
    {no_pegawai: 'L001', name: 'Petugas Administrasi Lab', role: 'petugasLab', password: 'petugaslab', other: ''},
    {no_pegawai: 'L002', name: 'Petugas Lab', role: 'petugasLab', password: 'petugaslab', other: ''},
    {no_pegawai: 'A001', name: 'Admin', role: 'admin', password: 'admin', other: ''},
    {no_pegawai: 'F001', name: 'Front Office A', role: 'frontOffice', password: 'frontOffice', other: '{"kategori_antrian": "A"}'},
    {no_pegawai: 'F002', name: 'Front Office B', role: 'frontOffice', password: 'frontOffice', other: '{"kategori_antrian": "C"}'},
    {no_pegawai: 'AP001', name: 'Staf Apotek', role: 'stafApotek', password: 'stafapotek', other: ''},
    {no_pegawai: 'GU001', name: 'Gudang Utama', role: 'gudangUtama', password: 'gudangutama', other: ''},
    {no_pegawai: 'K001', name: 'Kasir', role: 'kasir', password: 'kasir', other: ''}
  ]

  public registerUrl = ENV.registerUrl;
  public loginUrl = ENV.loginUrl;
  public getUserDetailsUrl = ENV.getUserDetailsUrl;
  public updateUserKategoriUrl = ENV.updateUserKategoriUrl;

  constructor(
    private http: Http,
    private toastyService: ToastyService,
    private toastyConfig: ToastyConfig
  ) { }

  isLoggedIn(): boolean {
    if (localStorage.getItem('currentUser') != null)
      return true;
    else
      return false;
  }

  register(data: any): Observable<boolean> {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({headers: headers});
    let body = JSON.stringify(data);

    return this.http.post(this.registerUrl, body, options)
      .map((res: Response) => res.json());
  }

  login(data: any) {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({headers: headers});
    let body = JSON.stringify(data);

    this.http.post(this.loginUrl, body, options).subscribe(
      response => {
        this.getUserDetails(response.json().result);
      },
      error => {
        let toastOptions: ToastOptions = {
            title: "Error",
            msg: error,
            showClose: true,
            timeout: 5000,
            theme: 'material'
        };
        this.toastyService.error(toastOptions);
      }
    );
  }

  getUserDetails(token: string) {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({headers: headers});
    let data = { 'token': token };
    let body = JSON.stringify(data);
    this.http.post(this.getUserDetailsUrl, body, options).subscribe(
      response => {
        localStorage.setItem('currentUser', JSON.stringify(response.json().result));
        window.location.assign('');
      },
      error => {
        let toastOptions: ToastOptions = {
            title: "Error",
            msg: error,
            showClose: true,
            timeout: 5000,
            theme: 'material'
        };
        this.toastyService.error(toastOptions);
      }
    )
  }

  setKategori(no_pegawai: string, kategori_antrian: string): void {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({headers: headers});
    let data = { 
      'no_pegawai': no_pegawai,
      'kategori_antrian': kategori_antrian 
    };
    let body = JSON.stringify(data);
    this.http.post(this.updateUserKategoriUrl, body, options).subscribe(
      response => {
        localStorage.setItem('currentUser', JSON.stringify(response.json().result));
        window.location.assign('');
      },
      error => {
        let toastOptions: ToastOptions = {
            title: "Error",
            msg: error,
            showClose: true,
            timeout: 5000,
            theme: 'material'
        };
        this.toastyService.error(toastOptions);
      }
    )
  }

  logout(): void {
    localStorage.removeItem('currentUser');
  }
}
