import 'rxjs/add/operator/switchMap';
import { Component, Input, OnInit }	from '@angular/core';
import { ActivatedRoute, Params }	from '@angular/router';
import { Location }					from '@angular/common';

import * as _ from "lodash";
import { Pasien }					from './pasien';		
import { PasienService }			from './pasien.service';
import { RekamMedisService }		from './rekam-medis.service';

@Component({
 	selector: 'rekam-medis-eksternal-detail-page',
 	templateUrl: './rekam-medis-eksternal-detail.component.html',
 	providers: [RekamMedisService,
 				PasienService]
})

export class RekamMedisEksternalDetailComponent implements OnInit {
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
	allDiagnosis: any[] = [];
	allTindakan: any[] = [];
	anamnesis: any = {};
	allRiwayat: any[] = [];
	allAlergi: any[] = [];
	allVaksin: any[] = [];
	allResep: any[] = [];
	hasilPemeriksaan: any[] = [];

	constructor(
		private rekamMedisService: RekamMedisService,
		private route: ActivatedRoute,
		private location: Location
	) {}

	ngOnInit(): void {
		this.route.params
			.switchMap((params: Params) => this.rekamMedisService.getRekamMedisEksternalOfPasien(+params['idPasien'], +params['noEntry']))
			.subscribe(data => {
				if (data) {
					this.pasien = data.pasien;
					let sections: any[] = JSON.parse(data.komponen);
					for (let section of sections) {
						console.log(section.section.code);
						if (section.section.title === 'Allergies, Adverse Reactions, Alerts') {
							if (!_.isArray(section.section.text.table.tbody.tr)) {
								let alergi: any = {};
								alergi.nama = section.section.text.table.tbody.tr.td[0];
								alergi.status = section.section.text.table.tbody.tr.td[2];
								alergi.reaksi = section.section.text.table.tbody.tr.td[1].content.$;
								this.allAlergi.push(alergi);
							} else {
								for (let alergis of section.section.text.table.tbody.tr) {
									let alergi: any = {};
									alergi.nama = alergis.td[0];
									alergi.status = alergis.td[2];
									alergi.reaksi = alergis.td[1].content.$;
									this.allAlergi.push(alergi);
								}
							}
							
						}
						else if (section.section.title === 'ASSESSMENT') {
							this.allDiagnosis = section.section.text.list.item;
							console.log(this.allDiagnosis);
						}
						else if (section.section.title === 'REASON FOR VISIT/CHIEF COMPLAINT') {
							this.anamnesis.keluhan = section.section.text.paragraph;
							console.log(this.anamnesis.keluhan);
						}
						else if (section.section.title === 'HISTORY OF PRESENT ILLNESS') {
							this.allRiwayat = section.section.text.paragraph;
							console.log(this.allRiwayat);
						}
						else if (section.section.title === 'Immunizations') {
							if (!_.isArray(section.section.text.table.tbody.tr)) {
								let vaksin: any = {};
								vaksin.nama = section.section.text.table.tbody.tr.td[0].$;
								vaksin.tanggal = section.section.text.table.tbody.tr.td[1];
								this.allVaksin.push(vaksin);
							} else {
								for (let vaksins of section.section.text.table.tbody.tr) {
									let vaksin: any = {};
									vaksin.nama = vaksins.td[0].$;
									vaksin.tanggal = vaksins.td[1];
									this.allVaksin.push(vaksin);
								}
							}
							console.log(this.allVaksin);
						}
						else if (section.section.title === 'MEDICATIONS') {
							if (!_.isArray(section.section.text.table.tbody.tr)) {
								let resep: any = {};
								resep.jenis_obat = section.section.text.table.tbody.tr.td[0].content.$;
								resep.petunjuk_pemakaian = section.section.text.table.tbody.tr.td[1];
								resep.tanggal_mulai = section.section.text.table.tbody.tr.td[2];
								resep.status = section.section.text.table.tbody.tr.td[3];
								resep.indikasi_penyakit = section.section.text.table.tbody.tr.td[4];
								resep.instruksi = section.section.text.table.tbody.tr.td[5];
								this.allResep.push(resep);
							} else {
								for (let reseps of section.section.text.table.tbody.tr) {
									let resep: any = {};
									resep.jenis_obat = reseps.td[0].content.$;
									resep.petunjuk_pemakaian = reseps.td[1];
									resep.tanggal_mulai = reseps.td[2];
									resep.status = reseps.td[3];
									resep.indikasi_penyakit = reseps.td[4];
									resep.instruksi = reseps.td[5];
									this.allResep.push(resep);
								}
							}
							console.log(this.allResep);
						}
						else if (section.section.title === 'Procedures') {
							if (!_.isArray(section.section.text.table.tbody.tr)) {
								let tindakan: any = {};
								tindakan.nama = section.section.text.table.tbody.tr.td[0].content.$;
								tindakan.tanggal = section.section.text.table.tbody.tr.td[1];
								this.allTindakan.push(tindakan);
							} else {
								for (let tindakans of section.section.text.table.tbody.tr) {
									let tindakan: any = {};
									tindakan.nama = tindakans.td[0].content.$;
									tindakan.tanggal = tindakans.td[1];
									this.allTindakan.push(tindakan);
								}
							}
							console.log(this.allTindakan);
						}
						else if (section.section.title === 'REASON FOR REFERRAL') {
							this.anamnesis.alasan_rujukan = section.section.text.paragraph;
							console.log(this.anamnesis.alasan_rujukan);
						}
						else if (section.section.title === 'Vital Signs') {
							for (let i=1; i<section.section.text.table.thead.tr.th.length; i++) {
								let hasil: any = {};
								hasil.tanggal = section.section.text.table.thead.tr.th[i];
								
								let elements: any[] = [];
								section.section.text.table.tbody.tr.forEach((hasil, j) => {
									let element: any = {};
									element.nama = hasil.th.$;
									element.nilai = hasil.td[i-1].content.$;
									elements.push(element);
								});
								hasil.elements = elements;
								this.hasilPemeriksaan.push(hasil);
							}
						}

					};
					this.dokter = JSON.parse(data.identitas_dokter).assignedAuthor;
					if (this.noNextEntry < data.num_entries)
						this.end = false;
					else
						this.end = true;

					if (this.noPrevEntry !== -1)
						this.first = false;
					else
						this.first = true;	
				}
			});	
	}

	goBack(): void {
		this.location.back();
	}
}
