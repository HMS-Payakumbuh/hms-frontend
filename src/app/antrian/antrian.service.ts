import { Injectable }		from '@angular/core';
import { Headers, Http, Response, RequestOptions }		from '@angular/http';
import { Observable }			from 'rxjs/Rx';

import { ENV }						from '../environment';
import { Antrian }	from './antrian';
import { AntrianFrontOffice } from './antrian.front.office';

import * as _ from "lodash";

@Injectable()
export class AntrianService {
	private antrianUrl = ENV.antrianUrl;
	private antrianFrontOfficeUrl = ENV.antrianFrontOfficeUrl;

	constructor(private http:Http) { }

	private handleError(error: any): Promise<any> {
		console.error('An error occurred', error);
		return Promise.reject(error.message || error);
	}

	getAllAntrian(nama_layanan:string): Observable<Antrian[]> {
		return this.http.get(this.antrianUrl + '/' + nama_layanan)
			.map((res: Response) => res.json());
	}

	getAllAntrianFrontOffice(): Observable<AntrianFrontOffice[]> {
		return this.http.get(this.antrianFrontOfficeUrl)
			.map((res: Response) => res.json());
	}

	getAllAntrianFrontOfficeByKategori(kategori_antrian:string): Observable<AntrianFrontOffice[]> {
		return this.http.get(this.antrianFrontOfficeUrl + '/' + kategori_antrian)
			.map((res: Response) => res.json());
	}

	getAntrianFrontOffice(kategori_antrian: string): Observable<AntrianFrontOffice[]> {
		return this.getAllAntrianFrontOfficeByKategori(kategori_antrian)
			.map(allAntrianFrontOffice => 
				_.each(allAntrianFrontOffice, antrian => {
					if (antrian.nama_layanan_poli)
						_.set(antrian, 'nama_layanan', antrian.nama_layanan_poli);
					else if (antrian.nama_layanan_lab)	
						_.set(antrian, 'nama_layanan', antrian.nama_layanan_lab);
				})
			);
	}

	getAntrian(nama_layanan:string): Observable<Antrian[]> {
		return this.getAllAntrian(nama_layanan)
			.map(allAntrian => 
				_.each(allAntrian, antrian => {
					if (antrian.nama_layanan_poli)
						_.set(antrian, 'nama_layanan', antrian.nama_layanan_poli);
					else if (antrian.nama_layanan_lab)	
						_.set(antrian, 'nama_layanan', antrian.nama_layanan_lab);
				})
			);
	}

	createAntrianFrontOffice(antrianFrontOffice: AntrianFrontOffice) {
		let headers = new Headers({ 'Content-Type': 'application/json' });
		let options = new RequestOptions({headers: headers});
		let body = JSON.stringify(antrianFrontOffice);

		return this.http.post(this.antrianFrontOfficeUrl, body, options)
			.map((res: Response) => res.json());
	}

	destroyAntrianFrontOffice(nama_layanan: string, no_antrian: number) {
		let headers = new Headers({ 'Content-Type': 'application/json' });
		let options = new RequestOptions({headers: headers});
		return this.http.delete(this.antrianFrontOfficeUrl + '/' + nama_layanan + '/' + no_antrian, options)
		.map((res: Response) => res.json());
	}

	updateAntrianFrontOffice(nama_layanan: string, no_antrian: number) {
		let headers = new Headers({ 'Content-Type': 'application/json' });
		let options = new RequestOptions({headers: headers});
		return this.http.put(this.antrianFrontOfficeUrl + '/' + nama_layanan + '/' + no_antrian, options)
		.map((res: Response) => res.json());
	}

	createAntrian(antrian: Antrian) {
		let headers = new Headers({ 'Content-Type': 'application/json' });
		let options = new RequestOptions({headers: headers});
		let body = JSON.stringify(antrian);
		console.log(body);

		return this.http.post(this.antrianUrl, body, options)
			.map((res: Response) => res.json());
	}

	destroyAntrian(id_transaksi: number, no_antrian: number) {
		let headers = new Headers({ 'Content-Type': 'application/json' });
		let options = new RequestOptions({headers: headers});
		return this.http.delete(this.antrianUrl + '/' + id_transaksi + '/' + no_antrian, options)
		.map((res: Response) => res.json());
	}

	updateAntrian(id_transaksi: number, no_antrian: number) {
		let headers = new Headers({ 'Content-Type': 'application/json' });
		let options = new RequestOptions({headers: headers});
		return this.http.put(this.antrianUrl + '/' + id_transaksi + '/' + no_antrian, options)
		.map((res: Response) => res.json());
	}
}