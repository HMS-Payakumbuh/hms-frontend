import { Injectable }		from '@angular/core';
import { Headers, Http}		from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { Settings }		from './settings';
import { ENV }				from '../environment';

@Injectable()
export class SettingsService {
	private settingsUrl = ENV.settingsUrl;

	settings: Settings = {nik: '3173062100003', tarif: '10000000', kode_tarif: 'CP', payor_id: '3', payor_cd: 'JKN', vip_add_pct: '35'};

	constructor(private http:Http) { }

	private handleError(error: any): Promise<any> {
		console.error('An error occurred', error);
		return Promise.reject(error.message || error);
	}

	getSettings(): Promise<Settings> {
		return Promise.resolve(this.settings)
			.catch(this.handleError);
	}
}