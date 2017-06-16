import { NgModule }                 from '@angular/core';
import { BrowserModule }            from '@angular/platform-browser';
import { FormsModule }              from '@angular/forms';
import { HttpModule }               from '@angular/http';
import { DpDatePickerModule }       from 'ng2-date-picker';

import { AppRoutingModule }         from './app-routing.module';

import { MatchesStatusPipe }        from './pipe/matches-status.pipe';
import { FilterNamaPasienPipe }     from './pipe/filter-nama-pasien.pipe';

import { TransaksiComponent }       from './transaksi/transaksi.component';
import { TransaksiDetailComponent } from './transaksi/transaksi-detail.component';
import { PasienFormComponent }      from './pasien/pasien-form.component';
import { RawatJalanComponent }      from './rawat-jalan.component';
import { AppComponent }             from './app.component';


@NgModule({
    imports:      [
      	BrowserModule,
      	FormsModule,
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
        FilterNamaPasienPipe 
    ],
    bootstrap:    [ 
	   AppComponent
    ]
})

export class AppModule { }
