import { Injectable }			from '@angular/core';
import { Headers, Http, Response, RequestOptions }	from '@angular/http';
import { Observable }			from 'rxjs/Rx';

import { ENV }						from '../environment';
import { KamarJenazah }			from './kamar-jenazah';

@Injectable()
export class KamarJenazahService {
	kamarJenazahUrl = ENV.kamarJenazahUrl;

	constructor(private http:Http) { }

	private handleError(error: any): Promise<any> {
		console.error('An error occurred', error);
		return Promise.reject(error.message || error);
	}

	getAllKamarJenazah(): Observable<KamarJenazah[]> {
		return this.http.get(this.kamarJenazahUrl)
			.map((res: Response) => res.json());
	}

	// getRawatinap(no_kamar: string): Observable<Rawatinap> {
	// 	return this.getAllRawatinap()
	// 		.map(allRawatinap => allRawatinap.find(Rawatinap => Rawatinap.no_kamar == no_kamar));
	// }

	createKamarJenazah(KamarJenazah: KamarJenazah) {
		let headers = new Headers({ 'Content-Type': 'application/json' });
		let options = new RequestOptions({headers: headers});
		let body = JSON.stringify(KamarJenazah);

		return this.http.post(this.kamarJenazahUrl, body, options)
			.map((res: Response) => res.json());
	}

	updateKamarJenazah(no_kamar: string, KamarJenazah: KamarJenazah) {
		let headers = new Headers({ 'Content-Type': 'application/json' });
		let options = new RequestOptions({headers: headers});
		let body = JSON.stringify(KamarJenazah);

		return this.http.put(this.kamarJenazahUrl + '/' + no_kamar, body, options)
			.map((res: Response) => res.json());
	}

	destroyKamarJenazah(no_kamar: string) {
		let headers = new Headers({ 'Content-Type': 'application/json' });
		let options = new RequestOptions({headers: headers});

		return this.http.delete(this.kamarJenazahUrl + '/' + no_kamar, options)
			.map((res: Response) => res.json());
	}
}