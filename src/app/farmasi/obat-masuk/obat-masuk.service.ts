import { Injectable }		from '@angular/core';
import { Headers, Http, Response, RequestOptions, URLSearchParams }		from '@angular/http';
import { Observable }		from 'rxjs/Rx';
import { AuthHttp }				from 'angular2-jwt';

import 'rxjs/add/operator/toPromise';

import { ObatMasuk }		from './obat-masuk';
import { ENV }				from '../../environment';

@Injectable()
export class ObatMasukService {
	private obatMasukUrl = ENV.obatMasukUrl;	
	private jenisObatUrl = ENV.jenisObatUrl;

	constructor(
		private http: Http,
		private authHttp: AuthHttp
	) { }

	private handleError(error: any): Promise<any> {
		console.error('An error occurred', error);
		return Promise.reject(error.message || error);
	}

	getAllObatMasuk(): Observable<ObatMasuk[]> {
		return this.authHttp.get(this.obatMasukUrl)
			.map((res: Response) => res.json());
	}

	getObatMasuk(id: number): Observable<ObatMasuk> {
		return this.getAllObatMasuk()
			.map(allObatMasuk => allObatMasuk.find(obat_masuk => obat_masuk.id == id));
	}

	getObatMasukByTime(waktu_mulai: Date, waktu_selesai: Date, id_stok_obat: number): Observable<ObatMasuk[]> {
		let params: URLSearchParams = new URLSearchParams();
		params.set('id_stok_obat', ''+id_stok_obat);
		params.set('waktu_mulai', waktu_mulai.toLocaleString());
		params.set('waktu_selesai', waktu_selesai.toLocaleString());

		let requestOptions = new RequestOptions();
		requestOptions.params = params;

		return this.authHttp.get(this.obatMasukUrl+'/search_by_time', requestOptions)
		    .map((res: Response) => res.json());		
	}

	createObatMasuk(obatMasuk: ObatMasuk) {
		let headers = new Headers({ 'Content-Type': 'application/json' });
    	let options = new RequestOptions({ headers: headers });
    	let body = JSON.stringify(obatMasuk);
    	return this.authHttp.post(this.obatMasukUrl, body, options ).map((res: Response) => res.json());
	}

	searchObatMasuk(barcode: string): Observable<ObatMasuk> {
		let params: URLSearchParams = new URLSearchParams();
		params.set('barcode', barcode);

		let requestOptions = new RequestOptions();
		requestOptions.params = params;

		return this.authHttp.get(this.obatMasukUrl+'/search', requestOptions)
		    .map((res: Response) => res.json());		
	}
}