import { Injectable }		from '@angular/core';
import { Headers, Http, Response, RequestOptions }		from '@angular/http';
import { Observable }		from 'rxjs/Rx';

import 'rxjs/add/operator/toPromise';

import { ObatTebus }		from './obat-tebus';
import { ENV }				from '../../environment';

@Injectable()
export class ObatTebusService {
	private obatTebusUrl = ENV.obatTebusUrl;

	constructor(private http:Http) { }

	// TO-DO: Convert into Observable?
	private handleError(error: any): Promise<any> {
		console.error('An error occurred', error);
		return Promise.reject(error.message || error);
	}

	getAllObatTebus(): Observable<ObatTebus[]> {
		return this.http.get(this.obatTebusUrl)
			.map((res: Response) => res.json());
	}

	getObatTebus(id: number): Observable<ObatTebus> {
		return this.getAllObatTebus()
			.map(allObatTebus => allObatTebus.find(obat_tebus => obat_tebus.id == id));
	}

	createObatTebus(obatTebus: ObatTebus) {
		let headers = new Headers({ 'Content-Type': 'application/json' });
    	let options = new RequestOptions({ headers: headers });
    	let body = JSON.stringify(obatTebus);
    	return this.http.post(this.obatTebusUrl, body, options ).map((res: Response) => res.json());
	}
}