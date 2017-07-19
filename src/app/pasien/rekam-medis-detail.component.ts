import 'rxjs/add/operator/switchMap';
import { Component, Input, OnInit }	from '@angular/core';
import { ActivatedRoute, Params }	from '@angular/router';
import { Location }					from '@angular/common';

import * as _ from "lodash";
import { Pasien }					from './pasien';		
import { PasienService }			from './pasien.service';
import { RekamMedisService }		from './rekam-medis.service';
import { DiagnosisService }			from '../layanan/diagnosis.service';
import { TindakanService }			from '../layanan/tindakan.service';
import { TenagaMedisService }		from '../tenaga-medis/tenaga-medis.service';

@Component({
 	selector: 'rekam-medis-detail-page',
 	templateUrl: './rekam-medis-detail.component.html',
 	providers: [RekamMedisService,
 				DiagnosisService,
 				TindakanService,
 				TenagaMedisService,
 				PasienService]
})

export class RekamMedisDetailComponent implements OnInit {
	response: any;
	sub: any;
	transaksi: any;
	pasien: Pasien;
	umur: number = 0;
	noEntry: number;
	end: boolean;
	tanggal: string;
	listOfTindakan: number[] = [];
	allDiagnosis: any[];
	allTindakan: any[];
	hasilPemeriksaan: any;
	anamnesis: any;

	constructor(
		private rekamMedisService: RekamMedisService,
		private diagnosisService: DiagnosisService,
		private tindakanService: TindakanService,
		private tenagaMedisService: TenagaMedisService,
		private route: ActivatedRoute,
		private location: Location
	) {}

	ngOnInit(): void {
		this.sub = this.route.params
		      .subscribe(params => {
		        this.noEntry = parseInt(params['noEntry']) + 1;
		    });
		this.route.params
			.switchMap((params: Params) => this.rekamMedisService.getRekamMedisOfPasien(+params['idPasien'], +params['noEntry']))
			.subscribe(data => {
				if (data) {
					this.pasien = data.pasien;
					this.hasilPemeriksaan = JSON.parse(data.hasil_pemeriksaan);
					this.anamnesis = JSON.parse(data.anamnesis);
					this.tanggal = data.tanggal_waktu.substring(0, 10);
					if (this.noEntry < data.num_entries)
						this.end = false;
					else
						this.end = true;

					this.diagnosisService.getDiagnosisOfRekamMedis(data.id_pasien, data.tanggal_waktu)
						.subscribe(data => {
							this.allDiagnosis = data;
						});
					this.tindakanService.getTindakanOfRekamMedis(data.id_pasien, data.tanggal_waktu)
						.subscribe(data => {
							this.allTindakan = data;
						});	
				}
			});	
	}

	goBack(): void {
		this.location.back();
	}
}
