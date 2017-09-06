import { Injectable }		from '@angular/core';
import { Headers, Http, Response, RequestOptions, URLSearchParams }		from '@angular/http';
import { Observable }		from 'rxjs/Rx';
import { AuthHttp }				from 'angular2-jwt';

import 'rxjs/add/operator/toPromise';

import { ObatPindah }		from './obat-pindah';
import { ENV }				from '../../environment';

@Injectable()
export class ObatPindahService {
	private obatPindahUrl = ENV.obatPindahUrl;

	constructor(
		private http: Http,
		private authHttp: AuthHttp
	) { }

	private handleError(error: any): Promise<any> {
		console.error('An error occurred', error);
		return Promise.reject(error.message || error);
	}

	getAllObatPindah(): Observable<ObatPindah[]> {
		return this.authHttp.get(this.obatPindahUrl)
			.map((res: Response) => res.json());
	}

	getObatPindah(id: number): Observable<ObatPindah> {
		return this.getAllObatPindah()
			.map(allObatPindah => allObatPindah.find(obat_pindah => obat_pindah.id == id));
	}

	getObatPindahKeluarByTime(waktu_mulai: Date, waktu_selesai: Date, id_stok_obat: number): Observable<ObatPindah[]> {
		let params: URLSearchParams = new URLSearchParams();
		params.set('id_stok_obat', ''+id_stok_obat);
		params.set('waktu_mulai', waktu_mulai.toLocaleString());
		params.set('waktu_selesai', waktu_selesai.toLocaleString());

		let requestOptions = new RequestOptions();
		requestOptions.params = params;

		return this.authHttp.get(this.obatPindahUrl+'/search_by_time/keluar', requestOptions)
		    .map((res: Response) => res.json());		
	}

	getObatPindahMasukByTime(waktu_mulai: Date, waktu_selesai: Date, id_stok_obat: number): Observable<ObatPindah[]> {
		let params: URLSearchParams = new URLSearchParams();
		params.set('id_stok_obat', ''+id_stok_obat);
		params.set('waktu_mulai', waktu_mulai.toLocaleString());
		params.set('waktu_selesai', waktu_selesai.toLocaleString());

		let requestOptions = new RequestOptions();
		requestOptions.params = params;

		return this.authHttp.get(this.obatPindahUrl+'/search_by_time/masuk', requestOptions)
		    .map((res: Response) => res.json());		
	}

	createObatPindah(obatPindah: ObatPindah) {
		let headers = new Headers({ 'Content-Type': 'application/json' });
    	let options = new RequestOptions({ headers: headers });
    	let body = JSON.stringify(obatPindah);
    	return this.authHttp.post(this.obatPindahUrl, body, options ).map((res: Response) => res.json());
	}
}