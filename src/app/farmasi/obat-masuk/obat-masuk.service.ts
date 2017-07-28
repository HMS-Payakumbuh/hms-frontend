import { Injectable }		from '@angular/core';
import { Headers, Http, Response, RequestOptions, URLSearchParams }		from '@angular/http';
import { Observable }		from 'rxjs/Rx';

import 'rxjs/add/operator/toPromise';

import { ObatMasuk }		from './obat-masuk';
import { ENV }				from '../../environment';

@Injectable()
export class ObatMasukService {
	private obatMasukUrl = ENV.obatMasukUrl;	
	private jenisObatUrl = ENV.jenisObatUrl;

	constructor(private http:Http) { }

	// TO-DO: Convert into Observable?
	private handleError(error: any): Promise<any> {
		console.error('An error occurred', error);
		return Promise.reject(error.message || error);
	}

	getAllObatMasuk(): Observable<ObatMasuk[]> {
		return this.http.get(this.obatMasukUrl)
			.map((res: Response) => res.json());
	}

	getObatMasuk(id: number): Observable<ObatMasuk> {
		return this.getAllObatMasuk()
			.map(allObatMasuk => allObatMasuk.find(obat_masuk => obat_masuk.id == id));
	}

	getTodayObatMasuk(id_stok_obat: number): Observable<ObatMasuk[]> {
		return this.http.get(this.obatMasukUrl + '/today/' + id_stok_obat)
			.map((res: Response) => res.json());
	}

	createObatMasuk(obatMasuk: ObatMasuk) {
		let headers = new Headers({ 'Content-Type': 'application/json' });
    	let options = new RequestOptions({ headers: headers });
    	let body = JSON.stringify(obatMasuk);
    	return this.http.post(this.obatMasukUrl, body, options ).map((res: Response) => res.json());
	}

	searchObatMasuk(barcode: string): Observable<ObatMasuk> {
		let params: URLSearchParams = new URLSearchParams();
		params.set('barcode', barcode);

		let requestOptions = new RequestOptions();
		requestOptions.params = params;

		return this.http.get(this.obatMasukUrl+'/search', requestOptions)
		    .map((res: Response) => res.json());		
		  	
	}
}