import { Injectable }			from '@angular/core';
import { Headers, Http}		from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { DiagnosisReference }			from './diagnosis-reference';

@Injectable()
export class DiagnosisService {

	//Mock data
	allDiagnosisReference: DiagnosisReference[] = [
		{kode: 'K.11.0', nama: 'Atrophy of salivary gland'},
		{kode: 'K.11.1', nama: 'Hypertrophy of salivary gland'},
		{kode: 'K.11.21', nama: 'Acute sialoadenitis'}
	];

	constructor(private http:Http) { }

	private handleError(error: any): Promise<any> {
		console.error('An error occurred', error);
		return Promise.reject(error.message || error);
	}

	getAllDiagnosisReference(): Promise<DiagnosisReference[]> {
		return Promise.resolve(this.allDiagnosisReference)
			.catch(this.handleError);
	}
}