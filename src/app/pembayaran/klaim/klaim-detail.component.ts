import 'rxjs/add/operator/switchMap';
import { Component, Input, OnInit }	from '@angular/core';
import { ActivatedRoute, Params }	from '@angular/router';
import { Location }					from '@angular/common';

import { KlaimService }		from './klaim.service';
import { Klaim }				from './klaim';
import { TransaksiService }		from '../../transaksi/transaksi.service';
import { Transaksi }				from '../../transaksi/transaksi';
import { DiagnosisService }		from '../../layanan/diagnosis.service';
import { DiagnosisReference }				from '../../layanan/diagnosis-reference';
import { TindakanService }		from '../../layanan/tindakan.service';
import { TindakanReference }				from '../../layanan/tindakan-reference';

@Component({
 	selector: 'klaim-detail-page',
 	templateUrl: './klaim-detail.component.html',
 	providers: [KlaimService, TransaksiService, DiagnosisService, TindakanService]
})

export class KlaimDetailComponent implements OnInit {
	response: any;
	klaim: any;
	pembayaran: any;
	transaksi: any;
	status_klaim: any;
	displayJenisTarif: string;
	listDiagnosis: DiagnosisReference[] = [];
	listTindakan: TindakanReference[] = [];
	grouping: boolean;

	constructor(
		private klaimService: KlaimService,
		private transaksiService: TransaksiService,
		private diagnosisService: DiagnosisService,
		private tindakanService: TindakanService,
		private route: ActivatedRoute,
		private location: Location
	) {}

	private determineJenisTarif(input: string): string {
		var res = input.split("");
		if (res.length !== 2) {
			return "Invalid Code";
		}
		if (res[1] === "P") {
			return "Rumah Sakit Pemerintah Kelas " + res[0];
		}
		if (res[1] === "S") {
			return "Rumah Sakit Swasta Kelas " + res[0];
		}
	}

	ngOnInit(): void {
		this.grouping = false;
		this.status_klaim = null;
		this.displayJenisTarif = '';

		this.route.params
			.switchMap((params: Params) => this.klaimService.getKlaim(+params['id']))
			.subscribe(data => {
				this.response = data;
				this.klaim = this.response.klaim;
				this.pembayaran = this.klaim.pembayaran;
				this.transaksi = this.pembayaran.transaksi;

				if (this.transaksi.no_sep !== null) {
					this.transaksiService.getStatusBpjs(this.transaksi.id)
						.subscribe(data => {
							this.status_klaim = data.status_bpjs;
							this.displayJenisTarif = this.determineJenisTarif(this.status_klaim.kode_tarif);
							console.log(this.status_klaim);

							if (this.status_klaim.grouper !== null) {
								if (this.status_klaim.grouper.response !== null) {
									this.grouping = true;
									let payload: any = {
										status: this.klaim.status,
										tarif: this.status_klaim.grouper.response.cbg.tariff
									};
									let klaim: any = {
										klaim: payload
									};

									this.klaimService.updateKlaim(klaim, this.klaim.id)
										.subscribe(data => {
											console.log(data);
										});
								}
							}

							let diagnosis = this.status_klaim.diagnosa.split("#");
							let tindakan = this.status_klaim.procedure.split("#");

							for (let i of diagnosis) {
								if (i !== '') {
									this.diagnosisService.getDiagnosisReference(i)
										.subscribe(data => {
											this.listDiagnosis.push(data);
										});
								}
							}

							for (let i of tindakan) {
								if (i !== '') {
									this.tindakanService.getTindakanReference(i)
										.subscribe(data => {
											this.listTindakan.push(data);
										});
								}
							}
						});
				}
				console.log(this.klaim);
			});
	}

	goBack(): void {
		this.location.back();
	}
}