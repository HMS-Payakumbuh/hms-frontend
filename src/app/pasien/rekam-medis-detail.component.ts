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
import { HasilLabService }			from '../layanan/hasil-lab.service';
import { TenagaMedisService }		from '../tenaga-medis/tenaga-medis.service';
import { ResepService }				from '../farmasi/resep/resep.service';

@Component({
 	selector: 'rekam-medis-detail-page',
 	templateUrl: './rekam-medis-detail.component.html',
 	providers: [RekamMedisService,
 				DiagnosisService,
 				TindakanService,
 				TenagaMedisService,
 				HasilLabService,
 				ResepService,
 				PasienService]
})

export class RekamMedisDetailComponent implements OnInit {
	response: any;
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
	perkembanganPasien: any;
	perkembangan:any[] = null;
	tanggalPemeriksaan:any[];
	anamnesis: any;
	allRiwayat: any;
	allAlergi: any;
	allPerkembangan: any;
	allTanggalPerkembangan: any;
	allRiwayatPenyakit: any;
	allHasilLab: any[];
	allResep: any[] = null;

	constructor(
		private rekamMedisService: RekamMedisService,
		private resepService: ResepService,
		private diagnosisService: DiagnosisService,
		private tindakanService: TindakanService,
		private tenagaMedisService: TenagaMedisService,
		private route: ActivatedRoute,
		private location: Location
	) {}

	ngOnInit(): void {
		this.route.params
			.switchMap((params: Params) => this.rekamMedisService.getRekamMedisOfPasien(+params['idPasien'], +params['noEntry']))
			.subscribe(data => {
				if (data) {
					this.pasien = data.pasien;
					this.hasilPemeriksaan = JSON.parse(data.hasil_pemeriksaan);
					if (data.perkembanganPasien) {
						this.perkembanganPasien = JSON.parse(data.perkembangan_pasien);
						this.perkembangan = this.perkembanganPasien.perkembangan.split(',');
						this.tanggalPemeriksaan = this.perkembanganPasien.tanggal.split(',');
					}
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
					this.resepService.getResepOfRekamMedis(data.id_pasien, data.tanggal_waktu)
						.subscribe(data => {
							if (!_.isEmpty(data))
								this.allResep = data;
						});			
					this.rekamMedisService.getAllRekamMedisOfPasien(this.pasien.id)
						.subscribe(allRekamMedis => {
							let allAnamnesis: any[] = [];
							let allPerkembangan: any[] = [];

							for (let rekamMedis of allRekamMedis) {
								let anamnesis: any = JSON.parse(rekamMedis.anamnesis);
								allAnamnesis.push(anamnesis);
								let perkembangan: any = null;
								if (rekamMedis.perkembangan_pasien) {
									perkembangan = JSON.parse(rekamMedis.perkembangan_pasien)
									allPerkembangan.push(perkembangan);
								}
								
							}
							let allAlergi: any[] = [];
							let allRiwayat: any[] = [];
							let allPerkembanganPasien: any[] = [];
							let allTanggalPerkembangan: any[] = [];
							if (!_.isEmpty(allPerkembangan)) {
								for (let perkembangan of allPerkembangan) {
									if (perkembangan) {
										if (_.includes(perkembangan.perkembangan, ',')) {
											let morePerkembangan: any[] = perkembangan.perkembangan.split(',');
											allPerkembanganPasien = allPerkembanganPasien.concat(morePerkembangan);
										} else if (perkembangan.perkembangan != '') {
											allPerkembanganPasien.push(perkembangan.perkembangan_pasien);
										}

										if (_.includes(perkembangan.tanggal, ',')) {
											let moreTanggalPerkembangan: any[] = perkembangan.tanggal.split(',');
											allTanggalPerkembangan = allTanggalPerkembangan.concat(moreTanggalPerkembangan);
										} else if (perkembangan.tanggal != '') {
											allTanggalPerkembangan.push(perkembangan.tanggal);
										}
									}
								}
								this.allPerkembangan = _.uniq(allPerkembanganPasien, true);
								this.allTanggalPerkembangan =  _.uniq(allTanggalPerkembangan, true);
								if (_.isEmpty(this.allPerkembangan))
									this.allPerkembangan = ['Tidak ada perkembangan pasien yang tercatat.'];
								if (_.isEmpty(this.allTanggalPerkembangan))
									this.allTanggalPerkembangan = ['Tidak ada perkembangan pasien yang tercatat.'];
							}
							

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
