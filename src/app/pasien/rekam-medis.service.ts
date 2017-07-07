import { Injectable }		  from '@angular/core';
import { Headers, Http, Response, RequestOptions }		from '@angular/http';
import { Observable }			from 'rxjs/Rx';

import { ENV }						from '../environment';
import { Pasien }	        from './pasien';
import { RekamMedis }     from './rekam-medis';

@Injectable()
export class RekamMedisService {
	private pasienUrl = ENV.pasienUrl;
  private rekamMedisUrl = ENV.rekamMedisUrl;

	constructor(private http:Http) { }

	private handleError(error: any): Promise<any> {
		console.error('An error occurred', error);
		return Promise.reject(error.message || error);
	}

	getAllRekamMedis(): Observable<RekamMedis[]> {
		return this.http.get(this.rekamMedisUrl)
			.map((res: Response) => res.json());
	}

	getRekamMedisOfPasien(id_pasien: number): Observable<RekamMedis> {
		return this.getAllRekamMedis()
			.map(allRekamMedis => allRekamMedis.find(rekamMedis => rekamMedis.id_pasien === id_pasien))
			.catch(this.handleError);
	}

	createRekamMedis(rekamMedis: RekamMedis) {
		let headers = new Headers({ 'Content-Type': 'application/json' });
		let options = new RequestOptions({headers: headers});
		let body = JSON.stringify(rekamMedis);
		return this.http.post(this.rekamMedisUrl, body, options)
			.map((res: Response) => res.json());
	}

	updateRekamMedis(rekamMedis: RekamMedis) {
		let headers = new Headers({ 'Content-Type': 'application/json' });
		let options = new RequestOptions({headers: headers});
		let body = JSON.stringify(rekamMedis);
		return this.http.put(this.rekamMedisUrl + '/' + rekamMedis.id_pasien + '/' + rekamMedis.tanggal_waktu, body, options)
			.map((res: Response) => res.json());
	}

	destroyRekamMedis(id_pasien: number, tanggal_waktu: string) {
		let headers = new Headers({ 'Content-Type': 'application/json' });
		let options = new RequestOptions({headers: headers});
		return this.http.delete(this.pasienUrl + '/' + id_pasien + '/' + tanggal_waktu, options)
			.map((res: Response) => res.json());
	}
}
