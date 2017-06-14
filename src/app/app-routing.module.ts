import { NgModule }      		from '@angular/core';
import { RouterModule, Routes }	from '@angular/router';

import { TransaksiComponent }   from './transaksi.component';
import { PasienFormComponent }	from './pasien/pasien-form.component';

const routes: Routes = [
	{ path: '', redirectTo: '/', pathMatch: 'full' },
	{ path: 'transaksi', component: TransaksiComponent },
	{ path: 'pendaftaran', component: PasienFormComponent}
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