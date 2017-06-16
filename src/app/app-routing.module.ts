import { NgModule }      		from '@angular/core';
import { RouterModule, Routes }	from '@angular/router';

import { TransaksiComponent }   from './transaksi.component';
import { PasienFormComponent }	from './pasien/pasien-form.component';
import { AntrianComponent }	from './antrian/antrian.component';
import { TransaksiDetailComponent }		from './transaksi-detail.component';
import { RawatJalanComponent }			from './rawat-jalan.component';

const routes: Routes = [
	{ path: '', redirectTo: '/', pathMatch: 'full' },
	{ path: 'pendaftaran', component: PasienFormComponent },
	{ path: 'transaksi', component: TransaksiComponent },
	{ path: 'antrian', component: AntrianComponent },
	{ path: 'pendaftaran', component: PasienFormComponent},
	{ path: 'transaksi/:id', component: TransaksiDetailComponent },
	{ path: 'rawat-jalan', component: RawatJalanComponent }
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