import { Injectable }			from '@angular/core';
import { Headers, Http, Response, RequestOptions }	from '@angular/http';
import { Observable }			from 'rxjs/Rx';

import { ENV }						from '../environment';

import { Tempattidur }			from './tempattidur';


@Injectable()
export class TempattidurService {
	rawatinapUrl = ENV.rawatinapUrl;
	tempattidurUrl = ENV.tempattidurUrl;

	selectedTempatTidur : number;
	
	constructor(private http:Http) { }

	private handleError(error: any): Promise<any> {
		console.error('An error occurred', error);
		return Promise.reject(error.message || error);
	}

	getAllTempattidur(no_kamar: string): Observable<Tempattidur[]> {
		return this.http.get(this.rawatinapUrl + '/' + no_kamar)
			.map((res: Response) => res.json());
	}

	getAllAvailableTempatTidur(no_kamar: string) : Observable<Tempattidur[]> {
		return this.getAllTempattidur(no_kamar)
		.map(allTempatTidur => allTempatTidur.filter(tempattidur => tempattidur.status != 0));
	}

	getSelectedTempattidur(): Promise<number> {
		return Promise.resolve(this.selectedTempatTidur)
			.catch(this.handleError);
	}

	updateTempatTidur(tempattidur: Tempattidur, no_kamar: string, no_tempat_tidur: number) {
		let headers = new Headers({ 'Content-Type': 'application/json' });
		let options = new RequestOptions({headers: headers});
		let body = JSON.stringify(tempattidur);

		const url = `${this.tempattidurUrl}/${no_kamar}/${no_tempat_tidur}`
		return this.http.put(url, body, options)
			.map((res: Response) => res.json());
	}

	createTempatTidur(tempattidur: Tempattidur) {
		let headers = new Headers({ 'Content-Type': 'application/json' });
		let options = new RequestOptions({headers: headers});
		let body = JSON.stringify(tempattidur);

		return this.http.post(this.tempattidurUrl, body, options)
			.map((res: Response) => res.json());
	}
}