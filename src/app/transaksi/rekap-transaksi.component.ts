import { Component }				from '@angular/core';
import * as _ from "lodash";

import { Transaksi }			from './transaksi';
import { TransaksiService }		from './transaksi.service';
import { Asuransi }				from '../pasien/asuransi';
import { AsuransiService }		from '../pasien/asuransi.service';


@Component({
 	selector: 'transaksi-rekap-page',
 	templateUrl: './rekap-transaksi.component.html',
 	providers: [TransaksiService, AsuransiService]
})

export class RekapTransaksiComponent {
	transaksi_obat: boolean;
	nama_pasien: string;
	kode_pasien: string;
	cari: boolean;
	response: any;
	allTransaksi: any[];

    public rowsOnPage = 10;
    public sortBy = "tanggal";
    public sortOrder = "desc";

	constructor(
		private transaksiService: TransaksiService,
		private asuransiService: AsuransiService
	) {}

	ngOnInit(): void {
		this.transaksi_obat = false;
		this.cari = false;
		this.nama_pasien = null;
		this.kode_pasien = null;
		this.transaksiService.getAllTransaksi(null, null, 'closed')
			.subscribe(data => {
				this.response = data;
				this.allTransaksi = this.response.allTransaksi;
				for (let transaksi of this.allTransaksi) {
					transaksi['total_pembayaran'] = this.totalPembayaran(transaksi.pembayaran);
					let hasil = this.getKlaim(transaksi.pembayaran);
					transaksi['total_klaim'] = hasil.total_klaim;
					transaksi['total_bpjs'] = hasil.total_bpjs;
				}
				console.log(this.allTransaksi);
			});
	}

	public totalPembayaran(listPembayaran: any[]) {
		let total = 0;
		for (let i of listPembayaran) {
			if (i.metode_bayar != 'bpjs') {
				total += parseInt(i.harga_bayar);
			}
		}
		return total;
	}

	public getKlaim(listPembayaran: any[]) {
		let hasil: any = {
			total_klaim: 0,
			total_bpjs: 0
		};
		for (let i of listPembayaran) {
			if (i.metode_bayar == 'bpjs') {
				hasil['total_bpjs'] += parseInt(i.harga_bayar);
				if (i.klaim != null) {
					if (i.klaim.tarif != null) {
						hasil['total_klaim'] += parseInt(i.klaim.tarif);
					}
				}
			}
		}
		return hasil;
	}
}
