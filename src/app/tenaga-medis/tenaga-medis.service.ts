import { Injectable }			from '@angular/core';
import { Headers, Response, RequestOptions }		from '@angular/http';
import { Observable }			from 'rxjs/Rx';
import { AuthHttp }				from 'angular2-jwt';

import { ENV }						from '../environment';
import { Dokter }					from './dokter';
import { TenagaMedis }		from './tenaga-medis';

import * as _ from "lodash";

@Injectable()
export class TenagaMedisService {
	private tenagaMedisUrl = ENV.tenagaMedisUrl;
	private dokterUrl = ENV.dokterUrl;

	constructor(
		private authHttp: AuthHttp
	) { }

	private handleError(error: any): Promise<any> {
		console.error('An error occurred', error);
		return Promise.reject(error.message || error);
	}

	getAllTenagaMedis(): Observable<TenagaMedis[]> {
		return this.authHttp.get(this.tenagaMedisUrl)
			.map((res: Response) => res.json());
	}

	getTenagaMedis(no_pegawai: string): Observable<TenagaMedis> {
		return this.authHttp.get(this.tenagaMedisUrl + '/' + no_pegawai)
			.map((res: Response) => res.json());
	}

	createTenagaMedis(tenagaMedis: TenagaMedis) {
		let headers = new Headers({ 'Content-Type': 'application/json' });
		let options = new RequestOptions({headers: headers});
		let body = JSON.stringify(tenagaMedis);

		return this.authHttp.post(this.tenagaMedisUrl, body, options)
			.map((res: Response) => res.json());
	}

	updateTenagaMedis(no_pegawai: string, tenagaMedis: TenagaMedis) {
		let headers = new Headers({ 'Content-Type': 'application/json' });
		let options = new RequestOptions({headers: headers});
		let body = JSON.stringify(tenagaMedis);

		return this.authHttp.put(this.tenagaMedisUrl + '/' + no_pegawai, body, options)
			.map((res: Response) => res.json());
	}

	destroyTenagaMedis(no_pegawai: string) {
		let headers = new Headers({ 'Content-Type': 'application/json' });
		let options = new RequestOptions({headers: headers});

		return this.authHttp.delete(this.tenagaMedisUrl + '/' + no_pegawai, options)
			.map((res: Response) => res.json());
	}

	getAllDokter(): Observable<Dokter[]> {
		return this.authHttp.get(this.dokterUrl)
			.map((res: Response) => res.json());
	}

	getDokter(noPegawai: string): Observable<Dokter> {
		return this.authHttp.get(this.dokterUrl + '/' + noPegawai)
			.map((res: Response) => res.json());
	}

	getAllDokterOfSpesialis(spesialis: string): Observable<Dokter[]> {
		return this.authHttp.get(this.dokterUrl + '/spesialis/' + spesialis)
			.map((res: Response) => res.json());
	}

	periksa(request: any) {
		let headers = new Headers({ 'Content-Type': 'application/json' });
		let options = new RequestOptions({headers: headers});
		let body = JSON.stringify(request);

		return this.authHttp.post(this.dokterUrl + '/periksa', body, options)
			.map((res: Response) => res.json());
	}

	rujukan(request: any) {
		let headers = new Headers({ 'Content-Type': 'application/json' });
		let options = new RequestOptions({headers: headers});
		let body = JSON.stringify(request);

		return this.authHttp.post(this.dokterUrl + '/rujukan', body, options)
			.map((res: Response) => res.json());
	}
}
