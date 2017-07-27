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
	dokter: any;
	pasien: Pasien;
	umur: number = 0;
	noNextEntry: number;
	noPrevEntry: number;
	end: boolean;
	first: boolean;
	tanggal: string;
	listOfTindakan: number[] = [];
	allDiagnosis: any[];
	allTindakan: any[];
	hasilPemeriksaan: any;
	anamnesis: any;
	allRiwayat: any;
	allAlergi: any;
	allRiwayatPenyakit: any;

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
		      	this.noPrevEntry = parseInt(params['noEntry']) - 1;
		        this.noNextEntry = parseInt(params['noEntry']) + 1;
		    });
		this.route.params
			.switchMap((params: Params) => this.rekamMedisService.getRekamMedisOfPasien(+params['idPasien'], +params['noEntry']))
			.subscribe(data => {
				if (data) {
					this.pasien = data.pasien;
					this.hasilPemeriksaan = JSON.parse(data.hasil_pemeriksaan);
					this.anamnesis = JSON.parse(data.anamnesis);
					this.tanggal = data.tanggal_waktu;
					this.dokter = data.tenaga_medis;
					if (this.noNextEntry < data.num_entries)
						this.end = false;
					else
						this.end = true;

					if (this.noPrevEntry !== -1)
						this.first = false;
					else
						this.first = true;	

					this.diagnosisService.getDiagnosisOfRekamMedis(data.id_pasien, data.tanggal_waktu)
						.subscribe(data => {
							this.allDiagnosis = data;
						});
					this.tindakanService.getTindakanOfRekamMedis(data.id_pasien, data.tanggal_waktu)
						.subscribe(data => {
							this.allTindakan = data;
						});
					this.rekamMedisService.getAllRekamMedisOfPasien(this.pasien.id)
						.subscribe(allRekamMedis => {
							let allAnamnesis: any[] = [];
							for (let rekamMedis of allRekamMedis) {
								let anamnesis: any = JSON.parse(rekamMedis.anamnesis);
								allAnamnesis.push(anamnesis);
							}
							let allAlergi: any[] = [];
							let allRiwayat: any[] = [];
							for (let anamnesis of allAnamnesis) {
								if (anamnesis) {
									if (_.includes(anamnesis.alergi, ',')) {
										let moreAlergi: any[] = anamnesis.alergi.split(',');
										allAlergi = allAlergi.concat(moreAlergi);
									} else if (anamnesis.alergi != '') {
										allAlergi.push(anamnesis.alergi);
									}

									if (_.includes(anamnesis.riwayat_penyakit, ',')) {
										let moreRiwayat: any[] = anamnesis.riwayat_penyakit.split(',');
										allRiwayat = allRiwayat.concat(moreRiwayat);
									} else if (anamnesis.riwayat_penyakit != '') {
										allRiwayat.push(anamnesis.riwayat_penyakit);
									}
								}
							}
							this.allAlergi = _.uniq(allAlergi, true);
							this.allRiwayatPenyakit =  _.uniq(allRiwayat, true);
							if (_.isEmpty(this.allAlergi))
								this.allAlergi = ['Tidak ada alergi yang tercatat.'];
							if (_.isEmpty(this.allRiwayatPenyakit))
								this.allRiwayatPenyakit = ['Tidak ada penyakit yang tercatat.'];
						});		
				}
			});	
	}

	loadRiwayat(): void {
		this.diagnosisService.getDiagnosisOfPasien(this.pasien.id)
			.subscribe(data => {
				let allTanggalDiagnosis: any[] =  _.uniqBy(data, 'tanggal_waktu');
				this.allRiwayat = [];
				for (let tanggalDiagnosis of allTanggalDiagnosis) {
					let json: any = { tanggal_waktu: tanggalDiagnosis.tanggal_waktu };
					let allDiagnosis: any = _.filter(data, {'tanggal_waktu': tanggalDiagnosis.tanggal_waktu});
					json.allDiagnosis = allDiagnosis;
					this.allRiwayat.push(json);
				}
			});	
	}

	goBack(): void {
		this.location.back();
	}
}
