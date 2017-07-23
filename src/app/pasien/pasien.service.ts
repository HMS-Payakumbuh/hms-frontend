import { Injectable }		from '@angular/core';
import { Headers, Http, Response, RequestOptions }		from '@angular/http';
import { Observable }			from 'rxjs/Rx';
import * as _ from "lodash";

import { ENV }						from '../environment';
import { Pasien }	from './pasien';
import { Asuransi }  from './asuransi';

@Injectable()
export class PasienService {
	private pasienUrl = ENV.pasienUrl;

	constructor(private http:Http) { }

	private handleError(error: any): Promise<any> {
		console.error('An error occurred', error);
		return Promise.reject(error.message || error);
	}

	getAllPasien(): Observable<Pasien[]> {
		return this.http.get(this.pasienUrl)
			.map((res: Response) => res.json());
	}

	getPasien(kode_pasien: string): Observable<Pasien> {
		return this.getAllPasien()
			.map(allPasien => allPasien.find(pasien => pasien.kode_pasien === kode_pasien))
			.catch(this.handleError);
	}

	getPasienByName(key: string): Observable<Pasien[]> {
		return this.getAllPasien()
			.map(allPasien => 
				_.filter(allPasien, pasien => 
					pasien.nama_pasien.match(new RegExp(key, 'gi'))
				)
			)
			.catch(this.handleError);
	}

	createPasien(pasien: Pasien) {
		let headers = new Headers({ 'Content-Type': 'application/json' });
		let options = new RequestOptions({headers: headers});
		let body = JSON.stringify(pasien);

		return this.http.post(this.pasienUrl, body, options)
			.map((res: Response) => res.json());
	}

	updatePasien(id: number, pasien: Pasien) {
		let headers = new Headers({ 'Content-Type': 'application/json' });
		let options = new RequestOptions({headers: headers});
		let body = JSON.stringify(pasien);

		return this.http.put(this.pasienUrl + '/' + id, body, options)
			.map((res: Response) => res.json());
	}

	destroyPasien(id: number) {
		let headers = new Headers({ 'Content-Type': 'application/json' });
		let options = new RequestOptions({headers: headers});

		return this.http.delete(this.pasienUrl + '/' + id, options)
			.map((res: Response) => res.json());
	}
}