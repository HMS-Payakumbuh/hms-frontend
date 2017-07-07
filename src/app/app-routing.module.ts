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
import { PoliklinikPemeriksaanComponent }	from './layanan/poliklinik-pemeriksaan.component';

import { LaboratoriumListComponent }		from './layanan/laboratorium-list.component';
import { LaboratoriumPemeriksaanComponent }	from './layanan/laboratorium-pemeriksaan.component';

import { RawatinapListComponent }		from './layanan/rawatinap-list.component';
import { RawatinapDetailComponent }	    from './layanan/rawatinap-detail.component';
import { KamarOperasiListComponent }		from './layanan/kamar-operasi-list.component';
// import { KamarJenazahListComponent }		from './layanan/kamar-jenazah-list.component';

import { PemakaianKamarOperasiListComponent }		from './layanan/pemakaian-kamar-operasi-list.component';
import { PemakaianKamarJenazahListComponent }		from './layanan/pemakaian-kamar-jenazah-list.component';

import { TenagaMedisListComponent } 	from './tenaga-medis/tenaga-medis-list.component';
import { JadwalDokterListComponent }	from './tenaga-medis/jadwal-dokter-list.component';

import { DiagnosisReferenceListComponent }	from './layanan/diagnosis-reference-list.component';
import { TindakanReferenceListComponent }		from './layanan/tindakan-reference-list.component';

import { DaftarStokObatComponent }			from './farmasi/stok-obat/daftar-stok-obat.component';
import { DetailStokObatComponent }			from './farmasi/stok-obat/detail-stok-obat.component';

import { DaftarLokasiObatComponent }			from './farmasi/lokasi-obat/daftar-lokasi-obat.component';

import { DaftarObatMasukComponent }		from './farmasi/obat-masuk/daftar-obat-masuk.component';
import { DetailObatMasukComponent }		from './farmasi/obat-masuk/detail-obat-masuk.component';
import { ObatMasukFormComponent }		from './farmasi/obat-masuk/obat-masuk-form.component';

import { DaftarJenisObatComponent }		from './farmasi/jenis-obat/daftar-jenis-obat.component';
import { DetailJenisObatComponent }     from './farmasi/jenis-obat/detail-jenis-obat.component';
import { JenisObatFormComponent }		from './farmasi/jenis-obat/jenis-obat-form.component';
import { EditJenisObatComponent }		from './farmasi/jenis-obat/edit-jenis-obat.component';

import { DaftarObatTebusComponent }			from './farmasi/obat-tebus/daftar-obat-tebus.component';
import { DetailObatTebusComponent }			from './farmasi/obat-tebus/detail-obat-tebus.component';
import { ObatTebusFormComponent }			from './farmasi/obat-tebus/obat-tebus-form.component';

import { DaftarObatPindahComponent }      from './farmasi/obat-pindah/daftar-obat-pindah.component';
import { DetailObatPindahComponent }      from './farmasi/obat-pindah/detail-obat-pindah.component';
import { ObatPindahFormComponent }		from './farmasi/obat-pindah/obat-pindah-form.component';

import { DaftarObatRusakComponent }      from './farmasi/obat-rusak/daftar-obat-rusak.component';
import { DetailObatRusakComponent }      from './farmasi/obat-rusak/detail-obat-rusak.component';
import { ObatRusakFormComponent }      from './farmasi/obat-rusak/obat-rusak-form.component';

import { DaftarObatEceranComponent }      from './farmasi/obat-eceran/daftar-obat-eceran.component';
import { DetailObatEceranComponent }      from './farmasi/obat-eceran/detail-obat-eceran.component';
import { ObatEceranFormComponent }      from './farmasi/obat-eceran/obat-eceran-form.component';

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
	{ path: 'pendaftaran/:namaLayanan', component: PasienFormComponent },
	{ path: 'antrian', component: AntrianComponent },
	{ path: 'antrian/:namaLayanan', component: AntrianComponent },
	{ path: 'daftar-antrian', component: DaftarAntrianComponent },
	{ path: 'daftar-pasien', component: PasienListComponent },
	{ path: 'pendaftaran', component: PasienFormComponent},
	{ path: 'daftar-pasien/catatan-kematian-form', component: CatatanKematianFormComponent},

	{ path: 'poliklinik', component: PoliklinikListComponent },
	{ path: 'poliklinik/:namaPoliklinik/:idTransaksi', component: PoliklinikPemeriksaanComponent },

	{ path: 'laboratorium', component: LaboratoriumListComponent },
	{ path: 'laboratorium/:namaLaboratorium/:idTransaksi', component: LaboratoriumPemeriksaanComponent },

	{ path: 'rawatinap', component: RawatinapListComponent },
	{ path: 'rawatinap/:noKamar', component: RawatinapDetailComponent },
	
	{ path: 'pemakaiankamaroperasi', component: PemakaianKamarOperasiListComponent },
	{ path: 'pemakaiankamarjenazah', component: PemakaianKamarJenazahListComponent },

	{ path: 'tenaga-medis', component: TenagaMedisListComponent },
	{ path: 'jadwal-dokter', component: JadwalDokterListComponent },
	{ path: 'daftar-diagnosis', component: DiagnosisReferenceListComponent },
	{ path: 'daftar-tindakan', component: TindakanReferenceListComponent },

	{ path: 'stok-obat', component: DaftarStokObatComponent },
	{ path: 'stok-obat/:id', component: DetailStokObatComponent },
	{ path: 'lokasi-obat', component: DaftarLokasiObatComponent },
	{ path: 'obat-masuk', component: DaftarObatMasukComponent },
	{ path: 'obat-masuk/:id', component: DetailObatMasukComponent },
	{ path: 'obat-masuk-form', component: ObatMasukFormComponent },
	{ path: 'jenis-obat', component: DaftarJenisObatComponent },
	{ path: 'jenis-obat/:id', component: DetailJenisObatComponent },
	{ path: 'jenis-obat/edit/:id', component: EditJenisObatComponent },
	{ path: 'jenis-obat-form', component: JenisObatFormComponent },
	{ path: 'obat-tebus', component: DaftarObatTebusComponent },
	{ path: 'obat-tebus/:id', component: DetailObatTebusComponent },
	{ path: 'obat-tebus-form', component: ObatTebusFormComponent },
	{ path: 'obat-pindah', component: DaftarObatPindahComponent },
	{ path: 'obat-pindah/:id', component: DetailObatPindahComponent },
	{ path: 'obat-pindah-form', component: ObatPindahFormComponent },
	{ path: 'obat-rusak', component: DaftarObatRusakComponent },
	{ path: 'obat-rusak/:id', component: DetailObatRusakComponent },
	{ path: 'obat-rusak-form', component: ObatRusakFormComponent },	
	{ path: 'obat-eceran', component: DaftarObatEceranComponent },
	{ path: 'obat-eceran/:id', component: DetailObatEceranComponent },
	{ path: 'obat-eceran-form', component: ObatEceranFormComponent },
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
