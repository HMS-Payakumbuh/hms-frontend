import { NgModule }      		from '@angular/core';
import { RouterModule, Routes }	from '@angular/router';

import { TransaksiComponent }   		from './transaksi/transaksi.component';
import { TransaksiDetailComponent }		from './transaksi/transaksi-detail.component';

import { PembayaranComponent }   		from './pembayaran/pembayaran.component';
import { PembayaranDetailComponent }   	from './pembayaran/pembayaran-detail.component';
import { KlaimComponent }   			from './pembayaran/klaim/klaim.component';
import { KlaimDetailComponent }   		from './pembayaran/klaim/klaim-detail.component';

import { PasienFormComponent }			from './pasien/pasien-form.component';
import { AntrianComponent }				from './antrian/antrian.component';
import { DaftarAntrianComponent }				from './antrian/daftar-antrian.component';

import { PoliklinikListComponent }		from './layanan/poliklinik-list.component';
import { PoliklinikDetailComponent }	from './layanan/poliklinik-detail.component';

import { RawatinapListComponent }		from './layanan/rawatinap-list.component';
import { RawatinapDetailComponent }	    from './layanan/rawatinap-detail.component';

import { DaftarObatComponent }			from './farmasi/obat-batch/daftar-obat.component';
import { DetailObatComponent }			from './farmasi/obat-batch/detail-obat.component';

import { DaftarObatMasukComponent }		from './farmasi/obat-masuk/daftar-obat-masuk.component';
import { DetailObatMasukComponent }		from './farmasi/obat-masuk/detail-obat-masuk.component';
import { ObatMasukFormComponent }		from './farmasi/obat-masuk/obat-masuk-form.component';

import { DaftarJenisObatComponent }		from './farmasi/jenis-obat/daftar-jenis-obat.component';
import { DetailJenisObatComponent }     from './farmasi/jenis-obat/detail-jenis-obat.component';
import { JenisObatFormComponent }		from './farmasi/jenis-obat/jenis-obat-form.component';

import { DaftarObatResepComponent }			from './farmasi/obat-resep/daftar-obat-resep.component';
import { DetailObatResepComponent }			from './farmasi/obat-resep/detail-obat-resep.component';
import { ObatResepFormComponent }			from './farmasi/obat-resep/obat-resep-form.component';

import { DaftarObatPindahComponent }      from './farmasi/obat-pindah/daftar-obat-pindah.component';
import { DetailObatPindahComponent }      from './farmasi/obat-pindah/detail-obat-pindah.component';
import { ObatPindahFormComponent }		from './farmasi/obat-pindah/obat-pindah-form.component';

import { DaftarObatRusakComponent }      from './farmasi/obat-rusak/daftar-obat-rusak.component';
import { DetailObatRusakComponent }      from './farmasi/obat-rusak/detail-obat-rusak.component';
import { ObatRusakFormComponent }      from './farmasi/obat-rusak/obat-rusak-form.component';

const routes: Routes = [
	{ path: '', redirectTo: '/', pathMatch: 'full' },
	{ path: 'transaksi', component: TransaksiComponent },
	{ path: 'transaksi/:id', component: TransaksiDetailComponent },
	{ path: 'pembayaran', component: PembayaranComponent },
	{ path: 'pembayaran/:id', component: PembayaranDetailComponent },
	{ path: 'klaim', component: KlaimComponent },
	{ path: 'klaim/:id', component: KlaimDetailComponent },
	{ path: 'pendaftaran', component: PasienFormComponent },
	{ path: 'antrian', component: AntrianComponent },
	{ path: 'daftar-antrian', component: DaftarAntrianComponent },
	{ path: 'pendaftaran', component: PasienFormComponent},
	{ path: 'poliklinik', component: PoliklinikListComponent },
	{ path: 'poliklinik/:namaPoliklinik/:idTransaksi', component: PoliklinikDetailComponent },
	{ path: 'rawatinap', component: RawatinapListComponent },	
	{ path: 'rawatinap/:noKamar/:idTransaksi', component: RawatinapDetailComponent },
	{ path: 'daftar-obat', component: DaftarObatComponent },
	{ path: 'daftar-obat/:kode-obat', component: DetailObatComponent },	
	{ path: 'obat-masuk', component: DaftarObatMasukComponent },
	{ path: 'obat-masuk/:kode-obat', component: DetailObatMasukComponent },
	{ path: 'obat-masuk-form', component: ObatMasukFormComponent },
	{ path: 'jenis-obat', component: DaftarJenisObatComponent },
	{ path: 'jenis-obat/:id', component: DetailJenisObatComponent },
	{ path: 'jenis-obat-form', component: JenisObatFormComponent },		
	{ path: 'obat-resep', component: DaftarObatResepComponent },
	{ path: 'obat-resep/:id', component: DetailObatResepComponent },	
	{ path: 'obat-resep-form', component: ObatResepFormComponent },
	{ path: 'obat-pindah', component: DaftarObatPindahComponent },
	{ path: 'obat-pindah/:id', component: DetailObatPindahComponent },
	{ path: 'obat-pindah-form', component: ObatPindahFormComponent },	
	{ path: 'obat-rusak', component: DaftarObatRusakComponent },	
	{ path: 'obat-rusak/:id', component: DetailObatRusakComponent },
	{ path: 'obat-rusak-form', component: ObatRusakFormComponent }
];

@NgModule ({
	imports: [
		RouterModule.forRoot(routes)
	],
	exports: [
		RouterModule
	]
})

export class AppRoutingModule {}