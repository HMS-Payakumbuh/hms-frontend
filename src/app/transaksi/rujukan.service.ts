import { Injectable }		  from '@angular/core';
import { Headers, Http, Response, RequestOptions }		from '@angular/http';
import { Observable }			from 'rxjs/Rx';

import { ENV }						from '../environment';
import { Rujukan }     from './rujukan';

import * as _ from "lodash";

@Injectable()
export class RujukanService {
  private rujukanUrl = ENV.rujukanUrl;

	constructor(private http:Http) { }

	getAllRujukan(): Observable<Rujukan[]> {
		return this.http.get(this.rujukanUrl)
			.map((res: Response) => res.json());
	}

	createRujukan(rujukan: Rujukan) {
		let headers = new Headers({ 'Content-Type': 'application/json' });
		let options = new RequestOptions({headers: headers});
		let body = JSON.stringify(rujukan);
		return this.http.post(this.rujukanUrl, body, options)
			.map((res: Response) => res.json());
	}

	updateRujukan(rujukan: Rujukan, id_transaksi: number) {
		let headers = new Headers({ 'Content-Type': 'application/json' });
		let options = new RequestOptions({headers: headers});
		let body = JSON.stringify(rujukan);
		return this.http.put(this.rujukanUrl + '/' + id_transaksi, body, options)
			.map((res: Response) => res.json());
	}

	destroyRujukan(id_transaksi: number) {
		let headers = new Headers({ 'Content-Type': 'application/json' });
		let options = new RequestOptions({headers: headers});
		return this.http.delete(this.rujukanUrl + '/' + id_transaksi, options)
			.map((res: Response) => res.json());
	}
}
