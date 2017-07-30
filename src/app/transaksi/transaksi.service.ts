import { Injectable }		from '@angular/core';
import { Headers, Http, Response, RequestOptions, URLSearchParams }		from '@angular/http';
import { Observable }		from 'rxjs/Rx';

import 'rxjs/add/operator/toPromise';

import { Transaksi }		from './transaksi';
import { ENV }				from '../environment';

@Injectable()
export class TransaksiService {
	private transaksiUrl = ENV.transaksiUrl;
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
		params.set('kode_pasien', kode_pasien);
		params.set('status', status);

		let requestOptions = new RequestOptions();
		requestOptions.params = params;

		return this.http.get(this.transaksiUrl, requestOptions)
			.map((res: Response) => res.json());
	}

	getTransaksi(id: number): Observable<any> {
		const url = `${this.transaksiUrl}/${id}`;
		return this.http.get(url)
			.map((res: Response) => res.json());
	}

	getRecentTransaksi(nama_pasien : string): Observable<any[]> {
		const url = `${this.transaksiUrl}` + '/' + "search" + '/' + nama_pasien;
		return this.http.get(url)
			.map((res: Response) => res.json());
	}

	getLatestOpenTransaksi(id_pasien : number): Observable<Transaksi> {
		const url = `${this.transaksiUrl}` + '/' + "latest" + '/' + id_pasien;
		return this.http.get(url)
			.map((res: Response) => res.json());
	}

	updateTransaksi(transaksi: any, id: number) {
		let headers = new Headers({ 'Content-Type': 'application/json' });
		let options = new RequestOptions({headers: headers});
		let body = JSON.stringify(transaksi);

		const url = `${this.transaksiUrl}/${id}`
		return this.http.put(url, body, options)
			.map((res: Response) => res.json());
	}

	createTransaksi(transaksi: any) {
		let headers = new Headers({ 'Content-Type': 'application/json' });
		let options = new RequestOptions({headers: headers});
		let body = JSON.stringify(transaksi);
		console.log(body);

		return this.http.post(this.transaksiUrl, body, options)
			.map((res: Response) => res.json());
	}

	getTransaksiByKodePasien(kode_pasien: string): Observable<Transaksi[]> {
		return this.http.get(this.transaksiUrl + '/' + kode_pasien + '/kode_pasien')
			.map((res: Response) => res.json());
	}

	getTransaksiByPasien(id_pasien: number): Observable<Transaksi[]> {
		let params: URLSearchParams = new URLSearchParams();
		params.set('id_pasien', ''+id_pasien);

		let requestOptions = new RequestOptions();
		requestOptions.params = params;

		return this.http.get(this.transaksiUrl+'/search_by_pasien', requestOptions)
		    .map((res: Response) => res.json());
	}

	getStatusBpjs(id: number): Observable<any> {
		const url = `${this.transaksiUrl}/${id}/bpjs`;
		return this.http.get(url)
			.map((res: Response) => res.json());
	}
}
