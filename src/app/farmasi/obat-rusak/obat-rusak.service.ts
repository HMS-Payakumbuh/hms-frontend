import { Injectable }		from '@angular/core';
import { Headers, Http, Response, RequestOptions }		from '@angular/http';
import { Observable }		from 'rxjs/Rx';

import 'rxjs/add/operator/toPromise';

import { ObatRusak }		from './obat-rusak';
import { ENV }				from '../../environment';

@Injectable()
export class ObatRusakService {
	private obatRusakUrl = ENV.obatRusakUrl;

	constructor(private http:Http) { }

	// TO-DO: Convert into Observable?
	private handleError(error: any): Promise<any> {
		console.error('An error occurred', error);
		return Promise.reject(error.message || error);
	}

	getAllObatRusak(): Observable<ObatRusak[]> {
		return this.http.get(this.obatRusakUrl)
			.map((res: Response) => res.json());
	}

	getObatRusak(id: number): Observable<ObatRusak> {
		return this.getAllObatRusak()
			.map(allObatRusak => allObatRusak.find(obat_rusak => obat_rusak.id == id));
	}

	createObatRusak(obatRusak: ObatRusak) {
		let headers = new Headers({ 'Content-Type': 'application/json' });
    	let options = new RequestOptions({ headers: headers });
    	let body = JSON.stringify(obatRusak);
    	return this.http.post(this.obatRusakUrl, body, options ).map((res: Response) => res.json());
	}
}