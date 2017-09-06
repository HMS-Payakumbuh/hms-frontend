import { Injectable }		from '@angular/core';
import { Headers, Http, Response, RequestOptions}		from '@angular/http';
import { Observable }		from 'rxjs/Rx';
import { AuthHttp }				from 'angular2-jwt';

import 'rxjs/add/operator/toPromise';

import * as _ from "lodash";

import { Pembayaran }		from './pembayaran';
import { ENV }				from '../environment';

@Injectable()
export class PembayaranService {
	private pembayaranUrl = ENV.pembayaranUrl;

	constructor(
		private http:Http,
		private authHttp: AuthHttp
	) { }

	private handleError(error: any): Promise<any> {
		console.error('An error occurred', error);
		return Promise.reject(error.message || error);
	}

	getAllPembayaran(): Observable<any[]> {
		return this.authHttp.get(this.pembayaranUrl)
			.map((res: Response) => res.json());
	}

	getPembayaran(id: number): Observable<any> {
		const url = `${this.pembayaranUrl}/${id}`;
		return this.authHttp.get(url)
			.map((res: Response) => res.json());
	}

	createPembayaran(pembayaran: any) {
		let headers = new Headers({ 'Content-Type': 'application/json' });
		let options = new RequestOptions({headers: headers});
		let body = JSON.stringify(pembayaran);

		return this.authHttp.post(this.pembayaranUrl, body, options)
			.map((res: Response) => res.json());
	}
}