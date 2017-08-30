import { Injectable }			from '@angular/core';
import { Headers, Http, Response, RequestOptions }		from '@angular/http';
import { Observable }			from 'rxjs/Rx';
import { AuthHttp }				from 'angular2-jwt';

import { ENV }							from '../environment';
import { Ambulans }			from './ambulans';

@Injectable()
export class AmbulansService {
	ambulansUrl = ENV.ambulansUrl;

	constructor(
		private authHttp: AuthHttp
	) { }

	private handleError(error: any): Promise<any> {
		console.error('An error occurred', error);
		return Promise.reject(error.message || error);
	}

	getAllAmbulans(): Observable<Ambulans[]> {
		return this.authHttp.get(this.ambulansUrl)
			.map((res: Response) => res.json());
	}

	getAllAvailableAmbulans(): Observable<Ambulans[]> {
		return this.authHttp.get(this.ambulansUrl + '/available')
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

		return this.authHttp.post(this.ambulansUrl, body, options)
			.map((res: Response) => res.json());
	}

	updateAmbulans(nama: string, ambulans: Ambulans) {
		let headers = new Headers({ 'Content-Type': 'application/json' });
		let options = new RequestOptions({headers: headers});
		let body = JSON.stringify(ambulans);

		return this.authHttp.put(this.ambulansUrl + '/' + nama, body, options)
			.map((res: Response) => res.json());
	}

	destroyAmbulans(nama: string) {
		let headers = new Headers({ 'Content-Type': 'application/json' });
		let options = new RequestOptions({headers: headers});

		return this.authHttp.delete(this.ambulansUrl + '/' + nama, options)
			.map((res: Response) => res.json());
	}
}
