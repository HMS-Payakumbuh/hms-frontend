import { Injectable }			from '@angular/core';
import { Headers, Http, Response, RequestOptions }		from '@angular/http';
import { Observable }			from 'rxjs/Rx';

import { ENV }										from '../environment';
import { Transaksi }							from '../transaksi/transaksi';
import { Tindakan }								from './tindakan';
import { TindakanReference }			from './tindakan-reference';

@Injectable()
export class TindakanService {
	private tindakanReferenceUrl = ENV.tindakanReferenceUrl;
	private tindakanUrl = ENV.tindakanUrl;

	tindakan: Tindakan;
	tindakanInstances: Tindakan[] = [];
	i: number;

	constructor(private http:Http) { }

	private handleError(error: any): Promise<any> {
		console.error('An error occurred', error);
		return Promise.reject(error.message || error);
	}

	getAllTindakanReference(): Observable<TindakanReference[]> {
		return this.http.get(this.tindakanReferenceUrl)
			.map((res: Response) => res.json());
	}

	getTindakanReference(kode: string): Observable<TindakanReference> {
		return this.getAllTindakanReference()
			.map(allTindakanReference => allTindakanReference.find(tindakanReference => tindakanReference.kode == kode));
	}

	createTindakanReference(tindakanReference: TindakanReference) {
		let headers = new Headers({ 'Content-Type': 'application/json' });
		let options = new RequestOptions({ headers: headers});
		let body = JSON.stringify(tindakanReference);
		return this.http.post(this.tindakanReferenceUrl, body, options)
			.map((res: Response) => res.json());
	}

	updateTindakanReference(kode: string, tindakanReference: TindakanReference) {
		let headers = new Headers({ 'Content-Type': 'application/json' });
		let options = new RequestOptions({ headers: headers});
		let body = JSON.stringify(tindakanReference);
		return this.http.put(this.tindakanReferenceUrl + '/' + kode, body, options)
			.map((res: Response) => res.json());
	}

	destroyTindakanReference(kode: string) {
		let headers = new Headers({ 'Content-Type': 'application/json' });
		let options = new RequestOptions({ headers: headers});
		return this.http.delete(this.tindakanReferenceUrl + '/' + kode, options)
			.map((res: Response) => res.json());
	}

	saveTindakan (previousNoTindakan: number, selectedTindakan: Tindakan[]) {
		let headers = new Headers({ 'Content-Type': 'application/json' });
		let options = new RequestOptions({ headers: headers});

		for (let tindakan of selectedTindakan) {
			tindakan.no_tindakan = tindakan.no_tindakan + previousNoTindakan;
		}
		
		let body = JSON.stringify(selectedTindakan);
		return this.http.post(this.tindakanUrl, body, options)
			.map((res: Response) => res.json());
	}
}
