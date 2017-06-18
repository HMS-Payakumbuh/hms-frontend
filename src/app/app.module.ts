import { NgModule }                 from '@angular/core';
import { BrowserModule }            from '@angular/platform-browser';
import { FormsModule }              from '@angular/forms';
import { ReactiveFormsModule }      from '@angular/forms';
import { HttpModule }               from '@angular/http';
import { DpDatePickerModule }       from 'ng2-date-picker';

import { MatchesStatusPipe }        from './pipe/matches-status.pipe';
import { FilterNamaPasienPipe }     from './pipe/filter-nama-pasien.pipe';
import { FilterTanggalPipe }     from './pipe/filter-tanggal.pipe';

import { TransaksiComponent }       from './transaksi/transaksi.component';
import { TransaksiDetailComponent } from './transaksi/transaksi-detail.component';
import { AntrianComponent }         from './antrian/antrian.component';
import { DaftarAntrianComponent }         from './antrian/daftar-antrian.component';
import { PasienFormComponent }      from './pasien/pasien-form.component';

import { PoliklinikListComponent }      from './layanan/poliklinik-list.component';
import { PoliklinikDetailComponent }    from './layanan/poliklinik-detail.component';

import { DaftarObatComponent }          from './farmasi/obat-batch/daftar-obat.component';
import { DetailObatComponent }          from './farmasi/obat-batch/detail-obat.component';
import { ObatMasukFormComponent }       from './farmasi/obat-batch/obat-masuk-form.component';

import { DaftarJenisObatComponent }     from './farmasi/jenis-obat/daftar-jenis-obat.component';
import { DetailJenisObatComponent }     from './farmasi/jenis-obat/detail-jenis-obat.component';
import { JenisObatFormComponent }       from './farmasi/jenis-obat/jenis-obat-form.component';

import { ObatPindahFormComponent }      from './farmasi/obat-pindah-form/obat-pindah-form.component';

import { DaftarObatRusakComponent }      from './farmasi/obat-rusak/daftar-obat-rusak.component';
// import { DetailObatRusakComponent }      from './farmasi/obat-rusak/detail-obat-rusak.component';
import { ObatRusakFormComponent }      from './farmasi/obat-rusak/obat-rusak-form.component';

import { AppRoutingModule }         from './app-routing.module';
import { AppComponent }             from './app.component';

@NgModule({
    imports:      [
      	BrowserModule,
      	FormsModule,
        ReactiveFormsModule,
        AppRoutingModule,
        HttpModule,
        DpDatePickerModule
    ],
    declarations: [ 
        AppComponent,
        TransaksiComponent,
        PasienFormComponent,
        TransaksiDetailComponent,
        PoliklinikListComponent,
        PoliklinikDetailComponent,
        MatchesStatusPipe,
        FilterNamaPasienPipe,
        FilterTanggalPipe,
        AntrianComponent,
        DaftarAntrianComponent,
        DaftarObatComponent,
        DetailObatComponent,
        ObatMasukFormComponent,
        DaftarJenisObatComponent,
        DetailJenisObatComponent,
        JenisObatFormComponent,
        ObatPindahFormComponent,
        DaftarObatRusakComponent,
       // DetailObatRusakComponent,
        ObatRusakFormComponent
    ],
    bootstrap:    [ 
	   AppComponent
    ]
})

export class AppModule { }
