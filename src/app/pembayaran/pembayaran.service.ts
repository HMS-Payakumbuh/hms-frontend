import { Injectable }		from '@angular/core';
import { Headers, Http}		from '@angular/http';

import 'rxjs/add/operator/toPromise';

import * as _ from "lodash";

import { Pembayaran }		from './pembayaran';
import { ENV }				from '../environment';

@Injectable()
export class PembayaranService {
	private transaksiUrl = ENV.transaksiUrl;

	allPembayaran: Pembayaran[] = [
		{id: 1, id_transaksi: 3, harga: 1010000, tanggal: new Date('2016-05-12T17:00+07:00'), nama_asuransi: 'bpjs', nama_pasien: 'Alexander Zucchini', no_sep: '01312564', id_klaim: 1, tindakan: [{nama: 'Operasi Usus Buntu', harga: 1000000}], obat:[{nama: 'Paramex', satuan: 'strip', jumlah: 2, harga_satuan: 5000}]},
		{id: 2, id_transaksi: 5, harga: 5000000, tanggal: new Date('2017-06-20T17:00+07:00'), nama_asuransi: 'tunai', nama_pasien: 'Cliphonse Jo', no_sep: '', id_klaim: 0, tindakan: [{nama: 'Operasi Ginjal', harga: 4000000}, {nama: 'Pemasangan Prosthesis', harga: 100000}], obat:[]},
		{id: 3, id_transaksi: 6, harga: 6000000, tanggal: new Date('2017-06-18T17:00+07:00'), nama_asuransi: 'bpjs', nama_pasien: 'Yngwie Malmsteen', no_sep: '01312575', id_klaim: 2, tindakan: [{nama: 'Operasi Jantung', harga: 6000000}], obat:[]},
		{id: 4, id_transaksi: 6, harga: 250000, tanggal: new Date('2017-06-18T17:00+07:00'), nama_asuransi: 'tunai', nama_pasien: 'Yngwie Malmsteen', no_sep: '01312575', id_klaim: 0, tindakan: [], obat:[{nama: 'Remyxol', satuan: 'strip', jumlah: 1, harga_satuan: 250000}]}
	]; //Mock-up

	constructor(private http:Http) { }

	private handleError(error: any): Promise<any> {
		console.error('An error occurred', error);
		return Promise.reject(error.message || error);
	}

	getAllPembayaran(): Promise<Pembayaran[]> {
		return Promise.resolve(this.allPembayaran)
			.catch(this.handleError);
	}

	getPembayaran(id: number): Promise<Pembayaran> {
		return this.getAllPembayaran()
			.then(allPembayaran => allPembayaran.find(pembayaran => pembayaran.id === id))
			.catch(this.handleError);
	}

	getPembayaranByTransaksi(id: number): Promise<Pembayaran[]> {
		return this.getAllPembayaran()
			.then(allPembayaran => allPembayaran.filter(function(item) {
				return item.id_transaksi === id;
			}))
			.catch(this.handleError);
	}
}