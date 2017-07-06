import { Injectable }		from '@angular/core';
import { Headers, Http, Response, RequestOptions }		from '@angular/http';
import { Observable }			from 'rxjs/Rx';
import * as _ from "lodash";

import { ENV }						from '../environment';
import { Pasien }	from './pasien';
import { Asuransi }  from './asuransi';

@Injectable()
export class PasienService {
	private pasienUrl = ENV.pasienUrl;

/*	//Mock data
	allPasien: Pasien[] = [
		{id: 1, nama: 'Octavianus Markus', tanggal_lahir: '02-07-1990', umur: 26, jender: 0, agama: 'Protestan', alamat: 'Jln.Ayam', kontak: '0987654321'},
		{id: 2, nama: 'Alexander Zucchini', tanggal_lahir: '25-02-1970', umur: 47, jender: 0, agama: 'Katolik', alamat: 'Jln.Sapi', kontak: '0987652131'},
		{id: 3, nama: 'John', tanggal_lahir: '12-03-1983', umur: 34, jender: 0, agama: 'Protestan', alamat: 'Jln.Machan', kontak: '098712321'},
		{id: 4, nama: 'Cliphonse Jo', tanggal_lahir: '12-03-1973', umur: 44, jender: 0, agama: 'Buddha', alamat: 'Jln.Michin', kontak: '09871425321'},
		{id: 5, nama: 'Yngwie Malmsteen', tanggal_lahir: '30-06-1963', umur: 53, jender: 0, agama: 'Katolik', alamat: 'Jln.Musik', kontak: '09871422719'},
		{id: 6, nama: 'Stephen Andi', tanggal_lahir: '23-10-1978', umur: 49, jender: 0, agama: 'Islam', alamat: 'Jln.Mosak', kontak: '0987241122719'},
	];*/

	constructor(private http:Http) { }

	private handleError(error: any): Promise<any> {
		console.error('An error occurred', error);
		return Promise.reject(error.message || error);
	}

	getAllPasien(): Observable<Pasien[]> {
		return this.http.get(this.pasienUrl)
			.map((res: Response) => res.json());
	}

	getPasien(id: number): Observable<Pasien> {
		return this.getAllPasien()
			.map(allPasien => allPasien.find(pasien => pasien.id === id))
			.catch(this.handleError);
	}

	getPasienByName(key: string): Observable<Pasien[]> {
		return this.getAllPasien()
			.map(allPasien => 
				_.filter(allPasien, pasien => 
					pasien.nama_pasien.match(new RegExp(key, 'gi'))
				)
			)
			.catch(this.handleError);
	}

	createPasien(pasien: Pasien, asuransi: Asuransi) {
		let headers = new Headers({ 'Content-Type': 'application/json' });
		let options = new RequestOptions({headers: headers});
		let request = pasien;
		request.asuransi = asuransi;
		let body = JSON.stringify(request);
		console.log(body);

		return this.http.post(this.pasienUrl, body, options)
			.map((res: Response) => res.json());
	}

	updatePasien(id: number, pasien: Pasien) {
		let headers = new Headers({ 'Content-Type': 'application/json' });
		let options = new RequestOptions({headers: headers});
		let body = JSON.stringify(pasien);
		console.log(body);

		return this.http.put(this.pasienUrl + '/' + id, body, options)
			.map((res: Response) => res.json());
	}

	destroyPasien(id: number) {
		let headers = new Headers({ 'Content-Type': 'application/json' });
		let options = new RequestOptions({headers: headers});

		return this.http.delete(this.pasienUrl + '/' + id, options)
			.map((res: Response) => res.json());
	}
}