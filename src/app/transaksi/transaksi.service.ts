import { Injectable }		from '@angular/core';
import { Headers, Http}		from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { Transaksi }		from './transaksi';
import { ENV }				from '../environment';

@Injectable()
export class TransaksiService {
	private transaksiUrl = ENV.transaksiUrl;

	allTransaksi: Transaksi[] = [
			{id: 1, id_pasien: 1, no_sep: '01312304', nama_pasien: 'Jonathan B', harga: 510000, tanggal: '12-06-2017', status: 'open', tindakan: [{nama: 'Operasi Katarak', harga: 500000}], obat:[{nama: 'Panadol', satuan: 'strip', jumlah: 1, harga_satuan: 10000}]},
			{id: 2, id_pasien: 3, no_sep: '', nama_pasien: 'Agan C', harga: 5500000, tanggal: '15-06-2017', status: 'open', tindakan: [{nama: 'Operasi Kelamin', harga: 5000000}, {nama: 'Pemasangan Prosthesis', harga: 500000}], obat:[]},
			{id: 3, id_pasien: 2, no_sep: '01312564', nama_pasien: 'Bambang', harga: 1010000, tanggal: '12-05-2016', status: 'closed', tindakan: [{nama: 'Operasi Usus Buntu', harga: 1000000}], obat:[{nama: 'Paramex', satuan: 'strip', jumlah: 2, harga_satuan: 5000}]}
	]; //Mock-up

	constructor(private http:Http) { }

	private handleError(error: any): Promise<any> {
		console.error('An error occurred', error);
		return Promise.reject(error.message || error);
	}

	getAllTransaksi(): Promise<Transaksi[]> {
		return Promise.resolve(this.allTransaksi)
			.catch(this.handleError);
	}

	getTransaksi(id: number): Promise<Transaksi> {
		return this.getAllTransaksi()
			.then(allTransaksi => allTransaksi.find(transaksi => transaksi.id === id))
			.catch(this.handleError);
	}

//	getAllTransaksi(): Promise<Transaksi[]> {
//		return this.http.get(this.transaksiUrl)
//			.toPromise()
//			.then(response => response.json().data as Transaksi[])
//			.catch(this.handleError);
//	}

//	getTransaksi(id: number): Promise<Transaksi> {
//		const url = `${this.transaksiUrl}/${id}`;
//		return this.http.get(url)
//			.toPromise()
//			.then(response => response.json().data as Transaksi)
//			.catch(this.handleError);
//	}
}