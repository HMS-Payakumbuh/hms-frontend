import { Component } from '@angular/core';
import { ActivatedRoute, Params }	from '@angular/router';
import { Location }					from '@angular/common';
import { Observable } 	from 'rxjs/Observable';

import { StokObat }			from '../stok-obat/stok-obat';
import { StokObatService }		from '../stok-obat/stok-obat.service';

import { ObatMasuk }			from '../obat-masuk/obat-masuk';
import { ObatMasukService }		from '../obat-masuk/obat-masuk.service';

import { ObatPindah }			from '../obat-pindah/obat-pindah';
import { ObatPindahService }		from '../obat-pindah/obat-pindah.service';

import { ObatRusak }			from '../obat-rusak/obat-rusak';
import { ObatRusakService }		from '../obat-rusak/obat-rusak.service';

import { ObatTindakan }			from '../obat-tindakan/obat-tindakan';
import { ObatTindakanService }		from '../obat-tindakan/obat-tindakan.service';

import { ObatEceranItem }			from '../obat-eceran/obat-eceran-item';
import { ObatEceranService }		from '../obat-eceran/obat-eceran.service';

import { ObatTebusItem }			from '../obat-tebus/obat-tebus-item';
import { ObatTebusService }		from '../obat-tebus/obat-tebus.service';

import { StockOpname }			from './stock-opname';
import { StockOpnameItem }			from './stock-opname-item';
import { StockOpnameService }		from './stock-opname.service';

import { LokasiObat }	from '../lokasi-obat/lokasi-obat';
import { LokasiObatService }		from '../lokasi-obat/lokasi-obat.service';

@Component({
 	selector: 'stock-opname-form-page',
 	templateUrl: './stock-opname-form.component.html',
 	providers: [StokObatService, 
 				StockOpnameService, 
 				LokasiObatService, 
 				ObatMasukService,
 				ObatPindahService, 
 				ObatRusakService,
 				ObatTindakanService,
 				ObatEceranService,
 				ObatTebusService]
})

export class StockOpnameFormComponent {
	public stockOpname: StockOpname = new StockOpname();
	public allStokObat: StokObat[] = [];
	public allStockOpnameItem: StockOpnameItem[] = [];

	public filterQuery = "";
    public rowsOnPage = 5;
    public sortBy = "id";
    public sortOrder = "asc";

    public lokasiData: LokasiObat;

	constructor(
		private stokObatService: StokObatService,
		private stockOpnameService: StockOpnameService,
		private lokasiObatService: LokasiObatService,
		private obatMasukService: ObatMasukService,
		private obatPindahService: ObatPindahService,
		private obatRusakService: ObatRusakService,
		private obatTindakanService: ObatTindakanService,
		private obatEceranService: ObatEceranService,
 		private	obatTebusService: ObatTebusService,
		private route: ActivatedRoute,
		private location: Location
	) {}

	ngOnInit(): void {
		this.route.params
			.subscribe((params: Params) => {
				this.stockOpname.lokasi = +params['lokasi'];

				this.lokasiObatService.getLokasiObat(this.stockOpname.lokasi).subscribe(
					data => this.lokasiData = data
				)	
				
				this.stokObatService.getStokObatByLocation(this.stockOpname.lokasi).subscribe(
					data => {
						this.allStokObat = data;
						for (let stokObat of this.allStokObat) {							

							let temp = new StockOpnameItem();
							temp.id_stok_obat = stokObat.id;
							temp.id_jenis_obat = stokObat.id_jenis_obat;
    						temp.jumlah_akhir = stokObat.jumlah;
    						temp.jumlah_awal = stokObat.jumlah;
    						temp.jumlah_fisik = stokObat.jumlah;
							    
							this.obatMasukService.getTodayObatMasuk(stokObat.id).subscribe(
								data1 => {
									stokObat.obat_masuk = data1;
									for (let obatMasuk of stokObat.obat_masuk) {
										temp.jumlah_awal = temp.jumlah_awal - obatMasuk.jumlah;
									}
								}
							);
							this.obatPindahService.getTodayObatPindahMasuk(stokObat.id).subscribe(
								data1 => {
									stokObat.obat_pindah_masuk = data1;
									for (let obatPindahMasuk of stokObat.obat_pindah_masuk) {
										temp.jumlah_awal = temp.jumlah_awal - obatPindahMasuk.jumlah;
									}
								}
							);
							this.obatPindahService.getTodayObatPindahKeluar(stokObat.id).subscribe(
								data2 => {
									stokObat.obat_pindah_keluar = data2;
									for (let obatPindahKeluar of stokObat.obat_pindah_keluar) {
										temp.jumlah_awal = temp.jumlah_awal + obatPindahKeluar.jumlah;
									}
								}
							);   
							this.obatRusakService.getTodayObatRusak(stokObat.id).subscribe(
								data3 => {
									stokObat.obat_rusak = data3;
									for (let obatRusak of stokObat.obat_rusak) {
										temp.jumlah_awal = temp.jumlah_awal + obatRusak.jumlah;
									}
								}
							);
							this.obatTindakanService.getTodayObatTindakan(stokObat.id).subscribe(
								data4 => {
									stokObat.obat_tindakan = data4;
									for (let obatTindakan of stokObat.obat_tindakan) {
										temp.jumlah_awal = temp.jumlah_awal + obatTindakan.jumlah;
									}
								}
							);
							this.obatTebusService.getTodayObatTebus(stokObat.id).subscribe(
								data5 => {
									stokObat.obat_tebus_item = data5;
									for (let obatTebusItem of stokObat.obat_tebus_item) {
										temp.jumlah_awal = temp.jumlah_awal + obatTebusItem.jumlah;
									}
								}
							);
							this.obatEceranService.getTodayObatEceran(stokObat.id).subscribe(
								data6 => {
									stokObat.obat_eceran_item = data6;
									for (let obatEceranItem of stokObat.obat_eceran_item) {
										temp.jumlah_awal = temp.jumlah_awal + obatEceranItem.jumlah;
									}
								}
							);

    						temp.stok_obat = stokObat;
							this.allStockOpnameItem.push(temp);
						}                  
                    }			
				);
			}
		);	
	}

	private save() {
		this.stockOpname.stock_opname_item = this.allStockOpnameItem;

		this.stockOpnameService.createStockOpname(this.stockOpname).subscribe(
	       	data => {
	         	this.location.back();
	         	return true;
	       	},
	       	error => {
		        console.error("Error saving!");
		        return Observable.throw(error);
	       	}
	    )
	}
}