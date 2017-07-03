import { Injectable }			from '@angular/core';
import { Headers, Http, Response, RequestOptions }		from '@angular/http';
import { Observable }			from 'rxjs/Rx';

import { ENV }										from '../environment';
import { DiagnosisReference }			from './diagnosis-reference';

@Injectable()
export class DiagnosisService {

	private diagnosisReferenceUrl = ENV.diagnosisReferenceUrl;

	constructor(private http:Http) { }

	private handleError(error: any): Promise<any> {
		console.error('An error occurred', error);
		return Promise.reject(error.message || error);
	}

	getAllDiagnosisReference(): Observable<DiagnosisReference[]> {
		return this.http.get(this.diagnosisReferenceUrl)
			.map((res: Response) => res.json());;
	}
}
