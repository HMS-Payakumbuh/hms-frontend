import { Injectable }			from '@angular/core';
import { Headers, Http, Response, RequestOptions }		from '@angular/http';
import { Observable }			from 'rxjs/Rx';

import { ENV }							from '../environment';
import { Ambulans }			from './ambulans';

@Injectable()
export class AmbulansService {
	ambulansUrl = ENV.ambulansUrl;

	constructor(private http:Http) { }

	private handleError(error: any): Promise<any> {
		console.error('An error occurred', error);
		return Promise.reject(error.message || error);
	}

	getAllAmbulans(): Observable<Ambulans[]> {
		return this.http.get(this.ambulansUrl)
			.map((res: Response) => res.json());
	}

	getAmbulans(nama: string): Observable<Ambulans> {
		return this.getAllAmbulans()
			.map(allAmbulans => allAmbulans.find(ambulans => ambulans.nama == nama));
	}

	createAmbulans(ambulans: Ambulans) {
		let headers = new Headers({ 'Content-Type': 'application/json' });
		let options = new RequestOptions({headers: headers});
		let body = JSON.stringify(ambulans);

		return this.http.post(this.ambulansUrl, body, options)
			.map((res: Response) => res.json());
	}

	updateAmbulans(nama: string, ambulans: Ambulans) {
		let headers = new Headers({ 'Content-Type': 'application/json' });
		let options = new RequestOptions({headers: headers});
		let body = JSON.stringify(ambulans);

		return this.http.put(this.ambulansUrl + '/' + nama, body, options)
			.map((res: Response) => res.json());
	}

	destroyAmbulans(nama: string) {
		let headers = new Headers({ 'Content-Type': 'application/json' });
		let options = new RequestOptions({headers: headers});

		return this.http.delete(this.ambulansUrl + '/' + nama, options)
			.map((res: Response) => res.json());
	}
}
