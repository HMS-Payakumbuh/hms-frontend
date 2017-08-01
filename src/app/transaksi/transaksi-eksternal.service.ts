import { Injectable }		from '@angular/core';
import { Headers, Http, Response, RequestOptions, URLSearchParams }		from '@angular/http';
import { Observable }		from 'rxjs/Rx';

import 'rxjs/add/operator/toPromise';

import { Transaksi }		from './transaksi';
import { ENV }				from '../environment';

@Injectable()
export class TransaksiEksternalService {
	private transaksiEksternalUrl = ENV.transaksiEksternalUrl;
	private storedData: any = null;

	constructor(private http:Http) {
		this.storedData = null;
	}

	private handleError(error: any): Promise<any> {
		console.error('An error occurred', error);
		return Promise.reject(error.message || error);
	}

	getAllTransaksi(kode_pasien: string = null, status: string = null): Observable<any[]> {
		let params: URLSearchParams = new URLSearchParams();

		return this.http.get(this.transaksiEksternalUrl)
			.map((res: Response) => res.json());
	}

	getTransaksi(id: number): Observable<any> {
		const url = `${this.transaksiEksternalUrl}/${id}`;
		return this.http.get(url)
			.map((res: Response) => res.json());
	}
}
