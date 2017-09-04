import { Injectable }		from '@angular/core';
import { Headers, Http, Response, RequestOptions }		from '@angular/http';
import { Observable }		from 'rxjs/Rx';
import { AuthHttp }				from 'angular2-jwt';

import 'rxjs/add/operator/toPromise';

import { LokasiObat }		from './lokasi-obat';
import { ENV }				from '../../environment';

@Injectable()
export class LokasiObatService {
	private lokasiObatUrl = ENV.lokasiObatUrl;

	constructor(
		private http: Http,
		private authHttp: AuthHttp
	) { }

	private handleError(error: any): Promise<any> {
		console.error('An error occurred', error);
		return Promise.reject(error.message || error);
	}

	getAllLokasiObat(): Observable<LokasiObat[]> {
		return this.authHttp.get(this.lokasiObatUrl)
			.map((res: Response) => res.json());
	}

	getLokasiObat(id: number): Observable<LokasiObat> {
		return this.getAllLokasiObat()
			.map(allLokasiObat => allLokasiObat.find(jenis_obat => jenis_obat.id == id));
	}

	createLokasiObat(lokasiObat: LokasiObat) {
		let headers = new Headers({ 'Content-Type': 'application/json' });
    	let options = new RequestOptions({ headers: headers });
    	let body = JSON.stringify(lokasiObat);
    	return this.authHttp.post(this.lokasiObatUrl, body, options ).map((res: Response) => res.json());
	}

	updateLokasiObat(id: number, lokasiObat: LokasiObat) {
		let headers = new Headers({ 'Content-Type': 'application/json' });
		let options = new RequestOptions({headers: headers});
		let body = JSON.stringify(lokasiObat);

		return this.authHttp.put(this.lokasiObatUrl + '/' + id, body, options)
			.map((res: Response) => res.json());
	}

	destroyLokasiObat(id: number) {
		let headers = new Headers({ 'Content-Type': 'application/json' });
		let options = new RequestOptions({headers: headers});

		return this.authHttp.delete(this.lokasiObatUrl + '/' + id, options)
			.map((res: Response) => res.json());
	}
}