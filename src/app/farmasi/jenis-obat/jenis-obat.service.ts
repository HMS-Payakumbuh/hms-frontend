import { Injectable }		from '@angular/core';
import { Headers, Http}		from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { JenisObat }		from './jenis-obat';
// import { ENV }				from '.../environment';

@Injectable()
export class JenisObatService {
	// private jenisObatUrl = ENV.jenisObatUrl;

	allJenisObat: JenisObat[] = [
		{id: 2138, merek: 'Cefixim syr kering 100mg/5ml	', nama_generik: 'Cefixim', pembuat: 'Indofarma', golongan: 'Antibiotik', satuan: 'Botol', harga: 10106.36, keterangan: ''},
		{id: 2517, merek: 'Amlodipine tab 5mg', nama_generik: 'Amlodipine', pembuat: 'Hexpharm', golongan: 'Keras', satuan: 'Tablet', harga: 229.00, keterangan: ''},
		{id: 2534, merek: 'Amlodipine tab 10mg', nama_generik: 'Amlodipine', pembuat: 'Hexpharm', golongan: 'Keras', satuan: 'Tablet', harga: 420.00, keterangan: ''}
	]; // Mock-up

	constructor(private http:Http) { }

	private handleError(error: any): Promise<any> {
		console.error('An error occurred', error);
		return Promise.reject(error.message || error);
	}

	getAllJenisObat(): Promise<JenisObat[]> {
		return Promise.resolve(this.allJenisObat)
			.catch(this.handleError);
	}

	getJenisObat(id: number): Promise<JenisObat> {
		return this.getAllJenisObat()
			.then(allJenisObat => allJenisObat.find(JenisObat => JenisObat.id === id))
			.catch(this.handleError);
	}

//	getAllJenisObat(): Promise<JenisObat[]> {
//		return this.http.get(this.JenisObatUrl)
//			.toPromise()
//			.then(response => response.json().data as JenisObat[])
//			.catch(this.handleError);
//	}

//	getJenisObat(id: number): Promise<JenisObat> {
//		const url = `${this.JenisObatUrl}/${id}`;
//		return this.http.get(url)
//			.toPromise()
//			.then(response => response.json().data as JenisObat)
//			.catch(this.handleError);
//	}
}