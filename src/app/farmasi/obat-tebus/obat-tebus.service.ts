import { Injectable }		from '@angular/core';
import { Headers, Http, Response, RequestOptions, URLSearchParams }		from '@angular/http';
import { Observable }		from 'rxjs/Rx';
import { AuthHttp }				from 'angular2-jwt';

import 'rxjs/add/operator/toPromise';

import { ObatTebus }		from './obat-tebus';
import { ObatTebusItem }		from './obat-tebus-item';
import { ENV }				from '../../environment';

@Injectable()
export class ObatTebusService {
	private obatTebusUrl = ENV.obatTebusUrl;

	constructor(
		private http: Http,
		private authHttp: AuthHttp
	) { }

	private handleError(error: any): Promise<any> {
		console.error('An error occurred', error);
		return Promise.reject(error.message || error);
	}

	getAllObatTebus(): Observable<ObatTebus[]> {
		return this.authHttp.get(this.obatTebusUrl)
			.map((res: Response) => res.json());
	}

	getObatTebus(id: number): Observable<ObatTebus> {
		return this.getAllObatTebus()
			.map(allObatTebus => allObatTebus.find(obat_tebus => obat_tebus.id == id));
	}

	getObatTebusByTime(waktu_mulai: Date, waktu_selesai: Date, id_stok_obat: number): Observable<ObatTebusItem[]> {
		let params: URLSearchParams = new URLSearchParams();
		params.set('id_stok_obat', ''+id_stok_obat);
		params.set('waktu_mulai', waktu_mulai.toLocaleString());
		params.set('waktu_selesai', waktu_selesai.toLocaleString());

		let requestOptions = new RequestOptions();
		requestOptions.params = params;

		return this.authHttp.get(this.obatTebusUrl+'/search_by_time', requestOptions)
		    .map((res: Response) => res.json());		
	}

	createObatTebus(obatTebus: ObatTebus) {
		let headers = new Headers({ 'Content-Type': 'application/json' });
    	let options = new RequestOptions({ headers: headers });
    	let body = JSON.stringify(obatTebus);
    	return this.authHttp.post(this.obatTebusUrl, body, options ).map((res: Response) => res.json());
	}
}