import { Injectable }			from '@angular/core';
import { Headers, Http, Response, RequestOptions }		from '@angular/http';
import { Observable }			from 'rxjs/Rx';

import { ENV }										from '../environment';
import { HasilLab }							from './hasil-lab';

@Injectable()
export class HasilLabService {

	private hasilLabUrl = ENV.hasilLabUrl;

	constructor(private http:Http) { }

	private handleError(error: any): Promise<any> {
		console.error('An error occurred', error);
		return Promise.reject(error.message || error);
	}

	getAllHasilLab(): Observable<HasilLab[]> {
		return this.http.get(this.hasilLabUrl)
			.map((res: Response) => res.json());
	}

	getHasilLab(id: number): Observable<HasilLab> {
		return this.http.get(this.hasilLabUrl + '/' + id)
      .map((res: Response) => res.json());
	}

	getEmptyHasilLab(no_pegawai: string): Observable<HasilLab[]> {
		return this.http.get(this.hasilLabUrl + '/empty/' + no_pegawai)
			.map((res: Response) => res.json());
	}

	createHasilLab(hasilLab: HasilLab) {
		let headers = new Headers({ 'Content-Type': 'application/json' });
		let options = new RequestOptions({ headers: headers});
		let body = JSON.stringify(hasilLab);
		return this.http.post(this.hasilLabUrl, body, options)
			.map((res: Response) => res.json());
	}

	updateHasilLab(id: number, hasilLab: HasilLab) {
		let headers = new Headers({ 'Content-Type': 'application/json' });
		let options = new RequestOptions({ headers: headers});
		let body = JSON.stringify(hasilLab);
		return this.http.put(this.hasilLabUrl + '/' + id, body, options)
			.map((res: Response) => res.json());
	}

	destroyHasilLab(id: number) {
		let headers = new Headers({ 'Content-Type': 'application/json' });
		let options = new RequestOptions({ headers: headers});
		return this.http.delete(this.hasilLabUrl + '/' + id, options)
			.map((res: Response) => res.json());
	}
}
