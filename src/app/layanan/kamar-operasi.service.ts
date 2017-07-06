import { Injectable }			from '@angular/core';
import { Headers, Http, Response, RequestOptions }	from '@angular/http';
import { Observable }			from 'rxjs/Rx';

import { ENV }						from '../environment';
import { KamarOperasi }			from './kamar-operasi';

@Injectable()
export class KamarOperasiService {
	kamarOperasiUrl = ENV.kamarOperasiUrl;

	constructor(private http:Http) { }

	private handleError(error: any): Promise<any> {
		console.error('An error occurred', error);
		return Promise.reject(error.message || error);
	}

	getAllKamarOperasi(): Observable<KamarOperasi[]> {
		return this.http.get(this.kamarOperasiUrl)
			.map((res: Response) => res.json());
	}

	// getRawatinap(no_kamar: string): Observable<Rawatinap> {
	// 	return this.getAllRawatinap()
	// 		.map(allRawatinap => allRawatinap.find(Rawatinap => Rawatinap.no_kamar == no_kamar));
	// }

	createKamarOperasi(KamarOperasi: KamarOperasi) {
		let headers = new Headers({ 'Content-Type': 'application/json' });
		let options = new RequestOptions({headers: headers});
		let body = JSON.stringify(KamarOperasi);

		return this.http.post(this.kamarOperasiUrl, body, options)
			.map((res: Response) => res.json());
	}

	updateKamarOperasi(no_kamar: string, KamarOperasi: KamarOperasi) {
		let headers = new Headers({ 'Content-Type': 'application/json' });
		let options = new RequestOptions({headers: headers});
		let body = JSON.stringify(KamarOperasi);

		return this.http.put(this.kamarOperasiUrl + '/' + no_kamar, body, options)
			.map((res: Response) => res.json());
	}

	destroyKamarOperasi(no_kamar: string) {
		let headers = new Headers({ 'Content-Type': 'application/json' });
		let options = new RequestOptions({headers: headers});

		return this.http.delete(this.kamarOperasiUrl + '/' + no_kamar, options)
			.map((res: Response) => res.json());
	}
}