import { Injectable }			from '@angular/core';
import { Headers, Response, RequestOptions, Http }		from '@angular/http';
import { Observable }			from 'rxjs/Rx';
import { AuthHttp }				from 'angular2-jwt';

import { ENV }						from '../environment';
import { Poliklinik }			from './poliklinik';

@Injectable()
export class PoliklinikService {
	poliklinikUrl = ENV.poliklinikUrl;

	constructor(
		private authHttp: AuthHttp,
		private http: Http
	) { }

	private handleError(error: any): Promise<any> {
		console.error('An error occurred', error);
		return Promise.reject(error.message || error);
	}

	getAllPoliklinik(): Observable<Poliklinik[]> {
		return this.http.get(this.poliklinikUrl)
			.map((res: Response) => res.json());
	}

	getPoliklinik(nama: string): Observable<Poliklinik> {
		return this.authHttp.get(this.poliklinikUrl + '/' + nama)
			.map((res: Response) => res.json());
	}

	createPoliklinik(poliklinik: Poliklinik) {
		let headers = new Headers({ 'Content-Type': 'application/json' });
		let options = new RequestOptions({headers: headers});
		let body = JSON.stringify(poliklinik);

		return this.authHttp.post(this.poliklinikUrl, body, options)
			.map((res: Response) => res.json());
	}

	updatePoliklinik(nama: string, poliklinik: Poliklinik) {
		let headers = new Headers({ 'Content-Type': 'application/json' });
		let options = new RequestOptions({headers: headers});
		let body = JSON.stringify(poliklinik);

		return this.authHttp.put(this.poliklinikUrl + '/' + nama, body, options)
			.map((res: Response) => res.json());
	}

	destroyPoliklinik(nama: string) {
		let headers = new Headers({ 'Content-Type': 'application/json' });
		let options = new RequestOptions({headers: headers});

		return this.authHttp.delete(this.poliklinikUrl + '/' + nama, options)
			.map((res: Response) => res.json());
	}
}
