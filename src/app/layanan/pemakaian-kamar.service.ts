import { Injectable }			from '@angular/core';
import { Headers, Http, Response, RequestOptions }	from '@angular/http';
import { Observable }			from 'rxjs/Rx';

import { ENV }						from '../environment';
import { PemakaianKamar }			from './pemakaian-kamar';

@Injectable()
export class PemakaianKamarService {
	rawatinapUrl = ENV.rawatinapUrl;

	constructor(private http:Http) { }

	private handleError(error: any): Promise<any> {
		console.error('An error occurred', error);
		return Promise.reject(error.message || error);
	}

	getAllPemakaianKamar(): Observable<PemakaianKamar[]> {
		return this.http.get(this.rawatinapUrl)
			.map((res: Response) => res.json());
	}

	getPemakaianKamar(no_kamar: string): Observable<PemakaianKamar> {
		return this.getAllPemakaianKamar()
			.map(allRawatinap => allRawatinap.find(Rawatinap => Rawatinap.no_kamar == no_kamar));
	}

	createPemakaianKamar(no_kamar : string, PemakaianKamar: PemakaianKamar) {
		let headers = new Headers({ 'Content-Type': 'application/json' });
		let options = new RequestOptions({headers: headers});
		let body = JSON.stringify(PemakaianKamar);

		return this.http.post(this.rawatinapUrl + '/' + no_kamar, body, options)
			.map((res: Response) => res.json());
	}

	updatePemakaianKamar(no_kamar: string, PemakaianKamar: PemakaianKamar) {
		let headers = new Headers({ 'Content-Type': 'application/json' });
		let options = new RequestOptions({headers: headers});
		let body = JSON.stringify(PemakaianKamar);

		return this.http.put(this.rawatinapUrl + '/' + no_kamar, body, options)
			.map((res: Response) => res.json());
	}

	destroyPemakaianKamar(no_kamar: string) {
		let headers = new Headers({ 'Content-Type': 'application/json' });
		let options = new RequestOptions({headers: headers});

		return this.http.delete(this.rawatinapUrl + '/' + no_kamar, options)
			.map((res: Response) => res.json());
	}
}