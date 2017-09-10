import { Injectable }			from '@angular/core';
import { Headers, Response, RequestOptions }		from '@angular/http';
import { Observable }			from 'rxjs/Rx';
import { AuthHttp }				from 'angular2-jwt';

import { ENV }										from '../environment';
import { Diagnosis }							from './diagnosis';
import { DiagnosisReference }			from './diagnosis-reference';

@Injectable()
export class DiagnosisService {

	private diagnosisUrl = ENV.diagnosisUrl;
	private diagnosisReferenceUrl = ENV.diagnosisReferenceUrl;

	constructor(private authHttp:AuthHttp) { }

	private handleError(error: any): Promise<any> {
		console.error('An error occurred', error);
		return Promise.reject(error.message || error);
	}

	getDiagnosisOfPasien(id_pasien: number): Observable<Diagnosis[]> {
		return this.authHttp.get(this.diagnosisUrl + '/' + id_pasien)
			.map((res: Response) => res.json());
	}

	getDiagnosisOfRekamMedis(id_pasien: number, tanggal_waktu: string): Observable<Diagnosis[]> {
		return this.authHttp.get(this.diagnosisUrl + '/rekam_medis/' + id_pasien + '/' + tanggal_waktu)
			.map((res: Response) => res.json());
	}

	getAllDiagnosisReference(): Observable<DiagnosisReference[]> {
		return this.authHttp.get(this.diagnosisReferenceUrl)
			.map((res: Response) => res.json());
	}

	getDiagnosisReference(kode: string): Observable<DiagnosisReference> {
		return this.getAllDiagnosisReference()
			.map(allDiagnosisReference => allDiagnosisReference.find(diagnosisReference => diagnosisReference.kode == kode));
	}

	createDiagnosisReference(diagnosisReference: DiagnosisReference) {
		let headers = new Headers({ 'Content-Type': 'application/json' });
		let options = new RequestOptions({ headers: headers});
		let body = JSON.stringify(diagnosisReference);
		return this.authHttp.post(this.diagnosisReferenceUrl, body, options)
			.map((res: Response) => res.json());
	}

	updateDiagnosisReference(kode: string, diagnosisReference: DiagnosisReference) {
		let headers = new Headers({ 'Content-Type': 'application/json' });
		let options = new RequestOptions({ headers: headers});
		let body = JSON.stringify(diagnosisReference);
		return this.authHttp.put(this.diagnosisReferenceUrl + '/' + kode, body, options)
			.map((res: Response) => res.json());
	}

	destroyDiagnosisReference(kode: string) {
		let headers = new Headers({ 'Content-Type': 'application/json' });
		let options = new RequestOptions({ headers: headers});
		return this.authHttp.delete(this.diagnosisReferenceUrl + '/' + kode, options)
			.map((res: Response) => res.json());
	}

	saveDiagnosis (selectedDiagnosis: Diagnosis[]) {
		let headers = new Headers({ 'Content-Type': 'application/json' });
		let options = new RequestOptions({ headers: headers});
		let body = JSON.stringify(selectedDiagnosis);
		return this.authHttp.post(this.diagnosisUrl, body, options)
			.map((res: Response) => res.json());
	}
}
