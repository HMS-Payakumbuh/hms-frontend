import { Injectable }		from '@angular/core';
import { Headers, Http, Response, RequestOptions, URLSearchParams }		from '@angular/http';
import { Observable }		from 'rxjs/Rx';

import 'rxjs/add/operator/toPromise';

import { Resep }		from './resep';
import { ENV }				from '../../environment';

@Injectable()
export class ResepService {
	private resepUrl = ENV.resepUrl;
	
	constructor(private http:Http) { }

	// TO-DO: Convert into Observable?
	private handleError(error: any): Promise<any> {
		console.error('An error occurred', error);
		return Promise.reject(error.message || error);
	}

	getAllResep(): Observable<Resep[]> {
		return this.http.get(this.resepUrl)
			.map((res: Response) => res.json());
	}

	getResep(id: number): Observable<Resep> {
		return this.getAllResep()
			.map(allResep => allResep.find(resep => resep.id == id));
	}

	createResep(resep: Resep) {
		let headers = new Headers({ 'Content-Type': 'application/json' });
    	let options = new RequestOptions({ headers: headers });
    	let body = JSON.stringify(resep);
    	return this.http.post(this.resepUrl, body, options ).map((res: Response) => res.json());
	}

	getResepByTransaksi(id_transaksi: number): Observable<Resep[]> {
		let params: URLSearchParams = new URLSearchParams();
		params.set('id_transaksi', ''+id_transaksi);

		let requestOptions = new RequestOptions();
		requestOptions.params = params;

		return this.http.get(this.resepUrl+'/search_by_transaksi', requestOptions)
		    .map((res: Response) => res.json());			
	}
}