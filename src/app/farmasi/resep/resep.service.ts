import { Injectable }		from '@angular/core';
import { Headers, Http, Response, RequestOptions, URLSearchParams }		from '@angular/http';
import { Observable }		from 'rxjs/Rx';
import { AuthHttp }				from 'angular2-jwt';

import 'rxjs/add/operator/toPromise';

import { Resep }		from './resep';
import { ENV }				from '../../environment';

@Injectable()
export class ResepService {
	private resepUrl = ENV.resepUrl;

	constructor(
		private http: Http,
		private authHttp: AuthHttp
	) { }

	private handleError(error: any): Promise<any> {
		console.error('An error occurred', error);
		return Promise.reject(error.message || error);
	}

	getAllResep(): Observable<Resep[]> {
		return this.authHttp.get(this.resepUrl)
			.map((res: Response) => res.json());
	}

	getResep(id: number): Observable<Resep> {
		return this.getAllResep()
			.map(allResep => allResep.find(resep => resep.id == id));
	}

	getResepOfRekamMedis(id_pasien: number, tanggal_waktu: number): Observable<Resep[]> {
		return this.authHttp.get(this.resepUrl + '/rekam_medis/' + id_pasien + '/' + tanggal_waktu)
			.map((res: Response) => res.json());
	}

	createResep(resep: Resep[]) {
		let headers = new Headers({ 'Content-Type': 'application/json' });
    	let options = new RequestOptions({ headers: headers });
    	let body = JSON.stringify(resep);
    	return this.authHttp.post(this.resepUrl, body, options ).map((res: Response) => res.json());
	}

	createSingleResep(resep: Resep) {
		let headers = new Headers({ 'Content-Type': 'application/json' });
    	let options = new RequestOptions({ headers: headers });
    	let body = JSON.stringify(resep);
    	return this.authHttp.post(this.resepUrl, body, options ).map((res: Response) => res.json());
	}

	getResepByPasien(id_pasien: number) {
		let params: URLSearchParams = new URLSearchParams();
		params.set('id_pasien', ''+id_pasien);

		let requestOptions = new RequestOptions();
		requestOptions.params = params;

		return this.authHttp.get(this.resepUrl+'/search_by_pasien', requestOptions)
		    .map((res: Response) => res.json());		

	}
}
