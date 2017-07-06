import { Injectable }		from '@angular/core';
import { Headers, Http, Response, RequestOptions }		from '@angular/http';
import { Observable }			from 'rxjs/Rx';
import * as _ from "lodash";

import { ENV }						from '../environment';
import { Asuransi }	from './asuransi';

@Injectable()
export class AsuransiService {
	private asuransiUrl = ENV.asuransiUrl;

	constructor(private http:Http) { }

	private handleError(error: any): Promise<any> {
		console.error('An error occurred', error);
		return Promise.reject(error.message || error);
	}

	getAllAsuransi(): Observable<Asuransi[]> {
		return this.http.get(this.asuransiUrl)
			.map((res: Response) => res.json());
	}

	getAsuransi(id_pasien: number): Observable<Asuransi[]> {
		return this.http.get(this.asuransiUrl + '/search/' + id_pasien)
			.map((res: Response) => res.json());
	}

	createAsuransi(asuransi: Asuransi) {
		let headers = new Headers({ 'Content-Type': 'application/json' });
		let options = new RequestOptions({headers: headers});
		let body = JSON.stringify(asuransi);

		return this.http.post(this.asuransiUrl, body, options)
			.map((res: Response) => res.json());
	}
}