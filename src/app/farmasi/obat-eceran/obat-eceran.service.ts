import { Injectable }		from '@angular/core';
import { Headers, Http, Response, RequestOptions, URLSearchParams }		from '@angular/http';
import { Observable }		from 'rxjs/Rx';
import { AuthHttp }				from 'angular2-jwt';

import 'rxjs/add/operator/toPromise';

import { ObatEceran }		from './obat-eceran';
import { ObatEceranItem }		from './obat-eceran-item';
import { ENV }				from '../../environment';

@Injectable()
export class ObatEceranService {
	private obatEceranUrl = ENV.obatEceranUrl;
	
	constructor(
		private http: Http,
		private authHttp: AuthHttp
	) { }

	private handleError(error: any): Promise<any> {
		console.error('An error occurred', error);
		return Promise.reject(error.message || error);
	}

	getAllObatEceran(): Observable<ObatEceran[]> {
		return this.authHttp.get(this.obatEceranUrl)
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
    	return this.authHttp.post(this.obatEceranUrl, body, options ).map((res: Response) => res.json());
	}

	getObatEceranByTime(waktu_mulai: Date, waktu_selesai: Date, id_stok_obat: number): Observable<ObatEceranItem[]> {
		let params: URLSearchParams = new URLSearchParams();
		params.set('id_stok_obat', ''+id_stok_obat);
		params.set('waktu_mulai', waktu_mulai.toLocaleString());
		params.set('waktu_selesai', waktu_selesai.toLocaleString());

		let requestOptions = new RequestOptions();
		requestOptions.params = params;

		return this.authHttp.get(this.obatEceranUrl+'/search_by_time', requestOptions)
		    .map((res: Response) => res.json());		
	}

}