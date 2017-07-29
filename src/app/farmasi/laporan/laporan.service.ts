import { Injectable }		from '@angular/core';
import { Headers, Http, Response, RequestOptions, ResponseContentType }		from '@angular/http';
import { Observable }		from 'rxjs/Rx';

import 'rxjs/Rx';

import { ENV }				from '../../environment';

@Injectable()
export class LaporanService {
	private obatMasukUrl = ENV.obatMasukUrl;

	constructor(private http:Http) { }

	// TO-DO: Convert into Observable?
	private handleError(error: any): Promise<any> {
		console.error('An error occurred', error);
		return Promise.reject(error.message || error);
	}

	downloadLaporanObatMasuk(): Observable<any> {
		return this.http.get(this.obatMasukUrl + '/export',  { responseType: ResponseContentType.Blob })
			.map((res) => {
				return new Blob([res.blob()], { type: res.headers.get('Content-Type') });
			})
	}
}
