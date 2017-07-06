import { Injectable }			from '@angular/core';
import { Headers, Http, Response, RequestOptions }	from '@angular/http';
import { Observable }			from 'rxjs/Rx';

import { ENV }						from '../environment';
import { PemakaianKamarJenazah }			from './pemakaian-kamar-jenazah';

@Injectable()
export class PemakaianKamarJenazahService {
	pemakaianKamarJenazahUrl = ENV.pemakaianKamarJenazahUrl;

	constructor(private http:Http) { }

	private handleError(error: any): Promise<any> {
		console.error('An error occurred', error);
		return Promise.reject(error.message || error);
	}

	getAllPemakaianKamarJenazah(): Observable<PemakaianKamarJenazah[]> {
		return this.http.get(this.pemakaianKamarJenazahUrl)
			.map((res: Response) => res.json());
	}

	getPemakaianKamarJenazah(no_kamar: string): Observable<PemakaianKamarJenazah> {
		return this.getAllPemakaianKamarJenazah()
			.map(allPemakaianKamarJenazah => allPemakaianKamarJenazah.find(PemakaianKamarJenazah => PemakaianKamarJenazah.no_kamar == no_kamar));
	}

	createPemakaianKamarJenazah(PemakaianKamarJenazah: PemakaianKamarJenazah) {
		let headers = new Headers({ 'Content-Type': 'application/json' });
		let options = new RequestOptions({headers: headers});
		let body = JSON.stringify(PemakaianKamarJenazah);

		return this.http.post(this.pemakaianKamarJenazahUrl, body, options)
			.map((res: Response) => res.json());
	}

	updatePemakaianKamarJenazah(no_kamar: string, PemakaianKamarJenazah: PemakaianKamarJenazah) {
		let headers = new Headers({ 'Content-Type': 'application/json' });
		let options = new RequestOptions({headers: headers});
		let body = JSON.stringify(PemakaianKamarJenazah);

		return this.http.put(this.pemakaianKamarJenazahUrl + '/' + no_kamar, body, options)
			.map((res: Response) => res.json());
	}

	destroyPemakaianKamarJenazah(no_kamar: string) {
		let headers = new Headers({ 'Content-Type': 'application/json' });
		let options = new RequestOptions({headers: headers});

		return this.http.delete(this.pemakaianKamarJenazahUrl + '/' + no_kamar, options)
			.map((res: Response) => res.json());
	}

}