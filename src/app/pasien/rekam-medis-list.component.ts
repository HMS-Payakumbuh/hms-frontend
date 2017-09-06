import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Location }					from '@angular/common';

import { RekamMedis }	from './rekam-medis';
import { RekamMedisService }		from './rekam-medis.service';
import { Transaksi }	from '../transaksi/transaksi';
import { TransaksiService }	from '../transaksi/transaksi.service';

import * as _ from "lodash";

@Component({
 	selector: 'rekam-medis-list',
 	templateUrl: './rekam-medis-list.component.html',
 	providers: [
 				RekamMedisService,
 				TransaksiService
 				]
})

export class RekamMedisListComponent implements OnInit {
	public allRekamMedis: RekamMedis[];
	public allRekamMedisEksternal: any[];
	public rekamMedis: RekamMedis = null;
	public pasienId: number = null;
	public layanan: string = '';
	public transaksi: any;
	public transaksiId: number = null;
	private sub: any;
	private user: any = JSON.parse(localStorage.getItem('currentUser'));

	public filterQuery = "";
 	public rowsOnPage = 10;
	public sortBy = "id";
	public sortOrder = "desc";

	constructor(
		private route: ActivatedRoute,
		private location: Location,
		private rekamMedisService: RekamMedisService,
		private transaksiService: TransaksiService
	) {}

	ngOnInit() {
		this.sub = this.route.params
	      .subscribe(params => {
	        this.pasienId = params['idPasien'];
	        this.layanan = params['namaLayanan'];
	        this.transaksiId = params['idTransaksi'];
	    });
	    if (this.user.role == 'dokter') {
	    	this.rekamMedisService.getAllRekamMedisOfPasien(this.pasienId)
			.subscribe(allRekamMedis => {
				this.allRekamMedis = _.filter(
					_.each(allRekamMedis, rekamMedis => {
						if (rekamMedis.anamnesis)
							_.set(rekamMedis, 'keluhan', JSON.parse(rekamMedis.anamnesis).keluhan);
						else
							_.set(rekamMedis, 'keluhan', '-');
					}),
					rekamMedis => rekamMedis.keluhan != '-'
				)
			});
			if (this.transaksiId != undefined) {
				this.transaksiService.getTransaksi(this.transaksiId).subscribe(transaksi => {
			        this.transaksi = transaksi.transaksi;
			        if (this.transaksi.rujukan) {
			        	this.rekamMedisService.getAllRekamMedisEksternalOfPasien(this.pasienId)
						.subscribe(allRekamMedis => {
							this.allRekamMedisEksternal = _.each(allRekamMedis, rekamMedis => {
      						_.set(rekamMedis, 'keluhan', this.transaksi.rujukan_pasien.diagnosis);
                })
						});
			        }
			    });
			}
	    }
	}

	goBack() {
		this.location.back();
	}
}
