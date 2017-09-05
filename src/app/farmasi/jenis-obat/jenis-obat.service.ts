import { Injectable }		from '@angular/core';
import { Headers, Http, Response, RequestOptions }		from '@angular/http';
import { Observable }		from 'rxjs/Rx';
import { AuthHttp }				from 'angular2-jwt';

import 'rxjs/add/operator/toPromise';

import { JenisObat }		from './jenis-obat';
import { ENV }				from '../../environment';

@Injectable()
export class JenisObatService {
	private jenisObatUrl = ENV.jenisObatUrl;

	constructor(
		private http: Http,
		private authHttp: AuthHttp
	) { }

	private handleError(error: any): Promise<any> {
		console.error('An error occurred', error);
		return Promise.reject(error.message || error);
	}

	getAllJenisObat(): Observable<JenisObat[]> {
		return this.authHttp.get(this.jenisObatUrl)
			.map((res: Response) => res.json());
	}

	getJenisObat(id: number): Observable<JenisObat> {
		return this.getAllJenisObat()
			.map(allJenisObat => allJenisObat.find(jenis_obat => jenis_obat.id == id));
	}

	createJenisObat(jenisObat: JenisObat) {
		let headers = new Headers({ 'Content-Type': 'application/json' });
    	let options = new RequestOptions({ headers: headers });
    	let body = JSON.stringify(jenisObat);
    	return this.authHttp.post(this.jenisObatUrl, body, options ).map((res: Response) => res.json());
	}

	updateJenisObat(id: number, jenisObat: JenisObat) {
		let headers = new Headers({ 'Content-Type': 'application/json' });
    	let options = new RequestOptions({ headers: headers });
    	let body = JSON.stringify(jenisObat);
    	return this.authHttp.put(this.jenisObatUrl + '/' + id, body, options ).map((res: Response) => res.json());
	}
}