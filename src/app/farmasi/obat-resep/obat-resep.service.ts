import { Injectable }		from '@angular/core';
import { Headers, Http }		from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { ObatResep }		from './obat-resep';
// import { ENV }				from '.../environment';

@Injectable()
export class ObatResepService {
	// private obatResepUrl = ENV.obatResepUrl;

	allObatResep: ObatResep[] = [
		{id: 1, id_transaksi: 1, id_pasien: 1, nama_pasien: 'Octavianus Markus', waktu_keluar: new Date('2016-09-11T16:16+07:00'), obat:[{id: 1, kode_obat: 213817061901 , merek: 'Cefixim syr kering 100mg/5ml' , nomor_batch: '085G610NV', satuan: 'Botol', harga_jual_referensi: 10100, harga_jual_realisasi: 10000, kadaluarsa: new Date('2018-04-18'), jumlah: 1}, {id: 2, kode_obat: 213817061902 , merek: 'Cefixim syr kering 100mg/5ml' , nomor_batch: '085G611NV', satuan: 'Botol', harga_jual_referensi: 10100, harga_jual_realisasi: 10000, kadaluarsa: new Date('2018-04-19'), jumlah: 1}]}
	]; // Mock-up

	constructor(private http:Http) { }

	private handleError(error: any): Promise<any> {
		console.error('An error occurred', error);
		return Promise.reject(error.message || error);
	}

	getAllObatResep(): Promise<ObatResep[]> {
		return Promise.resolve(this.allObatResep)
			.catch(this.handleError);
	}

	getObatResep(id: number): Promise<ObatResep> {
		return this.getAllObatResep()
			.then(allObatResep => allObatResep.find(ObatResep => ObatResep.id === id))
			.catch(this.handleError);
	}

//	getAllObatResep(): Promise<ObatResep[]> {
//		return this.http.get(this.ObatResepUrl)
//			.toPromise()
//			.then(response => response.json().data as ObatResep[])
//			.catch(this.handleError);
//	}

//	getObatResep(id: number): Promise<ObatResep> {
//		const url = `${this.ObatResepUrl}/${id}`;
//		return this.http.get(url)
//			.toPromise()
//			.then(response => response.json().data as ObatResep)
//			.catch(this.handleError);
//	}
}