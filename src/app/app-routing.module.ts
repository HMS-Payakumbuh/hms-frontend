import { NgModule }      		from '@angular/core';
import { RouterModule, Routes }	from '@angular/router';

import { TransaksiComponent }   		from './transaksi/transaksi.component';
import { TransaksiDetailComponent }		from './transaksi/transaksi-detail.component';

import { PembayaranComponent }   		from './pembayaran/pembayaran.component';
import { PembayaranDetailComponent }   	from './pembayaran/pembayaran-detail.component';
import { KlaimComponent }   			from './pembayaran/klaim/klaim.component';
import { KlaimDetailComponent }   		from './pembayaran/klaim/klaim-detail.component';

import { PasienFormComponent }			from './pasien/pasien-form.component';
import { PasienListComponent }			from './pasien/pasien-list.component';
import { CatatanKematianFormComponent } from './pasien/catatan-kematian-form.component';
import { AntrianComponent }				from './antrian/antrian.component';
import { DaftarAntrianComponent }	    from './antrian/daftar-antrian.component';

import { PoliklinikListComponent }		from './layanan/poliklinik-list.component';
import { PoliklinikFormComponent }	from './layanan/poliklinik-form.component';
import { PoliklinikPemeriksaanComponent }	from './layanan/poliklinik-pemeriksaan.component';

import { LaboratoriumListComponent }		from './layanan/laboratorium-list.component';
import { LaboratoriumPemeriksaanComponent }	from './layanan/laboratorium-pemeriksaan.component';

import { RawatinapListComponent }		from './layanan/rawatinap-list.component';
import { RawatinapDetailComponent }	    from './layanan/rawatinap-detail.component';
import { RawatinapFormComponent }	    from './layanan/rawatinap-form.component';

import { PemakaianKamarOperasiListComponent }		from './layanan/pemakaian-kamar-operasi-list.component';
import { PemakaianKamarOperasiFormComponent }	    from './layanan/pemakaian-kamar-operasi-form.component';

import { TenagaMedisListComponent } 	from './tenaga-medis/tenaga-medis-list.component';
import { JadwalDokterListComponent }	from './tenaga-medis/jadwal-dokter-list.component';

import { TindakanReferenceListComponent }		from './layanan/tindakan-reference-list.component';
import { TindakanReferenceFormComponent }		from './layanan/tindakan-reference-form.component';

import { DaftarObatComponent }			from './farmasi/obat-batch/daftar-obat.component';
import { DetailObatComponent }			from './farmasi/obat-batch/detail-obat.component';

import { DaftarObatMasukComponent }		from './farmasi/obat-masuk/daftar-obat-masuk.component';
import { DetailObatMasukComponent }		from './farmasi/obat-masuk/detail-obat-masuk.component';
import { ObatMasukFormComponent }		from './farmasi/obat-masuk/obat-masuk-form.component';

import { DaftarJenisObatComponent }		from './farmasi/jenis-obat/daftar-jenis-obat.component';
import { DetailJenisObatComponent }     from './farmasi/jenis-obat/detail-jenis-obat.component';
import { JenisObatFormComponent }		from './farmasi/jenis-obat/jenis-obat-form.component';
import { EditJenisObatComponent }		from './farmasi/jenis-obat/edit-jenis-obat.component';

import { DaftarObatResepComponent }			from './farmasi/obat-resep/daftar-obat-resep.component';
import { DetailObatResepComponent }			from './farmasi/obat-resep/detail-obat-resep.component';
import { ObatResepFormComponent }			from './farmasi/obat-resep/obat-resep-form.component';

import { DaftarObatPindahComponent }      from './farmasi/obat-pindah/daftar-obat-pindah.component';
import { DetailObatPindahComponent }      from './farmasi/obat-pindah/detail-obat-pindah.component';
import { ObatPindahFormComponent }		from './farmasi/obat-pindah/obat-pindah-form.component';

import { DaftarObatRusakComponent }      from './farmasi/obat-rusak/daftar-obat-rusak.component';
import { DetailObatRusakComponent }      from './farmasi/obat-rusak/detail-obat-rusak.component';
import { ObatRusakFormComponent }      from './farmasi/obat-rusak/obat-rusak-form.component';

import { SettingsComponent }        from './settings/settings.component';

const routes: Routes = [
	{ path: '', redirectTo: '/pendaftaran', pathMatch: 'full' },
	{ path: 'transaksi', component: TransaksiComponent },
	{ path: 'transaksi/:id', component: TransaksiDetailComponent },
	{ path: 'pembayaran', component: PembayaranComponent },
	{ path: 'pembayaran/:id', component: PembayaranDetailComponent },
	{ path: 'klaim', component: KlaimComponent },
	{ path: 'klaim/:id', component: KlaimDetailComponent },
	{ path: 'pendaftaran', component: PasienFormComponent },
	{ path: 'antrian', component: AntrianComponent },
	{ path: 'antrian/:namaLayanan', component: AntrianComponent },
	{ path: 'daftar-antrian', component: DaftarAntrianComponent },
	{ path: 'daftar-pasien', component: PasienListComponent },
	{ path: 'pendaftaran', component: PasienFormComponent},
	{ path: 'daftar-pasien/catatan-kematian-form', component: CatatanKematianFormComponent},

	{ path: 'poliklinik', component: PoliklinikListComponent },
	{ path: 'poliklinik/:namaPoliklinik', component: PoliklinikFormComponent },	
	{ path: 'poliklinik/:namaPoliklinik/:idTransaksi', component: PoliklinikPemeriksaanComponent },

	{ path: 'laboratorium', component: LaboratoriumListComponent },
	{ path: 'laboratorium/:namaLaboratorium/:idTransaksi', component: LaboratoriumPemeriksaanComponent },	

	{ path: 'rawatinap', component: RawatinapListComponent },	
	{ path: 'rawatinap/:noKamar', component: RawatinapDetailComponent },
	{ path: 'rawatinap/:noKamar/rawatinap-form', component: RawatinapFormComponent },
	{ path: 'kamaroperasi', component: PemakaianKamarOperasiListComponent },
	{ path: 'kamaroperasi-form', component: PemakaianKamarOperasiFormComponent },	

	{ path: 'tenaga-medis', component: TenagaMedisListComponent },
	{ path: 'jadwal-dokter', component: JadwalDokterListComponent },
	{ path: 'daftar-tindakan', component: TindakanReferenceListComponent },
	{ path: 'daftar-tindakan/:kode', component: TindakanReferenceFormComponent },	

	{ path: 'daftar-obat', component: DaftarObatComponent },
	{ path: 'daftar-obat/:kode-obat', component: DetailObatComponent },	
	{ path: 'obat-masuk', component: DaftarObatMasukComponent },
	{ path: 'obat-masuk/:kode-obat', component: DetailObatMasukComponent },
	{ path: 'obat-masuk-form', component: ObatMasukFormComponent },
	{ path: 'jenis-obat', component: DaftarJenisObatComponent },
	{ path: 'jenis-obat/:id', component: DetailJenisObatComponent },	
	{ path: 'jenis-obat/edit/:id', component: EditJenisObatComponent },
	{ path: 'jenis-obat-form', component: JenisObatFormComponent },		
	{ path: 'obat-resep', component: DaftarObatResepComponent },
	{ path: 'obat-resep/:id', component: DetailObatResepComponent },	
	{ path: 'obat-resep-form', component: ObatResepFormComponent },
	{ path: 'obat-pindah', component: DaftarObatPindahComponent },
	{ path: 'obat-pindah/:id', component: DetailObatPindahComponent },
	{ path: 'obat-pindah-form', component: ObatPindahFormComponent },	
	{ path: 'obat-rusak', component: DaftarObatRusakComponent },	
	{ path: 'obat-rusak/:id', component: DetailObatRusakComponent },
	{ path: 'obat-rusak-form', component: ObatRusakFormComponent },
	{ path: 'settings', component: SettingsComponent }
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