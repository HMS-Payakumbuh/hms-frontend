import { Injectable }			from '@angular/core';
import { Headers, Http, Response, RequestOptions }	from '@angular/http';
import { Observable }			from 'rxjs/Rx';

import { ENV }						from '../environment';
import { PemakaianKamarOperasi }			from './pemakaian-kamar-operasi';

@Injectable()
export class PemakaianKamarOperasiService {
	pemakaianKamarOperasiUrl = ENV.pemakaianKamarOperasiUrl;

	constructor(private http:Http) { }

	private handleError(error: any): Promise<any> {
		console.error('An error occurred', error);
		return Promise.reject(error.message || error);
	}

	getAllPemakaianKamarOperasi(): Observable<PemakaianKamarOperasi[]> {
		return this.http.get(this.pemakaianKamarOperasiUrl)
			.map((res: Response) => res.json());
	}

	getPemakaianKamarOperasi(no_kamar: string): Observable<PemakaianKamarOperasi> {
		return this.getAllPemakaianKamarOperasi()
			.map(allPemakaianKamarOperasi => allPemakaianKamarOperasi.find(PemakaianKamarOperasi => PemakaianKamarOperasi.no_kamar == no_kamar));
	}

	createPemakaianKamarOperasi(PemakaianKamarOperasi: PemakaianKamarOperasi) {
		let headers = new Headers({ 'Content-Type': 'application/json' });
		let options = new RequestOptions({headers: headers});
		let body = JSON.stringify(PemakaianKamarOperasi);

		return this.http.post(this.pemakaianKamarOperasiUrl, body, options)
			.map((res: Response) => res.json());
	}

	updatePemakaianKamarOperasi(no_kamar: string, PemakaianKamarOperasi: PemakaianKamarOperasi) {
		let headers = new Headers({ 'Content-Type': 'application/json' });
		let options = new RequestOptions({headers: headers});
		let body = JSON.stringify(PemakaianKamarOperasi);

		return this.http.put(this.pemakaianKamarOperasiUrl + '/' + no_kamar, body, options)
			.map((res: Response) => res.json());
	}

	destroyPemakaianKamarOperasi(id: number) {
		let headers = new Headers({ 'Content-Type': 'application/json' });
		let options = new RequestOptions({headers: headers});

		return this.http.delete(this.pemakaianKamarOperasiUrl + '/' + id, options)
			.map((res: Response) => res.json());
	}

}