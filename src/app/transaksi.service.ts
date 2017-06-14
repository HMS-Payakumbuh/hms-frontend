import { Injectable }		from '@angular/core';
import { Headers, Http}		from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { Transaksi }		from './transaksi';
import { ENV }				from './environment';

@Injectable()
export class TransaksiService {
	private transaksiUrl = ENV.transaksiUrl;

	constructor(private http:Http) { }

	private handleError(error: any): Promise<any> {
		console.error('An error occurred', error);
		return Promise.reject(error.message || error);
	}

	getAllTransaksi(): Promise<Transaksi[]> {
		return this.http.get(this.transaksiUrl)
			.toPromise()
			.then(response => response.json().data as Transaksi[])
			.catch(this.handleError);
	}

	getTransaksi(id: number): Promise<Transaksi> {
		const url = `${this.transaksiUrl}/${id}`;
		return this.http.get(url)
			.toPromise()
			.then(response => response.json().data as Transaksi)
			.catch(this.handleError);
	}
}