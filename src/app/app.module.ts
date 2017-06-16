import { NgModule }                 from '@angular/core';
import { BrowserModule }            from '@angular/platform-browser';
import { FormsModule }              from '@angular/forms';
import { ReactiveFormsModule }      from '@angular/forms';
import { HttpModule }               from '@angular/http';

import { AppRoutingModule }         from './app-routing.module';

import { TransaksiComponent }       from './transaksi.component';
import { TransaksiDetailComponent } from './transaksi-detail.component';
import { PasienFormComponent }      from './pasien/pasien-form.component';
import { RawatJalanComponent }      from './rawat-jalan.component';
import { AppComponent }             from './app.component';


@NgModule({
    imports:      [
      	BrowserModule,
      	FormsModule,
        ReactiveFormsModule,
        AppRoutingModule,
        HttpModule
    ],
    declarations: [ 
        AppComponent,
        TransaksiComponent,
        PasienFormComponent,
        TransaksiDetailComponent,
        RawatJalanComponent 
    ],
    bootstrap:    [ 
	   AppComponent
    ]
})

export class AppModule { }
