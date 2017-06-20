import { Injectable }			from '@angular/core';
import { Headers, Http}		from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { Tindakan }								from './tindakan';
import { TindakanReference }			from './tindakan-reference';

@Injectable()
export class TindakanService {

	tindakan: Tindakan;
	tindakanInstances: Tindakan[] = [];
	i: number;

	//Mock data
	allTindakanReference: TindakanReference[] = [
		{kode: '17-11', nama: 'LAP DIR ING HERN-GRAFT', harga: 100000},
		{kode: '17-12', nama: 'LAP INDIR ING HERN-GRAFT', harga: 150000},
		{kode: '17-13', nama: 'LAP ING HERN-GRAFT NOS', harga: 200000}
	];

	constructor(private http:Http) { }

	private handleError(error: any): Promise<any> {
		console.error('An error occurred', error);
		return Promise.reject(error.message || error);
	}

	getAllTindakanReference(): Promise<TindakanReference[]> {
		return Promise.resolve(this.allTindakanReference)
			.catch(this.handleError);
	}

	getTindakanReference(kode: string): Promise<TindakanReference> {
		return this.getAllTindakanReference()
			.then(allTindakanReference => allTindakanReference.find(TindakanReference => TindakanReference.kode === kode))
			.catch(this.handleError);
	}

	saveTindakan (
		idTransaksi: number,
		namaLayanan: string,
		isPoli: boolean,
		dokumenPenunjang: number,
		selectedTindakan: TindakanReference[]
	) {
		this.i = 0;
		for (let tindakanReference of selectedTindakan) {
			this.i++;

			this.tindakan = new Tindakan();
			this.tindakan.id_transaksi = idTransaksi;
			this.tindakan.no_tindakan = this.i;
			this.tindakan.harga = tindakanReference.harga;
			
			if (!isPoli)
				this.tindakan.dokumen_penunjang = dokumenPenunjang;
			else
				this.tindakan.dokumen_penunjang = null;

			this.tindakan.keterangan = 'HOHO HAHA';
			this.tindakan.id_pembayaran = null;
			this.tindakan.kode_tindakan = tindakanReference.kode;
			this.tindakan.tanggal_waktu = 'temp';
			this.tindakan.id_tenaga_medis = 1;
			this.tindakan.nama_layanan = namaLayanan;

			this.tindakanInstances.push(this.tindakan);
		}

		console.log(JSON.stringify(this.tindakanInstances));
	}
}