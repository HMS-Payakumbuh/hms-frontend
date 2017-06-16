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
import { RawatJalanComponent }      from './rawat-jalan.component';

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
        RawatJalanComponent,
        MatchesStatusPipe,
        FilterNamaPasienPipe,
        AntrianComponent
    ],
    bootstrap:    [ 
	   AppComponent
    ]
})

export class AppModule { }
