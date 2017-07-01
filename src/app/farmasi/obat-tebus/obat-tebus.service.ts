import { Injectable }		from '@angular/core';
import { Headers, Http }		from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { ObatTebus }		from './obat-tebus';
// import { ENV }				from '.../environment';

@Injectable()
export class ObatTebusService {
	// private obatTebusUrl = ENV.obatTebusUrl;

	allObatTebus: ObatTebus[] = [
		{id: 1, id_transaksi: 1, id_pasien: 1, nama_pasien: 'Octavianus Markus', waktu_keluar: new Date('2016-09-11T16:16+07:00'), obat:[{id: 1, kode_obat: 213817061901 , merek: 'Cefixim syr kering 100mg/5ml' , nomor_batch: '085G610NV', satuan: 'Botol', harga_jual_referensi: 10100, harga_jual_realisasi: 10000, kadaluarsa: new Date('2018-04-18'), jumlah: 1}, {id: 2, kode_obat: 213817061902 , merek: 'Cefixim syr kering 100mg/5ml' , nomor_batch: '085G611NV', satuan: 'Botol', harga_jual_referensi: 10100, harga_jual_realisasi: 10000, kadaluarsa: new Date('2018-04-19'), jumlah: 1}]}
	]; // Mock-up

	constructor(private http:Http) { }

	private handleError(error: any): Promise<any> {
		console.error('An error occurred', error);
		return Promise.reject(error.message || error);
	}

	getAllObatTebus(): Promise<ObatTebus[]> {
		return Promise.resolve(this.allObatTebus)
			.catch(this.handleError);
	}

	getObatTebus(id: number): Promise<ObatTebus> {
		return this.getAllObatTebus()
			.then(allObatTebus => allObatTebus.find(ObatTebus => ObatTebus.id === id))
			.catch(this.handleError);
	}

//	getAllObatTebus(): Promise<ObatTebus[]> {
//		return this.http.get(this.ObatTebusUrl)
//			.toPromise()
//			.then(response => response.json().data as ObatTebus[])
//			.catch(this.handleError);
//	}

//	getObatTebus(id: number): Promise<ObatTebus> {
//		const url = `${this.ObatTebusUrl}/${id}`;
//		return this.http.get(url)
//			.toPromise()
//			.then(response => response.json().data as ObatTebus)
//			.catch(this.handleError);
//	}
}