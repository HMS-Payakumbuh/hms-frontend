import { Injectable }		from '@angular/core';
import { Headers, Http, Response }		from '@angular/http';
import { Observable }		from 'rxjs/Rx';

import 'rxjs/add/operator/toPromise';

import { JenisObat }		from './jenis-obat';
// import { ENV }				from '../environment';

@Injectable()
export class JenisObatService {
	// private jenisObatUrl = ENV.jenisObatUrl;
	public jenisObatUrl = 'http://127.0.0.1:8000/api/jenis_obat';

	allJenisObat: JenisObat[] = [
		{id: 1121, merek_obat: 'Panadol Regular', nama_generik: 'Paracetamol', pembuat: 'GSK', golongan: 'Bebas', satuan: 'Blister', harga_jual_satuan: 9500, keterangan: ''},
		{id: 1122, merek_obat: 'Panadol Extra', nama_generik: 'Paracetamol, Caffeine', pembuat: 'GSK', golongan: 'Bebas', satuan: 'Blister', harga_jual_satuan: 12000, keterangan: ''},
		{id: 1123, merek_obat: 'Panadol Cold & Flu', nama_generik: 'Paracetamol, Pseudoephedrine, Dextromethorphan', pembuat: 'GSK', golongan: 'Bebas', satuan: 'Blister', harga_jual_satuan: 13000, keterangan: ''},
		{id: 1124, merek_obat: 'Panadol Anak', nama_generik: 'Paracetamol', pembuat: 'GSK', golongan: 'Bebas', satuan: 'Botol', harga_jual_satuan: 25000, keterangan: ''},
		{id: 2138, merek_obat: 'Cefixim syr kering 100mg/5ml	', nama_generik: 'Cefixim', pembuat: 'Indofarma', golongan: 'Antibiotik', satuan: 'Botol', harga_jual_satuan: 10106.36, keterangan: ''},
		{id: 2517, merek_obat: 'Amlodipine tab 5mg', nama_generik: 'Amlodipine', pembuat: 'Hexpharm', golongan: 'Keras', satuan: 'Tablet', harga_jual_satuan: 229.00, keterangan: ''},
		{id: 2534, merek_obat: 'Amlodipine tab 10mg', nama_generik: 'Amlodipine', pembuat: 'Hexpharm', golongan: 'Keras', satuan: 'Tablet', harga_jual_satuan: 420.00, keterangan: ''}
	]; // Mock-up

	constructor(private http:Http) { }

	private handleError(error: any): Promise<any> {
		console.error('An error occurred', error);
		return Promise.reject(error.message || error);
	}

	getAllJenisObat() {
		return this.http.get(this.jenisObatUrl).map((res:Response) => res.json());
	}

//	getAllJenisObat(): Promise<JenisObat[]> {
//		return Promise.resolve(this.allJenisObat)
//			.catch(this.handleError);
//	}

//	getJenisObat(id: number): Promise<JenisObat> {
//		return this.getAllJenisObat()
//			.then(allJenisObat => allJenisObat.find(JenisObat => JenisObat.id === id))
//			.catch(this.handleError);
//	}

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