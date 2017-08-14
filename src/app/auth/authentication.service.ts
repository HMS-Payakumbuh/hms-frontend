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
        if (response.json().result.indexOf('salah') == -1)
          this.getUserDetails(response.json().result);
        else {
          let toastOptions: ToastOptions = {
            title: "Error",
            msg: response.json().result,
            showClose: true,
            timeout: 5000,
            theme: 'material'
          };
          this.toastyService.error(toastOptions);
        }
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
        //window.location.assign('/antrian');
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
