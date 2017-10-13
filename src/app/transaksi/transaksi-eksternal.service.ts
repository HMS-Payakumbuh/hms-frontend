import { Injectable }		from '@angular/core';
import { Headers, Http, Response, RequestOptions, URLSearchParams }		from '@angular/http';
import { Observable }		from 'rxjs/Rx';
import { AuthHttp }			from 'angular2-jwt';

import 'rxjs/add/operator/toPromise';

import { Transaksi }		from './transaksi';
import { ENV }				from '../environment';

@Injectable()
export class TransaksiEksternalService {
	private transaksiEksternalUrl = ENV.transaksiEksternalUrl;
	private storedData: any = null;

	constructor(
		private http: Http,
		private authHttp: AuthHttp
	) {
		this.storedData = null;
	}

	private handleError(error: any): Promise<any> {
		console.error('An error occurred', error);
		return Promise.reject(error.message || error);
	}

	getAllTransaksi(status: string = null): Observable<any[]> {
		let params: URLSearchParams = new URLSearchParams();
		params.set('status', status);

		let requestOptions = new RequestOptions();
		requestOptions.params = params;

		return this.authHttp.get(this.transaksiEksternalUrl, requestOptions)
			.map((res: Response) => res.json());
	}

	getTransaksi(id: number): Observable<any> {
		const url = `${this.transaksiEksternalUrl}/${id}`;
		return this.authHttp.get(url)
			.map((res: Response) => res.json());
	}
}
