import { Injectable }		from '@angular/core';
import { Headers, Http, Response, RequestOptions }		from '@angular/http';
import { Observable }		from 'rxjs/Rx';

import 'rxjs/add/operator/toPromise';

import { ObatEceran }		from './obat-eceran';
import { ENV }				from '../../environment';

@Injectable()
export class ObatEceranService {
	private obatEceranUrl = ENV.obatEceranUrl;
	
	constructor(private http:Http) { }

	// TO-DO: Convert into Observable?
	private handleError(error: any): Promise<any> {
		console.error('An error occurred', error);
		return Promise.reject(error.message || error);
	}

	getAllObatEceran(): Observable<ObatEceran[]> {
		return this.http.get(this.obatEceranUrl)
			.map((res: Response) => res.json());
	}

	getObatEceran(id: number): Observable<ObatEceran> {
		return this.getAllObatEceran()
			.map(allObatEceran => allObatEceran.find(obat_eceran => obat_eceran.id == id));
	}

	createObatEceran(obatEceran: ObatEceran) {
		let headers = new Headers({ 'Content-Type': 'application/json' });
    	let options = new RequestOptions({ headers: headers });
    	let body = JSON.stringify(obatEceran);
    	return this.http.post(this.obatEceranUrl, body, options ).map((res: Response) => res.json());
	}
}