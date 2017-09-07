import { Component }				from '@angular/core';
import { ToastyService, ToastyConfig, ToastOptions, ToastData } from 'ng2-toasty';
import * as _ from "lodash";

import { Transaksi }			from './transaksi';
import { TransaksiService }		from './transaksi.service';
import { Asuransi }				from '../pasien/asuransi';
import { AsuransiService }		from '../pasien/asuransi.service';
import { ENV }					from '../environment';


@Component({
 	selector: 'transaksi-rekap-page',
 	templateUrl: './rekap-transaksi.component.html',
 	providers: [TransaksiService, AsuransiService]
})

export class RekapTransaksiComponent {
	private transaksiUrl = ENV.transaksiUrl;

	tanggal_awal: string;
	tanggal_akhir: string;
	loading: boolean;
	transaksi_obat: boolean;
	nama_pasien: string;
	kode_pasien: string;
	cari: boolean;
	response: any;
	allTransaksi: any[];
	config = {
		"format": "YYYY-MM-DD"
	};

    public rowsOnPage = 10;
    public sortBy = "waktu_masuk_pasien";
    public sortOrder = "asc";

	constructor(
		private transaksiService: TransaksiService,
		private asuransiService: AsuransiService,
		private toastyService: ToastyService, 
		private toastyConfig: ToastyConfig
	) {}

	ngOnInit(): void {
		this.tanggal_awal = null;
		this.tanggal_akhir = null;
		this.loading = true;
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
				this.loading = false;
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

	public download() {
		if ((this.tanggal_awal === null || this.tanggal_awal === '') && (this.tanggal_akhir === null || this.tanggal_akhir === '')) {
			this.toastyService.error(this.toast_fail(3));
		}
		else {
			if (this.tanggal_awal === null || this.tanggal_awal === '') {
				this.toastyService.error(this.toast_fail(1));
			}
			else {
				if (this.tanggal_akhir === null || this.tanggal_akhir === '') {
					this.toastyService.error(this.toast_fail(2));
				}
				else {
					let awal: Date = new Date(this.tanggal_awal);
					let akhir: Date = new Date(this.tanggal_akhir);
					let awal_ms = awal.getTime();
					let akhir_ms = akhir.getTime();

					if (awal_ms > akhir_ms) {
						this.toastyService.error(this.toast_fail(4));
					}
					else {
					    window.location.href = this.transaksiUrl + '/export?tanggal_awal=' + this.tanggal_awal + '&tanggal_akhir=' + this.tanggal_akhir;
						this.toastyService.success(this.toast_success());
						this.ngOnInit();
					}
				}
			}
		}
	}

	private toast_success() {
		let toastOptions:ToastOptions = {
			title: "Mengunduh...",
			msg: '',
			showClose: true,
			timeout: 1000,
			theme: 'material'
		};

		return toastOptions;
	}

	private toast_fail(value) {
		let title: string = ''
		if (value === 1) {
			title = 'Tanggal awal tidak boleh kosong';
		} 
		else {
			if (value === 2) {
				title = 'Tanggal akhir tidak boleh kosong';
			}
			else {
				if (value === 4) {
					title = 'Tanggal akhir tidak boleh lebih kecil dari tanggal awal';
				}
				else {
					title = 'Tanggal awal dan tanggal akhir tidak boleh kosong';
				}
			}
		}
		let toastOptions:ToastOptions = {
			title: title,
			msg: '',
			showClose: true,
			timeout: 5000,
			theme: 'material'
		};

		return toastOptions;
	}
}
