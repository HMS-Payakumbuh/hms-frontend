import { NgModule }      				from '@angular/core';
import { RouterModule, Routes }	from '@angular/router';
import { AuthGuard }						from './auth/auth-guard.service';

import { HomeComponent }							from './home.component';
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
import { RekamMedisListComponent }		from './pasien/rekam-medis-list.component';
import { RekamMedisDetailComponent }	from './pasien/rekam-medis-detail.component';

import { PoliklinikListComponent }		from './layanan/poliklinik-list.component';
import { PoliklinikPemeriksaanComponent }	from './layanan/poliklinik-pemeriksaan.component';

import { LaboratoriumListComponent }				from './layanan/laboratorium-list.component';
import { LaboratoriumPemeriksaanComponent }	from './layanan/laboratorium-pemeriksaan.component';
import { LaboratoriumTindakanComponent }		from './layanan/laboratorium-tindakan.component';

import { AmbulansListComponent }		from './layanan/ambulans-list.component';

import { PemeriksaanRawatinapKamarListComponent }		from './layanan/rawatinap-pemeriksaan-kamar-list.component';
import { PemeriksaanRawatinapPasienListComponent }		from './layanan/rawatinap-pemeriksaan-pasien-list.component';
import { PemeriksaanRawatinapComponent }		from './layanan/rawatinap-pemeriksaan.component';
import { BookingRawatinapComponent }		from './layanan/booking-rawatinap.component';
import { BookingRawatinapListComponent }		from './layanan/booking-rawatinap-list.component';
import { BookingRawatinapDetailComponent }		from './layanan/booking-rawatinap-detail.component';
import { RawatinapListComponent }		from './layanan/rawatinap-list.component';
import { ICUListComponent }		from './layanan/icu-list.component';
import { RawatinapDetailComponent }	    from './layanan/rawatinap-detail.component';
import { PindahKamarListComponent }		from './layanan/pindahkamar-list.component';
import { PindahKamarDetailComponent }	    from './layanan/pindahkamar-detail.component';
import { KamarOperasiListComponent }		from './layanan/kamar-operasi-list.component';
import { KamarJenazahListComponent }		from './layanan/kamar-jenazah-list.component';
import { KamarRawatinapListComponent }		from './layanan/kamar-rawatinap-list.component';


import { BookingOperasiListComponent }		from './layanan/booking-operasi-list.component';
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

import { LaporanComponent }        from './farmasi/laporan/laporan.component';

import { SettingsComponent }        from './settings/settings.component';

const routes: Routes = [

	{ path: 'register', component: RegisterComponent },
	{ path: 'login', component: LoginComponent },

	{ path: '', canActivate: [AuthGuard], component: HomeComponent },

	{ path: 'transaksi', canActivate: [AuthGuard], component: TransaksiComponent },
	{ path: 'transaksi/:id', canActivate: [AuthGuard], component: TransaksiDetailComponent },
	{ path: 'pembayaran', canActivate: [AuthGuard], component: PembayaranComponent },
	{ path: 'pembayaran/:id', canActivate: [AuthGuard], component: PembayaranDetailComponent },
	{ path: 'klaim', canActivate: [AuthGuard], component: KlaimComponent },
	{ path: 'klaim/:id', canActivate: [AuthGuard], component: KlaimDetailComponent },
	{ path: 'pendaftaran', canActivate: [AuthGuard], component: PasienFormComponent },
	{ path: 'pendaftaran-igd', canActivate: [AuthGuard], component: PasienIGDFormComponent },
	{ path: 'pendaftaran/:namaLayanan', canActivate: [AuthGuard], component: PasienFormComponent },
	{ path: 'antrian', canActivate: [AuthGuard], component: AntrianComponent },
	{ path: 'antrian/:namaLayanan', canActivate: [AuthGuard], component: AntrianComponent },
	{ path: 'daftar-antrian', canActivate: [AuthGuard], component: DaftarAntrianComponent },
	{ path: 'daftar-pasien', canActivate: [AuthGuard], component: PasienListComponent },
	{ path: 'pendaftaran', canActivate: [AuthGuard], component: PasienFormComponent},
	{ path: 'daftar-pasien/catatan-kematian-form', canActivate: [AuthGuard], component: CatatanKematianFormComponent},
	{ path: 'rekam_medis/:namaLayanan/:idTransaksi/:idPasien', canActivate: [AuthGuard], component: RekamMedisListComponent},
	{ path: 'rekam_medis/:idPasien/:noEntry', canActivate: [AuthGuard], component: RekamMedisDetailComponent},

	{ path: 'poliklinik', canActivate: [AuthGuard], component: PoliklinikListComponent },
	{ path: 'poliklinik/:namaPoliklinik/:idTransaksi', canActivate: [AuthGuard], component: PoliklinikPemeriksaanComponent },

	{ path: 'laboratorium', canActivate: [AuthGuard], component: LaboratoriumListComponent },
	{ path: 'laboratorium/:namaLaboratorium/:idTransaksi', canActivate: [AuthGuard], component: LaboratoriumPemeriksaanComponent },
	{ path: 'laboratorium/tindakan', canActivate: [AuthGuard], component: LaboratoriumTindakanComponent },

	{ path: 'ambulans', canActivate: [AuthGuard], component: AmbulansListComponent },

	{ path: 'rawatinap', canActivate: [AuthGuard], component: RawatinapListComponent },
	{ path: 'icu', canActivate: [AuthGuard],component: ICUListComponent },
	{ path: 'rawatinap/:noKamar', canActivate: [AuthGuard], component: RawatinapDetailComponent },

	{ path: 'pemeriksaan/rawatinap', canActivate: [AuthGuard], component: PemeriksaanRawatinapKamarListComponent },
	{ path: 'pemeriksaan/rawatinap/:noKamar', canActivate: [AuthGuard], component: PemeriksaanRawatinapPasienListComponent },
	{ path: 'pemeriksaan/rawatinap/:noKamar/:idPemakaian/:idTransaksi', canActivate: [AuthGuard], component: PemeriksaanRawatinapComponent },

	{ path: 'rawatinap/booking/kamar', canActivate: [AuthGuard], component: BookingRawatinapListComponent },
	{ path: 'rawatinap/booking/kamar/:tanggal/:noKamar', canActivate: [AuthGuard], component: BookingRawatinapDetailComponent },

	{ path: 'daftarbookingrawatinap', canActivate: [AuthGuard], component: BookingRawatinapComponent },

	{ path: 'rawatinap/pindah/:idPemakaian', canActivate: [AuthGuard], component: PindahKamarListComponent },
	{ path: 'rawatinap/pindah/:idPemakaian/:noKamar', canActivate: [AuthGuard], component: PindahKamarDetailComponent },

	{ path: 'kamar-rawatinap', canActivate: [AuthGuard], component: KamarRawatinapListComponent },
	{ path: 'kamar-operasi', canActivate: [AuthGuard], component: KamarOperasiListComponent },
	{ path: 'kamar-jenazah', canActivate: [AuthGuard], component: KamarJenazahListComponent },

	{ path: 'pemakaiankamarrawatinap', canActivate: [AuthGuard], component: PemakaianKamarListComponent },

	{ path: 'operasi/booking', canActivate: [AuthGuard], component: BookingOperasiListComponent },
	{ path: 'pemakaiankamaroperasi', canActivate: [AuthGuard], component: PemakaianKamarOperasiListComponent },
	{ path: 'pemakaiankamarjenazah', canActivate: [AuthGuard], component: PemakaianKamarJenazahListComponent },

	{ path: 'tenaga-medis', canActivate: [AuthGuard], component: TenagaMedisListComponent },
	{ path: 'jadwal-dokter', canActivate: [AuthGuard], component: JadwalDokterListComponent },
	{ path: 'daftar-diagnosis', canActivate: [AuthGuard], component: DiagnosisReferenceListComponent },
	{ path: 'daftar-tindakan', canActivate: [AuthGuard], component: TindakanReferenceListComponent },

	{ path: 'dokter-dashboard', canActivate: [AuthGuard], component: DokterDashboardComponent },
	{ path: 'petugas-lab-dashboard', canActivate: [AuthGuard], component: PetugasLabDashboardComponent },

	{ path: 'stok-obat', canActivate: [AuthGuard], component: DaftarStokObatComponent },
	{ path: 'stok-obat/:id', canActivate: [AuthGuard], component: DetailStokObatComponent },

	{ path: 'lokasi-obat', canActivate: [AuthGuard], component: DaftarLokasiObatComponent },

	{ path: 'obat-masuk', canActivate: [AuthGuard], component: DaftarObatMasukComponent },
	{ path: 'obat-masuk/:id', canActivate: [AuthGuard], component: DetailObatMasukComponent },
	{ path: 'obat-masuk-form', canActivate: [AuthGuard], component: ObatMasukFormComponent },

	{ path: 'jenis-obat', canActivate: [AuthGuard], component: DaftarJenisObatComponent },
	{ path: 'jenis-obat/:id', canActivate: [AuthGuard], component: DetailJenisObatComponent },
	{ path: 'jenis-obat/edit/:id', canActivate: [AuthGuard], component: EditJenisObatComponent },
	{ path: 'jenis-obat-form', canActivate: [AuthGuard], component: JenisObatFormComponent },

	{ path: 'obat-tebus', canActivate: [AuthGuard], component: DaftarObatTebusComponent },
	{ path: 'obat-tebus/:id', canActivate: [AuthGuard], component: DetailObatTebusComponent },
	{ path: 'obat-tebus-form', canActivate: [AuthGuard], component: ObatTebusFormComponent },
	{ path: 'resep-eksternal-form', canActivate: [AuthGuard], component: ResepEksternalFormComponent },
	{ path: 'obat-tebus-eksternal-form/:id', canActivate: [AuthGuard], component: ObatTebusEksternalFormComponent },

	{ path: 'obat-pindah', canActivate: [AuthGuard], component: DaftarObatPindahComponent },
	{ path: 'obat-pindah/:id', canActivate: [AuthGuard], component: DetailObatPindahComponent },
	{ path: 'obat-pindah-form', canActivate: [AuthGuard], component: ObatPindahFormComponent },

	{ path: 'obat-rusak', canActivate: [AuthGuard], component: DaftarObatRusakComponent },
	{ path: 'obat-rusak/:id', canActivate: [AuthGuard], component: DetailObatRusakComponent },
	{ path: 'obat-rusak-form', canActivate: [AuthGuard], component: ObatRusakFormComponent },

	{ path: 'obat-eceran', canActivate: [AuthGuard], component: DaftarObatEceranComponent },
	{ path: 'obat-eceran/:id', canActivate: [AuthGuard], component: DetailObatEceranComponent },
	{ path: 'obat-eceran-form', canActivate: [AuthGuard], component: ObatEceranFormComponent },

	{ path: 'stock-opname', canActivate: [AuthGuard], component: SelectorStockOpnameComponent },
	{ path: 'stock-opname/:lokasi', canActivate: [AuthGuard], component: DaftarStockOpnameComponent },
	{ path: 'detail-stock-opname/:id', canActivate: [AuthGuard], component: DetailStockOpnameComponent },
	{ path: 'stock-opname-form/:lokasi', canActivate: [AuthGuard], component: StockOpnameFormComponent },

	{ path: 'laporan', canActivate: [AuthGuard], component: LaporanComponent },

	{ path: 'settings', canActivate: [AuthGuard], component: SettingsComponent }
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
