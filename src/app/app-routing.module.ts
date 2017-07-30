import { NgModule }      		from '@angular/core';
import { RouterModule, Routes }	from '@angular/router';

import { RegisterComponent }					from './auth/register.component';
import { LoginComponent }							from './auth/login.component';

import { TransaksiComponent }   			from './transaksi/transaksi.component';
import { TransaksiDetailComponent }		from './transaksi/transaksi-detail.component';

import { PembayaranComponent }   			from './pembayaran/pembayaran.component';
import { PembayaranDetailComponent }  from './pembayaran/pembayaran-detail.component';

import { KlaimComponent }   					from './pembayaran/klaim/klaim.component';
import { KlaimDetailComponent }   		from './pembayaran/klaim/klaim-detail.component';

import { PasienFormComponent }			from './pasien/pasien-form.component';
import { PasienIGDFormComponent }		from './pasien/pasien-igd-form.component';
import { PasienListComponent }			from './pasien/pasien-list.component';
import { CatatanKematianFormComponent } from './pasien/catatan-kematian-form.component';
import { AntrianComponent }				from './antrian/antrian.component';
import { DaftarAntrianComponent }	    from './antrian/daftar-antrian.component';
import { AntrianDashboardComponent }    from './antrian/antrian-dashboard.component';
import { RekamMedisListComponent }		from './pasien/rekam-medis-list.component';
import { RekamMedisDetailComponent }	from './pasien/rekam-medis-detail.component';

import { PoliklinikListComponent }		from './layanan/poliklinik-list.component';
import { PoliklinikPemeriksaanComponent }	from './layanan/poliklinik-pemeriksaan.component';

import { LaboratoriumListComponent }		from './layanan/laboratorium-list.component';
import { LaboratoriumPemeriksaanComponent }	from './layanan/laboratorium-pemeriksaan.component';

import { AmbulansListComponent }		from './layanan/ambulans-list.component';

import { PemeriksaanRawatinapKamarListComponent }		from './layanan/rawatinap-pemeriksaan-kamar-list.component';
import { PemeriksaanRawatinapPasienListComponent }		from './layanan/rawatinap-pemeriksaan-pasien-list.component';
import { PemeriksaanRawatinapComponent }		from './layanan/rawatinap-pemeriksaan.component';
import { BookingRawatinapComponent }		from './layanan/booking-rawatinap.component';
import { BookingRawatinapListComponent }		from './layanan/booking-rawatinap-list.component';
import { BookingRawatinapDetailComponent }		from './layanan/booking-rawatinap-detail.component';
import { RawatinapListComponent }		from './layanan/rawatinap-list.component';
import { RawatinapDetailComponent }	    from './layanan/rawatinap-detail.component';
import { PindahKamarListComponent }		from './layanan/pindahkamar-list.component';
import { PindahKamarDetailComponent }	    from './layanan/pindahkamar-detail.component';
import { KamarOperasiListComponent }		from './layanan/kamar-operasi-list.component';
import { KamarJenazahListComponent }		from './layanan/kamar-jenazah-list.component';
import { KamarRawatinapListComponent }		from './layanan/kamar-rawatinap-list.component';

import { PemakaianKamarListComponent }		from './layanan/pemakaian-kamar.component';
import { PemakaianKamarOperasiListComponent }		from './layanan/pemakaian-kamar-operasi-list.component';
import { PemakaianKamarJenazahListComponent }		from './layanan/pemakaian-kamar-jenazah-list.component';

import { TenagaMedisListComponent } 	from './tenaga-medis/tenaga-medis-list.component';
import { JadwalDokterListComponent }	from './tenaga-medis/jadwal-dokter-list.component';
import { DiagnosisReferenceListComponent }	from './layanan/diagnosis-reference-list.component';
import { TindakanReferenceListComponent }		from './layanan/tindakan-reference-list.component';

import { DokterDashboardComponent }			from './tenaga-medis/dokter-dashboard.component';
import { PetugasLabDashboardComponent }	from './tenaga-medis/petugas-lab-dashboard.component';

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
import { ResepEksternalFormComponent }           from './farmasi/obat-tebus/resep-eksternal-form.component';
import { ObatTebusEksternalFormComponent }           from './farmasi/obat-tebus/obat-tebus-eksternal-form.component';

import { DaftarObatPindahComponent }      from './farmasi/obat-pindah/daftar-obat-pindah.component';
import { DetailObatPindahComponent }      from './farmasi/obat-pindah/detail-obat-pindah.component';
import { ObatPindahFormComponent }		from './farmasi/obat-pindah/obat-pindah-form.component';

import { DaftarObatRusakComponent }      from './farmasi/obat-rusak/daftar-obat-rusak.component';
import { DetailObatRusakComponent }      from './farmasi/obat-rusak/detail-obat-rusak.component';
import { ObatRusakFormComponent }      from './farmasi/obat-rusak/obat-rusak-form.component';

import { DaftarObatEceranComponent }      from './farmasi/obat-eceran/daftar-obat-eceran.component';
import { DetailObatEceranComponent }      from './farmasi/obat-eceran/detail-obat-eceran.component';
import { ObatEceranFormComponent }      from './farmasi/obat-eceran/obat-eceran-form.component';

import { SelectorStockOpnameComponent }      from './farmasi/stock-opname/selector-stock-opname.component';
import { DaftarStockOpnameComponent }      from './farmasi/stock-opname/daftar-stock-opname.component';
import { DetailStockOpnameComponent }      from './farmasi/stock-opname/detail-stock-opname.component';
import { StockOpnameFormComponent }      from './farmasi/stock-opname/stock-opname-form.component';

import { SettingsComponent }        from './settings/settings.component';

const routes: Routes = [
	{ path: '', redirectTo: '/login', pathMatch: 'full' },

	{ path: 'register', component: RegisterComponent },
	{ path: 'login', component: LoginComponent },

	{ path: 'transaksi', component: TransaksiComponent },
	{ path: 'transaksi/:id', component: TransaksiDetailComponent },
	{ path: 'pembayaran', component: PembayaranComponent },
	{ path: 'pembayaran/:id', component: PembayaranDetailComponent },
	{ path: 'klaim', component: KlaimComponent },
	{ path: 'klaim/:id', component: KlaimDetailComponent },
	{ path: 'pendaftaran', component: PasienFormComponent },
	{ path: 'pendaftaran-igd', component: PasienIGDFormComponent },
	{ path: 'pendaftaran/:namaLayanan', component: PasienFormComponent },
	{ path: 'antrian', component: AntrianComponent },
	{ path: 'antrian/:namaLayanan', component: AntrianComponent },
	{ path: 'daftar-antrian', component: DaftarAntrianComponent },
	{ path: 'antrian-dashboard', component: AntrianDashboardComponent },
	{ path: 'daftar-pasien', component: PasienListComponent },
	{ path: 'pendaftaran', component: PasienFormComponent},
	{ path: 'daftar-pasien/catatan-kematian-form', component: CatatanKematianFormComponent},
	{ path: 'rekam_medis/:namaLayanan/:idTransaksi/:idPasien', component: RekamMedisListComponent},
	{ path: 'rekam_medis/:idPasien/:noEntry', component: RekamMedisDetailComponent},

	{ path: 'poliklinik', component: PoliklinikListComponent },
	{ path: 'poliklinik/:namaPoliklinik/:idTransaksi', component: PoliklinikPemeriksaanComponent },

	{ path: 'laboratorium', component: LaboratoriumListComponent },
	{ path: 'laboratorium/:namaLaboratorium/:idTransaksi', component: LaboratoriumPemeriksaanComponent },

	{ path: 'ambulans', component: AmbulansListComponent },

	{ path: 'rawatinap', component: RawatinapListComponent },
	{ path: 'rawatinap/:noKamar', component: RawatinapDetailComponent },

	{ path: 'pemeriksaan/rawatinap', component: PemeriksaanRawatinapKamarListComponent },
	{ path: 'pemeriksaan/rawatinap/:noKamar', component: PemeriksaanRawatinapPasienListComponent },
	{ path: 'pemeriksaan/rawatinap/:noKamar/:idPemakaian/:idTransaksi', component: PemeriksaanRawatinapComponent },

	{ path: 'rawatinap/booking/kamar', component: BookingRawatinapListComponent },
	{ path: 'rawatinap/booking/kamar/:tanggal/:noKamar', component: BookingRawatinapDetailComponent },

	{ path: 'daftarbookingrawatinap', component: BookingRawatinapComponent },

	{ path: 'rawatinap/pindah/:idPemakaian', component: PindahKamarListComponent },
	{ path: 'rawatinap/pindah/:idPemakaian/:noKamar', component: PindahKamarDetailComponent },

	{ path: 'kamar-rawatinap', component: KamarRawatinapListComponent },
	{ path: 'kamar-operasi', component: KamarOperasiListComponent },
	{ path: 'kamar-jenazah', component: KamarJenazahListComponent },

	{ path: 'pemakaiankamarrawatinap', component: PemakaianKamarListComponent },

	{ path: 'pemakaiankamaroperasi', component: PemakaianKamarOperasiListComponent },
	{ path: 'pemakaiankamarjenazah', component: PemakaianKamarJenazahListComponent },

	{ path: 'tenaga-medis', component: TenagaMedisListComponent },
	{ path: 'jadwal-dokter', component: JadwalDokterListComponent },
	{ path: 'daftar-diagnosis', component: DiagnosisReferenceListComponent },
	{ path: 'daftar-tindakan', component: TindakanReferenceListComponent },

	{ path: 'dokter-dashboard', component: DokterDashboardComponent },
	{ path: 'petugas-lab-dashboard', component: PetugasLabDashboardComponent },

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
	{ path: 'resep-eksternal-form', component: ResepEksternalFormComponent },
	{ path: 'obat-tebus-eksternal-form/:id', component: ObatTebusEksternalFormComponent },
	{ path: 'obat-pindah', component: DaftarObatPindahComponent },
	{ path: 'obat-pindah/:id', component: DetailObatPindahComponent },
	{ path: 'obat-pindah-form', component: ObatPindahFormComponent },
	{ path: 'obat-rusak', component: DaftarObatRusakComponent },
	{ path: 'obat-rusak/:id', component: DetailObatRusakComponent },
	{ path: 'obat-rusak-form', component: ObatRusakFormComponent },
	{ path: 'obat-eceran', component: DaftarObatEceranComponent },
	{ path: 'obat-eceran/:id', component: DetailObatEceranComponent },
	{ path: 'obat-eceran-form', component: ObatEceranFormComponent },
	{ path: 'stock-opname', component: SelectorStockOpnameComponent },
	{ path: 'stock-opname/:lokasi', component: DaftarStockOpnameComponent },
	{ path: 'detail-stock-opname/:id', component: DetailStockOpnameComponent },
	{ path: 'stock-opname-form/:lokasi', component: StockOpnameFormComponent },
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
