import { Injectable }		  from '@angular/core';
import { Headers, Response, RequestOptions }		from '@angular/http';
import { Observable }			from 'rxjs/Rx';
import { AuthHttp }				from 'angular2-jwt';

import { ENV }						from '../environment';
import { Pasien }	        from './pasien';
import { RekamMedis }     from './rekam-medis';

import * as _ from "lodash";

@Injectable()
export class RekamMedisService {
	private pasienUrl = ENV.pasienUrl;
    private rekamMedisUrl = ENV.rekamMedisUrl;
    private rekamMedisEksternalUrl = ENV.rekamMedisEksternalUrl;

	constructor(
		private authHttp: AuthHttp
	) { }

	private handleError(error: any): Promise<any> {
		console.error('An error occurred', error);
		return Promise.reject(error.message || error);
	}

	importRekamMedisEksternal(kode_pasien: string, no_rujukan: string): Observable<any> {
		return this.authHttp.get(this.rekamMedisEksternalUrl + '/import/' + kode_pasien + '/' + no_rujukan)
			.map((res: Response) => res.json());
	}

	createRekamMedisEksternal(rekamMedis: any) {
		let headers = new Headers({ 'Content-Type': 'application/json' });
		let options = new RequestOptions({headers: headers});
		let body = JSON.stringify(rekamMedis);
		return this.authHttp.post(this.rekamMedisEksternalUrl, body, options)
			.map((res: Response) => res.json());
	}

	getAllRekamMedisEksternalOfPasien(id_pasien: number): Observable<any[]> {
		return this.authHttp.get(this.rekamMedisEksternalUrl + '/' + id_pasien)
			.map((res: Response) => res.json());
	}

	getRekamMedisEksternalOfPasien(id_pasien: number, no_entry: number): Observable<any> {
		return this.getAllRekamMedisEksternalOfPasien(id_pasien)
			.map(allRekamMedisEksternal => _.set(allRekamMedisEksternal[no_entry], 'num_entries', allRekamMedisEksternal.length));
	}

	getAllRekamMedis(): Observable<RekamMedis[]> {
		return this.authHttp.get(this.rekamMedisUrl)
			.map((res: Response) => res.json());
	}

	getAllRekamMedisOfPasien(id_pasien: number): Observable<RekamMedis[]> {
		return this.authHttp.get(this.rekamMedisUrl + '/' + id_pasien)
			.map((res: Response) => res.json());
	}

	getRekamMedisOfPasien(id_pasien: number, no_entry: number): Observable<any> {
		return this.getAllRekamMedisOfPasien(id_pasien)
			.map(allRekamMedis => _.set(allRekamMedis[no_entry], 'num_entries', allRekamMedis.length));
	}

	createRekamMedis(rekamMedis: RekamMedis) {
		let headers = new Headers({ 'Content-Type': 'application/json' });
		let options = new RequestOptions({headers: headers});
		let body = JSON.stringify(rekamMedis);
		return this.authHttp.post(this.rekamMedisUrl, body, options)
			.map((res: Response) => res.json());
	}

	updateRekamMedis(rekamMedis: RekamMedis) {
		let headers = new Headers({ 'Content-Type': 'application/json' });
		let options = new RequestOptions({headers: headers});
		let body = JSON.stringify(rekamMedis);
		return this.authHttp.put(this.rekamMedisUrl + '/' + rekamMedis.id_pasien + '/' + rekamMedis.tanggal_waktu, body, options)
			.map((res: Response) => res.json());
	}

	destroyRekamMedis(id_pasien: number, tanggal_waktu: string) {
		let headers = new Headers({ 'Content-Type': 'application/json' });
		let options = new RequestOptions({headers: headers});
		return this.authHttp.delete(this.pasienUrl + '/' + id_pasien + '/' + tanggal_waktu, options)
			.map((res: Response) => res.json());
	}
}
