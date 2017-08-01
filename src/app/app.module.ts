import { NgModule }                 from '@angular/core';
import { BrowserModule }            from '@angular/platform-browser';
import { FormsModule }              from '@angular/forms';
import { ReactiveFormsModule }      from '@angular/forms';
import { HttpModule }               from '@angular/http';
import { NgbModule }                from '@ng-bootstrap/ng-bootstrap';
import { DpDatePickerModule }       from 'ng2-date-picker';
import { AutocompleteModule}        from 'ng2-input-autocomplete';
import { DataTableModule }          from 'angular2-datatable';
import { ToastyModule }             from 'ng2-toasty';

import { MatchesStatusPipe }            from './pipe/matches-status.pipe';
import { FilterPasienPipe }         from './pipe/filter-pasien.pipe';
import { FilterNamaPasienPipe }         from './pipe/filter-nama-pasien.pipe';
import { FilterTanggalPipe }            from './pipe/filter-tanggal.pipe';
import { FilterCreatedAtPipe }            from './pipe/filter-created-at.pipe';
import { FilterWaktuMasukPipe }            from './pipe/filter-waktu-masuk.pipe';
import { FilterWaktuKeluarPipe }            from './pipe/filter-waktu-keluar.pipe';
import { FilterWaktuPindahPipe }            from './pipe/filter-waktu-pindah.pipe';
import { FilterWaktuTransaksiPipe }            from './pipe/filter-waktu-transaksi.pipe';
import { FilterWaktuResepPipe }            from './pipe/filter-waktu-resep.pipe';
import { FilterNamaAsuransiPipe }       from './pipe/filter-nama-asuransi.pipe';
import { FilterJenisPasienPipe }       from './pipe/filter-jenis-pasien.pipe';
import { FilterJenisObatPipe }     from './pipe/filter-jenis-obat.pipe';
import { FilterStokObatPipe }     from './pipe/filter-stok-obat.pipe';
import { FilterObatMasukPipe }     from './pipe/filter-obat-masuk.pipe';
import { FilterObatTebusPipe }     from './pipe/filter-obat-tebus.pipe';
import { FilterObatEceranPipe }     from './pipe/filter-obat-eceran.pipe';
import { FilterObatRusakPipe }     from './pipe/filter-obat-rusak.pipe';
import { FilterObatPindahPipe }     from './pipe/filter-obat-pindah.pipe';
import { FilterJenisAntrianPipe }     from './pipe/filter-jenis-antrian.pipe';
import { FilterNomorKamarPipe }     from './pipe/filter-nomor-kamar.pipe';
import { FilterJenisKamarPipe }     from './pipe/filter-jenis-kamar.pipe';
import { FilterKelasKamarPipe }     from './pipe/filter-kelas-kamar.pipe';
import { FilterPemakaianKamarOperasiPipe }     from './pipe/filter-pemakaian-kamar-operasi.pipe';

import { AuthGuard }              from './auth/auth-guard.service';
import { AuthenticationService }  from './auth/authentication.service';
import { HomeComponent }          from './home.component';
import { RegisterComponent }      from './auth/register.component';
import { LoginComponent }         from './auth/login.component';

import { HistoriTransaksiComponent }          from './transaksi/histori-transaksi.component';
import { TransaksiEksternalDetailComponent }        from './transaksi/transaksi-eksternal-detail.component';
import { TransaksiObatComponent }          from './transaksi/transaksi-obat.component';
import { TransaksiObatDetailComponent }        from './transaksi/transaksi-obat-detail.component';
import { TransaksiComponent }          from './transaksi/transaksi.component';
import { TransaksiDetailComponent }    from './transaksi/transaksi-detail.component';

import { PembayaranComponent }                from './pembayaran/pembayaran.component';
import { PembayaranDetailComponent }        from './pembayaran/pembayaran-detail.component';
import { KlaimComponent }        			from './pembayaran/klaim/klaim.component';
import { KlaimDetailComponent }        		from './pembayaran/klaim/klaim-detail.component';

import { AntrianComponent }         		from './antrian/antrian.component';
import { DaftarAntrianComponent }         	from './antrian/daftar-antrian.component';
import { AntrianDashboardComponent }        from './antrian/antrian-dashboard.component';
import { PasienFormComponent }      		from './pasien/pasien-form.component';
import { PasienIGDFormComponent }      		from './pasien/pasien-igd-form.component';
import { PasienListComponent }              from './pasien/pasien-list.component';
import { CatatanKematianFormComponent }     from './pasien/catatan-kematian-form.component';
import { RekamMedisListComponent }          from './pasien/rekam-medis-list.component';
import { RekamMedisDetailComponent }        from './pasien/rekam-medis-detail.component';

import { PoliklinikListComponent }          from './layanan/poliklinik-list.component';
import { PoliklinikPemeriksaanComponent }   from './layanan/poliklinik-pemeriksaan.component';

import { LaboratoriumListComponent }        from './layanan/laboratorium-list.component';
import { LaboratoriumPemeriksaanComponent } from './layanan/laboratorium-pemeriksaan.component';
import { LaboratoriumTindakanComponent }		from './layanan/laboratorium-tindakan.component';

import { AmbulansListComponent }    from './layanan/ambulans-list.component';

import { PemeriksaanRawatinapKamarListComponent }		from './layanan/rawatinap-pemeriksaan-kamar-list.component';
import { PemeriksaanRawatinapPasienListComponent }		from './layanan/rawatinap-pemeriksaan-pasien-list.component';
import { PemeriksaanRawatinapComponent }		from './layanan/rawatinap-pemeriksaan.component';

import { BookingRawatinapComponent }		from './layanan/booking-rawatinap.component';
import { BookingRawatinapListComponent }		from './layanan/booking-rawatinap-list.component';
import { BookingRawatinapDetailComponent }		from './layanan/booking-rawatinap-detail.component';

import { ICUListComponent }		from './layanan/icu-list.component';
import { PemeriksaanICUComponent }		from './layanan/icu-pemeriksaan.component';
import { PemeriksaanICUKamarListComponent }		from './layanan/icu-pemeriksaan-kamar-list.component';
import { PemeriksaanICUPasienListComponent }		from './layanan/icu-pemeriksaan-pasien-list.component';

import { RawatinapListComponent }		from './layanan/rawatinap-list.component';
import { RawatinapDetailComponent } 	from './layanan/rawatinap-detail.component';
import { PindahKamarListComponent }		from './layanan/pindahkamar-list.component';
import { PindahKamarDetailComponent }	    from './layanan/pindahkamar-detail.component';
import { PindahICUListComponent }		from './layanan/pindahicu-list.component';

import { KamarRawatinapListComponent } 	from './layanan/kamar-rawatinap-list.component';
import { KamarJenazahListComponent } 	from './layanan/kamar-jenazah-list.component';
import { KamarOperasiListComponent }		from './layanan/kamar-operasi-list.component';

import { PemeriksaanOperasiComponent }		from './layanan/operasi-pemeriksaan.component';
import { BookingOperasiListComponent }		from './layanan/booking-operasi-list.component';
import { PemakaianKamarListComponent }		from './layanan/pemakaian-kamar.component';
import { PemakaianICUListComponent }		from './layanan/pemakaian-icu.component';
import { PemakaianKamarOperasiListComponent }		from './layanan/pemakaian-kamar-operasi-list.component';
import { PemakaianKamarJenazahListComponent }		from './layanan/pemakaian-kamar-jenazah-list.component';

import { TenagaMedisListComponent }       from './tenaga-medis/tenaga-medis-list.component';
import { JadwalDokterListComponent }      from './tenaga-medis/jadwal-dokter-list.component';
import { DiagnosisReferenceListComponent }from './layanan/diagnosis-reference-list.component';
import { TindakanReferenceListComponent } from './layanan/tindakan-reference-list.component';

import { DokterDashboardComponent }   from './tenaga-medis/dokter-dashboard.component';
import { PetugasLabDashboardComponent }   from './tenaga-medis/petugas-lab-dashboard.component';
import { PerawatDashboardComponent }		from './tenaga-medis/perawat-dashboard.component';

import { DaftarStokObatComponent }            from './farmasi/stok-obat/daftar-stok-obat.component';
import { DetailStokObatComponent }            from './farmasi/stok-obat/detail-stok-obat.component';

import { DaftarLokasiObatComponent }            from './farmasi/lokasi-obat/daftar-lokasi-obat.component';

import { DaftarObatMasukComponent }     from './farmasi/obat-masuk/daftar-obat-masuk.component';
import { DetailObatMasukComponent }     from './farmasi/obat-masuk/detail-obat-masuk.component';
import { ObatMasukFormComponent }       from './farmasi/obat-masuk/obat-masuk-form.component';

import { DaftarJenisObatComponent }     from './farmasi/jenis-obat/daftar-jenis-obat.component';
import { DetailJenisObatComponent }     from './farmasi/jenis-obat/detail-jenis-obat.component';
import { JenisObatFormComponent }       from './farmasi/jenis-obat/jenis-obat-form.component';
import { EditJenisObatComponent }       from './farmasi/jenis-obat/edit-jenis-obat.component';

import { DaftarObatTebusComponent }         from './farmasi/obat-tebus/daftar-obat-tebus.component';
import { DetailObatTebusComponent }         from './farmasi/obat-tebus/detail-obat-tebus.component';
import { ObatTebusFormComponent }           from './farmasi/obat-tebus/obat-tebus-form.component';
import { ResepEksternalFormComponent }           from './farmasi/obat-tebus/resep-eksternal-form.component';
import { ObatTebusEksternalFormComponent }           from './farmasi/obat-tebus/obat-tebus-eksternal-form.component';

import { DaftarObatPindahComponent }      from './farmasi/obat-pindah/daftar-obat-pindah.component';
import { DetailObatPindahComponent }      from './farmasi/obat-pindah/detail-obat-pindah.component';
import { ObatPindahFormComponent }      from './farmasi/obat-pindah/obat-pindah-form.component';

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

import { AppRoutingModule }         from './app-routing.module';
import { AppComponent }             from './app.component';

@NgModule({
    imports:      [
      	BrowserModule,
      	FormsModule,
        ReactiveFormsModule,
        AppRoutingModule,
        HttpModule,
        NgbModule.forRoot(),
        DpDatePickerModule,
        AutocompleteModule.forRoot(),
        ToastyModule.forRoot(),
        DataTableModule
    ],
    declarations: [
        AppComponent,
        MatchesStatusPipe,
        FilterPasienPipe,
        FilterNamaPasienPipe,
        FilterTanggalPipe,
        FilterCreatedAtPipe,
        FilterWaktuMasukPipe,
        FilterWaktuKeluarPipe,
        FilterWaktuPindahPipe,
        FilterWaktuTransaksiPipe,
        FilterWaktuResepPipe,
        FilterNamaAsuransiPipe,
        FilterJenisPasienPipe,
        FilterJenisObatPipe,
        FilterStokObatPipe,
        FilterObatMasukPipe,
        FilterObatTebusPipe,
        FilterObatEceranPipe,
        FilterObatRusakPipe,
        FilterObatPindahPipe,
        FilterJenisAntrianPipe,
        FilterJenisKamarPipe,
        FilterNomorKamarPipe,
        FilterKelasKamarPipe,
        FilterPemakaianKamarOperasiPipe,

        HomeComponent,
        RegisterComponent,
        LoginComponent,

        HistoriTransaksiComponent,
        TransaksiEksternalDetailComponent,
        TransaksiObatComponent,
        TransaksiObatDetailComponent,
        TransaksiComponent,
        TransaksiDetailComponent,
        PembayaranComponent,
        PembayaranDetailComponent,
        KlaimComponent,
        KlaimDetailComponent,
        PasienFormComponent,
        PasienIGDFormComponent,
        PasienListComponent,
        CatatanKematianFormComponent,
        RekamMedisListComponent,
        RekamMedisDetailComponent,

        PoliklinikListComponent,
        PoliklinikPemeriksaanComponent,

        LaboratoriumListComponent,
        LaboratoriumPemeriksaanComponent,
        LaboratoriumTindakanComponent,

        AmbulansListComponent,

        PemeriksaanOperasiComponent,
        PemeriksaanRawatinapKamarListComponent,
        PemeriksaanRawatinapPasienListComponent,
        PemeriksaanRawatinapComponent,
        PemeriksaanICUComponent,
        PemeriksaanICUKamarListComponent,
        PemeriksaanICUPasienListComponent,

        BookingRawatinapComponent,
        BookingRawatinapListComponent,
        BookingRawatinapDetailComponent,

        RawatinapListComponent,
        ICUListComponent,
        RawatinapDetailComponent,

        PindahKamarListComponent,
        PindahKamarDetailComponent,
        PindahICUListComponent,

        BookingOperasiListComponent,
        
        PemakaianKamarListComponent,
        PemakaianICUListComponent,
        PemakaianKamarOperasiListComponent,
        PemakaianKamarJenazahListComponent,

        KamarRawatinapListComponent,
        KamarOperasiListComponent,
        KamarJenazahListComponent,

        TenagaMedisListComponent,
        JadwalDokterListComponent,
        DiagnosisReferenceListComponent,
        TindakanReferenceListComponent,

        DokterDashboardComponent,
        PetugasLabDashboardComponent,
        PerawatDashboardComponent,

        MatchesStatusPipe,
        FilterNamaPasienPipe,
        FilterTanggalPipe,
        AntrianComponent,
        DaftarAntrianComponent,
        AntrianDashboardComponent,

        DaftarStokObatComponent,
        DetailStokObatComponent,

        DaftarLokasiObatComponent,

        DaftarObatMasukComponent,
        DetailObatMasukComponent,
        ObatMasukFormComponent,

        DaftarJenisObatComponent,
        DetailJenisObatComponent,
        JenisObatFormComponent,
        EditJenisObatComponent,

        DaftarObatTebusComponent,
        DetailObatTebusComponent,
        ObatTebusFormComponent,
        ResepEksternalFormComponent,
        ObatTebusEksternalFormComponent,

        DaftarObatPindahComponent,
        DetailObatPindahComponent,
        ObatPindahFormComponent,

        DaftarObatRusakComponent,
        DetailObatRusakComponent,
        ObatRusakFormComponent,

        DaftarObatEceranComponent,
        DetailObatEceranComponent,
        ObatEceranFormComponent,

        SelectorStockOpnameComponent,
        DaftarStockOpnameComponent,
        DetailStockOpnameComponent,
        StockOpnameFormComponent,

        LaporanComponent,

        SettingsComponent,
    ],
    providers: [AuthGuard, AuthenticationService],
    bootstrap: [AppComponent]
})

export class AppModule { }
