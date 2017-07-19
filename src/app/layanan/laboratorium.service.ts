import { Injectable }			from '@angular/core';
import { Headers, Http, Response, RequestOptions }		from '@angular/http';
import { Observable }			from 'rxjs/Rx';

import { ENV }							from '../environment';
import { Laboratorium }			from './laboratorium';

@Injectable()
export class LaboratoriumService {
	laboratoriumUrl = ENV.laboratoriumUrl;

	constructor(private http:Http) { }

	private handleError(error: any): Promise<any> {
		console.error('An error occurred', error);
		return Promise.reject(error.message || error);
	}

	getAllLaboratorium(): Observable<Laboratorium[]> {
		return this.http.get(this.laboratoriumUrl)
			.map((res: Response) => res.json());
	}

	getLaboratorium(nama: string): Observable<Laboratorium> {
		return this.http.get(this.laboratoriumUrl + '/' + nama)
			.map((res: Response) => res.json());
	}

	createLaboratorium(laboratorium: Laboratorium) {
		let headers = new Headers({ 'Content-Type': 'application/json' });
		let options = new RequestOptions({headers: headers});
		let body = JSON.stringify(laboratorium);

		return this.http.post(this.laboratoriumUrl, body, options)
			.map((res: Response) => res.json());
	}

	updateLaboratorium(nama: string, laboratorium: Laboratorium) {
		let headers = new Headers({ 'Content-Type': 'application/json' });
		let options = new RequestOptions({headers: headers});
		let body = JSON.stringify(laboratorium);

		return this.http.put(this.laboratoriumUrl + '/' + nama, body, options)
			.map((res: Response) => res.json());
	}

	destroyLaboratorium(nama: string) {
		let headers = new Headers({ 'Content-Type': 'application/json' });
		let options = new RequestOptions({headers: headers});

		return this.http.delete(this.laboratoriumUrl + '/' + nama, options)
			.map((res: Response) => res.json());
	}
}
