import { Injectable }			from '@angular/core';
import { Headers, Http, Response, RequestOptions }		from '@angular/http';
import { Observable }			from 'rxjs/Rx';

import * as _ 						from 'lodash';
import { ENV }						from '../environment';
import { Poliklinik }			from './poliklinik';

@Injectable()
export class PoliklinikService {
	poliklinikUrl = ENV.poliklinikUrl;

	constructor(private http:Http) { }

	private handleError(error: any): Promise<any> {
		console.error('An error occurred', error);
		return Promise.reject(error.message || error);
	}

	getAllPoliklinik(): Observable<Poliklinik[]> {
		return this.http.get(this.poliklinikUrl)
			.map((res: Response) => res.json());
	}

	getPoliklinik(nama: string): Observable<Poliklinik> {
		return this.getAllPoliklinik()
			.map(allPoliklinik => allPoliklinik.find(poliklinik => poliklinik.nama == nama));
	}

	createPoliklinik(poliklinik: Poliklinik) {
		let headers = new Headers({ 'Content-Type': 'application/json' });
		let options = new RequestOptions({headers: headers});
		let body = JSON.stringify(poliklinik);

		return this.http.post(this.poliklinikUrl, body, options)
			.map((res: Response) => res.json());
	}

	updatePoliklinik(nama: string, poliklinik: Poliklinik) {
		let headers = new Headers({ 'Content-Type': 'application/json' });
		let options = new RequestOptions({headers: headers});
		let body = JSON.stringify(poliklinik);

		return this.http.put(this.poliklinikUrl + '/' + nama, body, options)
			.map((res: Response) => res.json());
	}

	destroyPoliklinik(nama: string) {
		let headers = new Headers({ 'Content-Type': 'application/json' });
		let options = new RequestOptions({headers: headers});

		return this.http.delete(this.poliklinikUrl + '/' + nama, options)
			.map((res: Response) => res.json());
	}
}
