import { NgModule }      		from '@angular/core';
import { RouterModule, Routes }	from '@angular/router';

import { TransaksiComponent }   		from './transaksi/transaksi.component';
import { TransaksiDetailComponent }		from './transaksi/transaksi-detail.component';
import { PasienFormComponent }			from './pasien/pasien-form.component';
import { AntrianComponent }				from './antrian/antrian.component';
import { RawatJalanComponent }			from './rawat-jalan.component';

import { DaftarObatComponent }			from './farmasi/daftar-obat/daftar-obat.component';
import { DetailObatComponent }			from './farmasi/detail-obat/detail-obat.component';
import { ObatMasukFormComponent }		from './farmasi/obat-masuk-form/obat-masuk-form.component';

import { DaftarJenisObatComponent }		from './farmasi/daftar-jenis-obat/daftar-jenis-obat.component';
import { JenisObatFormComponent }		from './farmasi/jenis-obat-form/jenis-obat-form.component';

const routes: Routes = [
	{ path: '', redirectTo: '/', pathMatch: 'full' },
	{ path: 'pendaftaran', component: PasienFormComponent },
	{ path: 'transaksi', component: TransaksiComponent },
	{ path: 'antrian', component: AntrianComponent },
	{ path: 'pendaftaran', component: PasienFormComponent},
	{ path: 'transaksi/:id', component: TransaksiDetailComponent },
	{ path: 'rawat-jalan', component: RawatJalanComponent },
	{ path: 'daftar-obat', component: DaftarObatComponent },
	{ path: 'daftar-obat/:id', component: DetailObatComponent },
	{ path: 'obat-masuk-form', component: ObatMasukFormComponent },
	{ path: 'jenis-obat', component: DaftarJenisObatComponent },
	{ path: 'jenis-obat-form', component: RawatJalanComponent }
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