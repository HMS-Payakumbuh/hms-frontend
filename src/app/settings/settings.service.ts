import { Injectable }		from '@angular/core';
import { Headers, Http, Response, RequestOptions }		from '@angular/http';
import { Observable }			from 'rxjs/Rx';

import 'rxjs/add/operator/toPromise';

import { Settings }		from './settings';
import { ENV }				from '../environment';

@Injectable()
export class SettingsService {
	private settingsUrl = ENV.settingsUrl;

	constructor(private http:Http) { }

	private handleError(error: any): Promise<any> {
		console.error('An error occurred', error);
		return Promise.reject(error.message || error);
	}

	getSettings(): Observable<Settings> {
		const url = `${this.settingsUrl}/1`;
		return this.http.get(url)
			.map((res: Response) => res.json());
	}

	updateSettings(settings: Settings, id: number): Observable<Settings> {
		let headers = new Headers({ 'Content-Type': 'application/json' });
		let options = new RequestOptions({headers: headers});
		let body = JSON.stringify(settings);

		return this.http.put(this.settingsUrl + '/' + id, body, options)
			.map((res: Response) => res.json());
	}
}