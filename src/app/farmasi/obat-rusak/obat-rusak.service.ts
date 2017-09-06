import { Injectable }		from '@angular/core';
import { Headers, Http, Response, RequestOptions, URLSearchParams }		from '@angular/http';
import { Observable }		from 'rxjs/Rx';
import { AuthHttp }				from 'angular2-jwt';

import 'rxjs/add/operator/toPromise';

import { ObatRusak }		from './obat-rusak';
import { ENV }				from '../../environment';

@Injectable()
export class ObatRusakService {
	private obatRusakUrl = ENV.obatRusakUrl;

	constructor(
		private http: Http,
		private authHttp: AuthHttp
	) { }


	private handleError(error: any): Promise<any> {
		console.error('An error occurred', error);
		return Promise.reject(error.message || error);
	}

	getAllObatRusak(): Observable<ObatRusak[]> {
		return this.authHttp.get(this.obatRusakUrl)
			.map((res: Response) => res.json());
	}

	getObatRusak(id: number): Observable<ObatRusak> {
		return this.getAllObatRusak()
			.map(allObatRusak => allObatRusak.find(obat_rusak => obat_rusak.id == id));
	}

	getObatRusakByTime(waktu_mulai: Date, waktu_selesai: Date, id_stok_obat: number): Observable<ObatRusak[]> {
		let params: URLSearchParams = new URLSearchParams();
		params.set('id_stok_obat', ''+id_stok_obat);
		params.set('waktu_mulai', waktu_mulai.toLocaleString());
		params.set('waktu_selesai', waktu_selesai.toLocaleString());

		let requestOptions = new RequestOptions();
		requestOptions.params = params;

		return this.authHttp.get(this.obatRusakUrl+'/search_by_time', requestOptions)
		    .map((res: Response) => res.json());		
	}

	createObatRusak(obatRusak: ObatRusak) {
		let headers = new Headers({ 'Content-Type': 'application/json' });
    	let options = new RequestOptions({ headers: headers });
    	let body = JSON.stringify(obatRusak);
    	return this.authHttp.post(this.obatRusakUrl, body, options ).map((res: Response) => res.json());
	}
}