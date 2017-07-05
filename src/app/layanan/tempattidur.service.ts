import { Injectable }			from '@angular/core';
import { Headers, Http, Response, RequestOptions }	from '@angular/http';
import { Observable }			from 'rxjs/Rx';

import { ENV }						from '../environment';

import { Tempattidur }			from './tempattidur';

@Injectable()
export class TempattidurService {
	rawatinapUrl = ENV.rawatinapUrl;

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

	getSelectedTempattidur(): Promise<number> {
		return Promise.resolve(this.selectedTempatTidur)
			.catch(this.handleError);
	}

	getTempattidurByNoKamar(no_kamar: string): Promise<Tempattidur[]> {
		return this.getAllTempattidur()
			.then(allTempattidur=> allTempattidur.filter(function(item) {
				return item.no_kamar === no_kamar;
			}))
			.catch(this.handleError);
	}
}