import { NgModule }      		from '@angular/core';
import { RouterModule, Routes }	from '@angular/router';

import { TransaksiComponent }   from './transaksi.component';

const routes: Routes = [
	{ path: '', redirectTo: '/', pathMatch: 'full' },
	{ path: 'transaksi', component: TransaksiComponent }
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