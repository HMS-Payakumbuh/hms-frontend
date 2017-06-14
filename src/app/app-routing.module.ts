import { NgModule }      		from '@angular/core';
import { RouterModule, Routes }	from '@angular/router';

import { TransaksiComponent }			from './transaksi.component';
import { TransaksiDetailComponent }		from './transaksi-detail.component';

const routes: Routes = [
	{ path: '', redirectTo: '/', pathMatch: 'full' },
	{ path: 'transaksi', component: TransaksiComponent },
	{ path: 'transaksi/:id', component: TransaksiDetailComponent }
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