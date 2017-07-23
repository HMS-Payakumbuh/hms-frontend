import { Injectable }			from '@angular/core';
import { Headers, Http, Response, RequestOptions }		from '@angular/http';
import { Observable }			from 'rxjs/Rx';

import { ENV }										from '../environment';
import { Transaksi }							from '../transaksi/transaksi';
import { Tindakan }								from './tindakan';
import { TindakanOperasi }								from './tindakan-operasi';
import { TindakanReference }			from './tindakan-reference';

@Injectable()
export class TindakanOperasiService {
	private tindakanReferenceUrl = ENV.tindakanReferenceUrl;
	private tindakanUrl = ENV.tindakanUrl;
    private tindakanOperasiUrl = ENV.tindakanOperasiUrl;

	tindakan: Tindakan;
	tindakanInstances: Tindakan[] = [];
	i: number;

	constructor(private http:Http) { }

	private handleError(error: any): Promise<any> {
		console.error('An error occurred', error);
		return Promise.reject(error.message || error);
	}
    
    getTenagaMedisByTindakanOperasi(pemakaianId : number): Observable<TindakanOperasi[]> {
		return this.http.get(this.tindakanOperasiUrl + '/' + pemakaianId)
			.map((res: Response) => res.json());
	}

	// getTindakanOfRekamMedis(id_pasien: number, tanggal_waktu: string): Observable<Tindakan[]> {
	// 	return this.http.get(this.tindakanUrl + '/rekam_medis/' + id_pasien + '/' + tanggal_waktu)
	// 		.map((res: Response) => res.json());
	// }

	// getAllTindakanReference(): Observable<TindakanReference[]> {
	// 	return this.http.get(this.tindakanReferenceUrl)
	// 		.map((res: Response) => res.json());
	// }

	// getTindakanReference(kode: string): Observable<TindakanReference> {
	// 	return this.http.get(this.tindakanReferenceUrl + '/' + kode)
	// 		.map((res: Response) => res.json());
	// }

	createTindakanOperasi(tindakanOperasi: TindakanOperasi[]) {
		let headers = new Headers({ 'Content-Type': 'application/json' });
		let options = new RequestOptions({ headers: headers});
		let body = JSON.stringify(tindakanOperasi);
		return this.http.post(this.tindakanOperasiUrl, body, options)
			.map((res: Response) => res.json());
	}

	// updateTindakanReference(kode: string, tindakanReference: TindakanReference) {
	// 	let headers = new Headers({ 'Content-Type': 'application/json' });
	// 	let options = new RequestOptions({ headers: headers});
	// 	let body = JSON.stringify(tindakanReference);
	// 	return this.http.put(this.tindakanReferenceUrl + '/' + kode, body, options)
	// 		.map((res: Response) => res.json());
	// }

	// destroyTindakanReference(kode: string) {
	// 	let headers = new Headers({ 'Content-Type': 'application/json' });
	// 	let options = new RequestOptions({ headers: headers});
	// 	return this.http.delete(this.tindakanReferenceUrl + '/' + kode, options)
	// 		.map((res: Response) => res.json());
	// }

	// saveTindakan (selectedTindakan: Tindakan[]) {
	// 	let headers = new Headers({ 'Content-Type': 'application/json' });
	// 	let options = new RequestOptions({ headers: headers});
	// 	let body = JSON.stringify(selectedTindakan);
	// 	return this.http.post(this.tindakanUrl, body, options)
	// 		.map((res: Response) => res.json());
	// }
}
