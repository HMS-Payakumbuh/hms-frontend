import { NgModule }      		from '@angular/core';
import { RouterModule, Routes }	from '@angular/router';

import { TransaksiComponent }   		from './transaksi/transaksi.component';
import { TransaksiDetailComponent }		from './transaksi/transaksi-detail.component';
import { PasienFormComponent }			from './pasien/pasien-form.component';
import { AntrianComponent }				from './antrian/antrian.component';
import { PoliklinikComponent }			from './layanan/poliklinik.component';

import { DaftarObatComponent }			from './farmasi/daftar-obat/daftar-obat.component';
import { DetailObatComponent }			from './farmasi/detail-obat/detail-obat.component';
import { ObatMasukFormComponent }		from './farmasi/obat-masuk-form/obat-masuk-form.component';

import { DaftarJenisObatComponent }		from './farmasi/daftar-jenis-obat/daftar-jenis-obat.component';
import { JenisObatFormComponent }		from './farmasi/jenis-obat-form/jenis-obat-form.component';

import { ObatPindahFormComponent }		from './farmasi/obat-pindah-form/obat-pindah-form.component';

import { DaftarObatRusakComponent }      from './farmasi/daftar-obat-rusak/daftar-obat-rusak.component';
import { ObatRusakFormComponent }      from './farmasi/obat-rusak-form/obat-rusak-form.component';

const routes: Routes = [
	{ path: '', redirectTo: '/', pathMatch: 'full' },
	{ path: 'pendaftaran', component: PasienFormComponent },
	{ path: 'transaksi', component: TransaksiComponent },
	{ path: 'antrian', component: AntrianComponent },
	{ path: 'pendaftaran', component: PasienFormComponent},
	{ path: 'transaksi/:id', component: TransaksiDetailComponent },
	{ path: 'poliklinik', component: PoliklinikComponent },
	{ path: 'daftar-obat', component: DaftarObatComponent },
	{ path: 'daftar-obat/:id', component: DetailObatComponent },
	{ path: 'obat-masuk-form', component: ObatMasukFormComponent },
	{ path: 'jenis-obat', component: DaftarJenisObatComponent },
	{ path: 'jenis-obat-form', component: JenisObatFormComponent },	
	{ path: 'obat-pindah-form', component: ObatPindahFormComponent },	
	{ path: 'obat-rusak', component: DaftarObatRusakComponent },
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