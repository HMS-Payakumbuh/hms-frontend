import { Injectable }			from '@angular/core';
import { Headers, Http, Response, RequestOptions }	from '@angular/http';
import { Observable }			from 'rxjs/Rx';

import { ENV }						from '../environment';
import { Rawatinap }			from './rawatinap';

@Injectable()
export class RawatinapService {
	rawatinapUrl = ENV.rawatinapUrl;

	constructor(private http:Http) { }

	private handleError(error: any): Promise<any> {
		console.error('An error occurred', error);
		return Promise.reject(error.message || error);
	}

	getAllRawatinap(): Observable<Rawatinap[]> {
		return this.http.get(this.rawatinapUrl)
			.map((res: Response) => res.json());
	}

	getAllAvailableRawatinap() : Observable<Rawatinap[]> {
		return this.getAllRawatinap()
		.map(allRawatinap => allRawatinap.filter(rawatinap => rawatinap.available_kamar != 0 && rawatinap.jenis_kamar == "Rawat Inap"));
	}

	getAllAvailableICU() : Observable<Rawatinap[]> {
		return this.getAllRawatinap()
		.map(allRawatinap => allRawatinap.filter(rawatinap => rawatinap.available_kamar != 0 && rawatinap.jenis_kamar == "ICU"));
	}

	getRawatinap(no_kamar: string): Observable<Rawatinap> {
		return this.getAllRawatinap()
			.map(allRawatinap => allRawatinap.find(Rawatinap => Rawatinap.no_kamar == no_kamar));
	}

	createRawatinap(Rawatinap: Rawatinap) {
		let headers = new Headers({ 'Content-Type': 'application/json' });
		let options = new RequestOptions({headers: headers});
		let body = JSON.stringify(Rawatinap);

		return this.http.post(this.rawatinapUrl, body, options)
			.map((res: Response) => res.json());
	}

	updateRawatinap(no_kamar: string, Rawatinap: Rawatinap) {
		let headers = new Headers({ 'Content-Type': 'application/json' });
		let options = new RequestOptions({headers: headers});
		let body = JSON.stringify(Rawatinap);

		return this.http.put(this.rawatinapUrl + '/' + no_kamar, body, options)
			.map((res: Response) => res.json());
	}

	destroyRawatinap(no_kamar: string) {
		let headers = new Headers({ 'Content-Type': 'application/json' });
		let options = new RequestOptions({headers: headers});

		return this.http.delete(this.rawatinapUrl + '/' + no_kamar, options)
			.map((res: Response) => res.json());
	}
}