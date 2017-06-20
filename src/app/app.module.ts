import { NgModule }                 from '@angular/core';
import { BrowserModule }            from '@angular/platform-browser';
import { FormsModule }              from '@angular/forms';
import { ReactiveFormsModule }      from '@angular/forms';
import { HttpModule }               from '@angular/http';
import { DpDatePickerModule }       from 'ng2-date-picker';
import { AutocompleteModule}        from 'ng2-input-autocomplete';

import { MatchesStatusPipe }            from './pipe/matches-status.pipe';
import { FilterNamaPasienPipe }         from './pipe/filter-nama-pasien.pipe';
import { FilterTanggalPipe }            from './pipe/filter-tanggal.pipe';
import { FilterWaktuMasukPipe }            from './pipe/filter-waktu-masuk.pipe';
import { FilterWaktuKeluarPipe }            from './pipe/filter-waktu-keluar.pipe';
import { FilterNamaAsuransiPipe }       from './pipe/filter-nama-asuransi.pipe';
import { FilterJenisPasienPipe }       from './pipe/filter-jenis-pasien.pipe';
import { FilterJenisObatPipe }     from './pipe/filter-jenis-obat.pipe';
import { FilterDaftarObatPipe }     from './pipe/filter-daftar-obat.pipe';
import { FilterObatMasukPipe }     from './pipe/filter-obat-masuk.pipe';
import { FilterObatResepPipe }     from './pipe/filter-obat-resep.pipe';
import { FilterObatRusakPipe }     from './pipe/filter-obat-rusak.pipe';
import { FilterObatPindahPipe }     from './pipe/filter-obat-pindah.pipe';
import { FilterJenisAntrianPipe }     from './pipe/filter-jenis-antrian.pipe';

import { TransaksiComponent }       from './transaksi/transaksi.component';
import { TransaksiDetailComponent } from './transaksi/transaksi-detail.component';

import { PembayaranComponent }				from './pembayaran/pembayaran.component';
import { PembayaranDetailComponent }        from './pembayaran/pembayaran-detail.component';
import { KlaimComponent }        			from './pembayaran/klaim/klaim.component';
import { KlaimDetailComponent }        		from './pembayaran/klaim/klaim-detail.component';

import { AntrianComponent }         		from './antrian/antrian.component';
import { DaftarAntrianComponent }         	from './antrian/daftar-antrian.component';
import { PasienFormComponent }      		from './pasien/pasien-form.component';

import { PoliklinikListComponent }      from './layanan/poliklinik-list.component';
import { PoliklinikDetailComponent }    from './layanan/poliklinik-detail.component';

import { RawatinapListComponent }		from './layanan/rawatinap-list.component';
import { RawatinapDetailComponent } 	from './layanan/rawatinap-detail.component';

import { TindakanReferenceListComponent }    from './layanan/tindakan-reference-list.component';
import { TindakanReferenceFormComponent }        from './layanan/tindakan-reference-form.component';

import { DaftarObatComponent }          from './farmasi/obat-batch/daftar-obat.component';
import { DetailObatComponent }          from './farmasi/obat-batch/detail-obat.component';

import { DaftarObatMasukComponent }     from './farmasi/obat-masuk/daftar-obat-masuk.component';
import { DetailObatMasukComponent }     from './farmasi/obat-masuk/detail-obat-masuk.component';
import { ObatMasukFormComponent }       from './farmasi/obat-masuk/obat-masuk-form.component';

import { DaftarJenisObatComponent }     from './farmasi/jenis-obat/daftar-jenis-obat.component';
import { DetailJenisObatComponent }     from './farmasi/jenis-obat/detail-jenis-obat.component';
import { JenisObatFormComponent }       from './farmasi/jenis-obat/jenis-obat-form.component';

import { DaftarObatResepComponent }         from './farmasi/obat-resep/daftar-obat-resep.component';
import { DetailObatResepComponent }         from './farmasi/obat-resep/detail-obat-resep.component';
import { ObatResepFormComponent }           from './farmasi/obat-resep/obat-resep-form.component';

import { DaftarObatPindahComponent }      from './farmasi/obat-pindah/daftar-obat-pindah.component';
import { DetailObatPindahComponent }      from './farmasi/obat-pindah/detail-obat-pindah.component';
import { ObatPindahFormComponent }      from './farmasi/obat-pindah/obat-pindah-form.component';

import { DaftarObatRusakComponent }      from './farmasi/obat-rusak/daftar-obat-rusak.component';
import { DetailObatRusakComponent }      from './farmasi/obat-rusak/detail-obat-rusak.component';
import { ObatRusakFormComponent }      from './farmasi/obat-rusak/obat-rusak-form.component';

import { SettingsComponent }        from './settings/settings.component';

import { AppRoutingModule }         from './app-routing.module';
import { AppComponent }             from './app.component';

import { DataTableModule }    from 'angular2-datatable';

@NgModule({
    imports:      [
      	BrowserModule,
      	FormsModule,
        ReactiveFormsModule,
        AppRoutingModule,
        HttpModule,
        DpDatePickerModule,
        AutocompleteModule.forRoot(),
        DataTableModule
    ],
    declarations: [ 
        AppComponent,
        MatchesStatusPipe,
        FilterNamaPasienPipe,
        FilterTanggalPipe,
        FilterWaktuMasukPipe,
        FilterWaktuKeluarPipe,
        FilterNamaAsuransiPipe,
        FilterJenisPasienPipe,
        FilterJenisObatPipe,
        FilterDaftarObatPipe,
        FilterObatMasukPipe,
        FilterObatResepPipe,
        FilterObatRusakPipe,
        FilterObatPindahPipe,
        FilterJenisAntrianPipe,
        TransaksiComponent,
        TransaksiDetailComponent,
        PembayaranComponent,
        PembayaranDetailComponent,
        KlaimComponent,
        KlaimDetailComponent,
        PasienFormComponent,
        PoliklinikListComponent,
        PoliklinikDetailComponent,
        RawatinapListComponent,
        RawatinapDetailComponent,
        TindakanReferenceListComponent,
        TindakanReferenceFormComponent,
        MatchesStatusPipe,
        FilterNamaPasienPipe,
        FilterTanggalPipe,
        AntrianComponent,
        DaftarAntrianComponent,
        DaftarObatComponent,
        DetailObatComponent,
        DaftarObatMasukComponent,
        DetailObatMasukComponent,
        ObatMasukFormComponent,
        DaftarJenisObatComponent,
        DetailJenisObatComponent,
        JenisObatFormComponent,
        DaftarObatResepComponent,
        DetailObatResepComponent,
        ObatResepFormComponent,
        DaftarObatPindahComponent,
        DetailObatPindahComponent,
        ObatPindahFormComponent,
        DaftarObatRusakComponent,
        DetailObatRusakComponent,
        ObatRusakFormComponent,
        SettingsComponent,
    ],
    bootstrap:    [ 
	   AppComponent
    ]
})

export class AppModule { }
