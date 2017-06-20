import { Injectable }		from '@angular/core';
import { Headers, Http}		from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { Klaim }			from './klaim';
import { ENV }				from '../../environment';

@Injectable()
export class KlaimService {
	private klaimUrl = ENV.klaimUrl;

	allKlaim: Klaim[] = [
		{id: 1, id_pembayaran: 1, id_pasien: 3, id_transaksi: 3, nomor_kartu: '0001461892608', status: 'closed', tanggal: '12-05-2016', tarif: '2000000', nama_asuransi: 'bpjs', nama_pasien: 'John'},
		{id: 2, id_pembayaran: 3, id_pasien: 5, id_transaksi: 6, nomor_kartu: '0001461892728', status: 'closed', tanggal: '18-06-2017', tarif: '10000000', nama_asuransi: 'bpjs', nama_pasien: 'Yngwie Malmsteen'}
	]; //Mock-up

	constructor(private http:Http) { }

	private handleError(error: any): Promise<any> {
		console.error('An error occurred', error);
		return Promise.reject(error.message || error);
	}

	getAllKlaim(): Promise<Klaim[]> {
		return Promise.resolve(this.allKlaim)
			.catch(this.handleError);
	}

	getKlaim(id: number): Promise<Klaim> {
		return this.getAllKlaim()
			.then(allKlaim => allKlaim.find(klaim => klaim.id === id))
			.catch(this.handleError);
	}
}