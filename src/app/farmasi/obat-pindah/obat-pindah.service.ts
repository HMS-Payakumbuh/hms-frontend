import { Injectable }		from '@angular/core';
import { Headers, Http, Response, RequestOptions }		from '@angular/http';
import { Observable }		from 'rxjs/Rx';

import 'rxjs/add/operator/toPromise';

import { ObatPindah }		from './obat-pindah';
import { ENV }				from '../../environment';

@Injectable()
export class ObatPindahService {
	private obatPindahUrl = ENV.obatPindahUrl;

	constructor(private http:Http) { }

	// TO-DO: Convert into Observable?
	private handleError(error: any): Promise<any> {
		console.error('An error occurred', error);
		return Promise.reject(error.message || error);
	}

	getAllObatPindah(): Observable<ObatPindah[]> {
		return this.http.get(this.obatPindahUrl)
			.map((res: Response) => res.json());
	}

	getObatPindah(id: number): Observable<ObatPindah> {
		return this.getAllObatPindah()
			.map(allObatPindah => allObatPindah.find(obat_pindah => obat_pindah.id == id));
	}

	createObatPindah(obatPindah: ObatPindah) {
		let headers = new Headers({ 'Content-Type': 'application/json' });
    	let options = new RequestOptions({ headers: headers });
    	let body = JSON.stringify(obatPindah);
    	return this.http.post(this.obatPindahUrl, body, options ).map((res: Response) => res.json());
	}
}