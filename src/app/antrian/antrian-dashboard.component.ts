import { Component, OnInit } from '@angular/core';

import { AntrianService }         from './antrian.service';
import { LaboratoriumService }      from '../layanan/laboratorium.service';
import { PoliklinikService }      from '../layanan/poliklinik.service';

import * as _ from "lodash";
import * as io from "socket.io-client";

@Component({
 	selector: 'antrian-dashboard',
 	templateUrl: './antrian-dashboard.component.html',
 	providers: [AntrianService,
 				LaboratoriumService,
 				PoliklinikService]
})

export class AntrianDashboardComponent implements OnInit {
	private allLayanan: any[];
	private allAntrian: any[];
	private allAntrian: any[] = [];
	private socket: any;
	private frontOfficeChecked: boolean = true;
	private layananChecked: boolean = false;

	public filterQuery = "";
 	public rowsOnPage = 10;
	public sortBy = "kategori";
	public sortOrder = "asc";

	constructor(
		private antrianService : AntrianService,
	    private poliklinikService: PoliklinikService,
	    private laboratoriumService: LaboratoriumService,
	) { this.socket = io('http://localhost') }

	ngOnInit() {
		this.initAntrianFrontOffice();
	}

	changeMode() {
		this.frontOfficeChecked = !this.frontOfficeChecked;
		this.layananChecked = !this.layananChecked;
		if (this.frontOfficeChecked)
			this.initAntrianFrontOffice();
		else if (this.layananChecked)
			this.initAntrian();	

	}

	initAntrianFrontOffice() {
		this.poliklinikService.getAllPoliklinik().subscribe(
		    data => {
		    	this.allAntrian = [];
		        for(let dat of data) {
		          this.allAntrian.push(_.pick(dat, ['nama', 'kategori_antrian', 'created_at', 'updated_at']));
		        }
		        this.laboratoriumService.getAllLaboratorium().subscribe(
		          data => {
		          	this.allLayanan = _.concat(this.allAntrian, data);
		            this.allAntrian = _.sortBy(_.unionBy(this.allAntrian, data, 'kategori_antrian'), 'kategori_antrian');
		            for(let kategori of this.allAntrian) {
		              this.socket.on('antrianFrontOffice'+kategori.kategori_antrian, this.updateAntrianFrontOffice.bind(this, kategori.kategori_antrian));
			          this.antrianService.getAntrianFrontOffice(kategori.kategori_antrian)
					      .subscribe(allAntrian => {
					      	if (allAntrian) {
					      		kategori.panjang = allAntrian.length;
					      	}
					      	let allLayanan:any[] = _.filter(this.allLayanan, {'kategori_antrian' : kategori.kategori_antrian});
					      	let tipeLayanan:any[] = [];
					      	for (let layanan of allLayanan) {
					      		tipeLayanan.push(_.pick(layanan, ['nama', 'kategori_antrian']));
					      	}
					      	kategori.layanan = tipeLayanan;
					      });
			        }
		          });
		      }
		    );
	}

	initAntrian() {
		this.poliklinikService.getAllPoliklinik().subscribe(
		    data => {
		    	this.allAntrian = [];
		        for(let dat of data) {
		          this.allAntrian.push(_.pick(dat, ['nama', 'kategori_antrian', 'created_at', 'updated_at']));
		        }
		        this.laboratoriumService.getAllLaboratorium().subscribe(
		          data => {
					this.allAntrian = _.concat(this.allAntrian, data);
					for(let layanan of this.allAntrian) {
						this.socket.on('antrianLayanan'+layanan.nama, this.updateAntrian.bind(this, layanan.nama));
						this.antrianService.getAllAntrian(layanan.nama).subscribe(
							allAntrian => {
								if (allAntrian) {
						      		layanan.panjang =  allAntrian.length;
						      	}
						})
					}
				});
	        });
	}

	updateAntrianFrontOffice(kategori: string) {
		this.antrianService.getAntrianFrontOffice(kategori)
	      .subscribe(allAntrian => {
	      	let i: number = _.findIndex(this.allAntrian, { 'kategori_antrian': kategori });
	      	this.allAntrian[i].panjang = allAntrian.length;
	      	let tipeLayanan:any[] = [];
	      	for (let layanan of allAntrian) {
	      		_.set(layanan, 'nama', layanan.nama_layanan);
	      		tipeLayanan.push(_.pick(layanan, ['nama', 'kategori_antrian']));
	      	}
	      	this.allAntrian[i].layanan = _.uniqBy(tipeLayanan, 'nama');
	      });
	}

	updateAntrian(layanan: string) {
		this.antrianService.getAllAntrian(layanan)
	      .subscribe(allAntrian => {
	      	let i: number = _.findIndex(this.allAntrian, { 'nama': layanan });
	      	this.allAntrian[i].panjang = allAntrian.length;
	      });
	}

	resetAntrianFrontOffice() {
		this.antrianService.resetAntrianFrontOffice().subscribe(data => {});
	}

	resetAntrian() {
		this.antrianService.resetAntrian().subscribe(data => {});
	}

}