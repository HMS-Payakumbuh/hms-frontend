import { NgModule }                 from '@angular/core';
import { BrowserModule }            from '@angular/platform-browser';
import { FormsModule }              from '@angular/forms';
import { ReactiveFormsModule }      from '@angular/forms';
import { HttpModule }               from '@angular/http';
import { DpDatePickerModule }       from 'ng2-date-picker';

import { MatchesStatusPipe }        from './pipe/matches-status.pipe';
import { FilterNamaPasienPipe }     from './pipe/filter-nama-pasien.pipe';

import { TransaksiComponent }       from './transaksi/transaksi.component';
import { TransaksiDetailComponent } from './transaksi/transaksi-detail.component';
import { AntrianComponent }         from './antrian/antrian.component';
import { PasienFormComponent }      from './pasien/pasien-form.component';
import { PoliklinikComponent }      from './layanan/poliklinik.component';

import { DaftarObatComponent }          from './farmasi/daftar-obat/daftar-obat.component';
import { DetailObatComponent }          from './farmasi/detail-obat/detail-obat.component';
import { ObatMasukFormComponent }       from './farmasi/obat-masuk-form/obat-masuk-form.component';

import { DaftarJenisObatComponent }     from './farmasi/daftar-jenis-obat/daftar-jenis-obat.component';
import { JenisObatFormComponent }       from './farmasi/jenis-obat-form/jenis-obat-form.component';

import { ObatPindahFormComponent }      from './farmasi/obat-pindah-form/obat-pindah-form.component';

import { ObatRusakFormComponent }      from './farmasi/obat-rusak-form/obat-rusak-form.component';

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
        PoliklinikComponent,
        MatchesStatusPipe,
        FilterNamaPasienPipe,
        AntrianComponent,
        DaftarObatComponent,
        DetailObatComponent,
        ObatMasukFormComponent,
        DaftarJenisObatComponent,
        JenisObatFormComponent,
        ObatPindahFormComponent,
        ObatRusakFormComponent
    ],
    bootstrap:    [ 
	   AppComponent
    ]
})

export class AppModule { }
