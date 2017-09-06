import { Injectable }		from '@angular/core';
import { Headers, Http, Response, RequestOptions, URLSearchParams }		from '@angular/http';
import { Observable }		from 'rxjs/Rx';
import { AuthHttp }				from 'angular2-jwt';

import 'rxjs/add/operator/toPromise';

import { Transaksi }		from './transaksi';
import { ENV }				from '../environment';

@Injectable()
export class TransaksiService {
	private transaksiUrl = ENV.transaksiUrl;
	private sepUrl = ENV.sepUrl;
	private storedData: any = null;

	constructor(
		private http:Http,
		private authHttp: AuthHttp
	) {
		this.storedData = null;
	}

	private handleError(error: any): Promise<any> {
		console.error('An error occurred', error);
		return Promise.reject(error.message || error);
	}

	getAllTransaksi(kode_pasien: string = null, nama_pasien: string = null, status: string = null): Observable<any[]> {
		let params: URLSearchParams = new URLSearchParams();
		params.set('kode_pasien', kode_pasien);
		params.set('nama_pasien', nama_pasien);
		params.set('status', status);

		let requestOptions = new RequestOptions();
		requestOptions.params = params;

		return this.authHttp.get(this.transaksiUrl, requestOptions)
			.map((res: Response) => res.json());
	}

	getTransaksi(id: number): Observable<any> {
		const url = `${this.transaksiUrl}/${id}`;
		return this.authHttp.get(url)
			.map((res: Response) => res.json());
	}

	getRecentTransaksi(nama_pasien : string): Observable<any[]> {
		const url = `${this.transaksiUrl}` + '/' + "search" + '/' + nama_pasien;
		return this.authHttp.get(url)
			.map((res: Response) => res.json());
	}

	getLatestOpenTransaksi(id_pasien : number): Observable<Transaksi> {
		const url = `${this.transaksiUrl}` + '/' + "latest" + '/' + id_pasien;
		return this.authHttp.get(url)
			.map((res: Response) => res.json());
	}

	getRujukan(no_rujukan : string): Observable<any> {
		let params: URLSearchParams = new URLSearchParams();
		params.set('fk', '1');

		let requestOptions = new RequestOptions();
		requestOptions.params = params;

		return this.authHttp.get(this.sepUrl + '/' + no_rujukan, requestOptions)
			.map((res: Response) => res.json());
	}

	updateTransaksi(transaksi: any, id: number) {
		let headers = new Headers({ 'Content-Type': 'application/json' });
		let options = new RequestOptions({headers: headers});
		let body = JSON.stringify(transaksi);

		const url = `${this.transaksiUrl}/${id}`
		return this.authHttp.put(url, body, options)
			.map((res: Response) => res.json());
	}

	createTransaksi(transaksi: any) {
		let headers = new Headers({ 'Content-Type': 'application/json' });
		let options = new RequestOptions({headers: headers});
		let body = JSON.stringify(transaksi);
		console.log(body);

		return this.authHttp.post(this.transaksiUrl, body, options)
			.map((res: Response) => res.json());
	}

	getTransaksiByPasien(id_pasien: number): Observable<Transaksi[]> {
		let params: URLSearchParams = new URLSearchParams();
		params.set('id_pasien', ''+id_pasien);

		let requestOptions = new RequestOptions();
		requestOptions.params = params;

		return this.authHttp.get(this.transaksiUrl+'/search_by_pasien', requestOptions)
		    .map((res: Response) => res.json());
	}

	getStatusBpjs(id: number): Observable<any> {
		const url = `${this.transaksiUrl}/${id}/bpjs`;
		return this.authHttp.get(url)
			.map((res: Response) => res.json());
	}
}
